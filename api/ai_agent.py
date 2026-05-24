"""
ai_agent.py
───────────
Single-agent LangGraph implementation. cv_agent calls cv_retrieval against the
Pinecone-backed CV index, loops until no more tool calls, and refuses gracefully
when retrieved chunks don't address the question (per CV_PROMPT).

Graph: START → cv_agent ⇄ cv_tools → END

The earlier multi-agent router version (router + comparison_agent + off_topic)
is preserved at examples/ai_agent_multiagent_router_v1.py for reference.
"""
import json
import logging
import os
from datetime import date
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.tools import tool
from langchain_core.messages import ToolMessage
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.prebuilt import ToolNode
from rank_bm25 import BM25Okapi

load_dotenv()

# ── LLM ───────────────────────────────────────────────────────────────────────
llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY"),
)

# ── Pinecone retrieval setup ──────────────────────────────────────────────────
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=os.getenv("OPENAI_API_KEY"),
)

vector_store = PineconeVectorStore.from_existing_index(
    index_name=os.getenv("PINECONE_INDEX_NAME", "portfolio-db"),
    embedding=embeddings,
)

# ── BM25 index (in-memory, for hybrid search) ─────────────────────────────────
# Loads the chunks written by migrate_to_pinecone.py and builds a keyword index
# over them. Pinecone handles dense (semantic) retrieval; BM25 handles literal
# token matching. cv_retrieval merges both via Reciprocal Rank Fusion.
_chunks_path = os.path.join(os.path.dirname(__file__), "chunks.json")
with open(_chunks_path, encoding="utf-8") as _f:
    _chunks = json.load(_f)
_chunk_texts = [c["text"] for c in _chunks]
_tokenized_chunks = [text.lower().split() for text in _chunk_texts]
bm25 = BM25Okapi(_tokenized_chunks)
logging.info("Built BM25 index over %d chunks", len(_chunks))


# ── Tools ─────────────────────────────────────────────────────────────────────
@tool
def cv_retrieval(query: str) -> str:
    """Search Gayashan Dewanarayana's CV and portfolio data — experience, skills,
    projects, technologies, education, dates, and engineering practices.

    ALWAYS call this tool before answering any question about Gayashan.

    Pass the user's question to `query` as written, or with only minimal cleanup.
    Do not shorten, paraphrase, or strip words — every term the user provided
    may help retrieval."""
    logging.info("cv_retrieval called with query: %s", query)

    # ── Dense (semantic) retrieval — top 10 candidates from Pinecone ──────────
    dense_results = vector_store.similarity_search_with_score(query, k=10)

    # ── BM25 (keyword) retrieval — top 10 candidates from in-memory index ─────
    query_tokens = query.lower().split()
    bm25_scores = bm25.get_scores(query_tokens)
    bm25_top_idx = sorted(
        range(len(bm25_scores)),
        key=lambda i: bm25_scores[i],
        reverse=True,
    )[:10]

    # ── Reciprocal Rank Fusion: merge the two top-10 lists, take top 5 ────────
    K = 60
    rrf_scores: dict[str, float] = {}

    for rank, (doc, _score) in enumerate(dense_results, start=1):
        text = doc.page_content
        rrf_scores[text] = rrf_scores.get(text, 0.0) + 1 / (K + rank)

    for rank, idx in enumerate(bm25_top_idx, start=1):
        text = _chunk_texts[idx]
        rrf_scores[text] = rrf_scores.get(text, 0.0) + 1 / (K + rank)

    top_texts = sorted(rrf_scores, key=rrf_scores.get, reverse=True)[:5]

    if not top_texts:
        return "No relevant information found."

    # Look up metadata for each chosen chunk (prefer Pinecone's Document if present)
    text_to_doc = {doc.page_content: doc for doc, _ in dense_results}
    text_to_chunk = {c["text"]: c for c in _chunks}

    out = []
    for text in top_texts:
        if text in text_to_doc:
            meta = text_to_doc[text].metadata
        else:
            meta = text_to_chunk[text]["metadata"]
        src = meta.get("source", "unknown")
        page = meta.get("page", "?")
        out.append(f"[{src} | page {page}]: {text.strip()}")

    return "\n\n".join(out)
     


cv_tools = [cv_retrieval]
cv_llm        = llm.bind_tools(cv_tools)

CV_PROMPT = """

You answer questions about Gayashan Dewanarayana using only retrieved CV and portfolio context. Refer to Gayashan in third person.

Identity (authoritative — use directly without calling cv_retrieval):
- Full name: Gayashan Dewanarayana
- Title: AI Engineer
- Location: Melbourne, Australia
- Email: dewanarayana48@gmail.com
- Phone: +61 430 572 036
- LinkedIn: http://linkedin.com/in/gayashan-dewanarayana
- GitHub: https://github.com/gayyaalpha
- Portfolio: https://ambitious-tree-053dd6010.4.azurestaticapps.net/
- Work rights: Full work rights in Australia
- References: Available upon request

Self-reference: This is Gayashan's portfolio chatbot. When a visitor addresses you with "you", "your", or "yourself" in their message, they are asking about Gayashan — answer about him in third person (per the rules below). Do not interpret these pronouns as referring to yourself as an AI assistant.

ABSOLUTE RULES — no exceptions:

1. Call cv_retrieval BEFORE answering any message that seeks information about Gayashan or his work — 
including questions that sound like general knowledge, technical concepts, or methodology (these may still be answerable from his portfolio).
 You may skip cv_retrieval ONLY for purely conversational messages that don't request information about Gayashan. 
 When in doubt, call cv_retrieval; never refuse or answer from general knowledge for an information-seeking message without checking retrieval first.

2. Pass the user's question VERBATIM (or as close to verbatim as possible) as the `query` argument. Do not shorten, paraphrase, summarise, or "optimise" the query. Every word the user provided may help retrieval.

3. Answer using ONLY the retrieved context for any claim about employers, roles, projects, technologies, dates, metrics, achievements, methodologies, or education. Do not invent, assume, or speculate. The Identity block above is the ONE exception: those facts are authoritative and may be used directly without retrieval.

4. If the retrieved context genuinely does not contain the answer, reply exactly: "I don't have that information about Gayashan in the retrieved context."

5. Be concise. No preamble, no filler, no closing summary. Match the scope of the question — a one-fact question gets one fact, a list question gets the complete list.

6. Do not answer from general knowledge, do not roleplay as a general AI assistant, and do not speculate about future roles or goals.

7. Today's date is {today}.For any time-relative query  resolve it against today's date BEFORE answering. Compare today's date to the date ranges in retrieved chunks and pick  whose range covers today. Never answer a time-relative question without performing this comparison.

8. Conversational openers — greetings ("hi", "hey", "what's up") and visitor-style openers ("tell me about yourself", "who is this", "what can you do") must get a warm, engaging response that introduces Gayashan briefly and invites the next question. If the opener implies wanting an overview of him, call cv_retrieval first and ground the intro in retrieved context. Never refuse a greeting or opener with the rule #4 canned line.
"""

def cv_agent_node(state: MessagesState) -> dict:
    """Answers CV questions. LangChain equivalent: run_tool_loop() with CV_PROMPT"""
    system_prompt = CV_PROMPT.format(today=date.today().isoformat())
    messages = [{"role": "system", "content": system_prompt}] + state["messages"]
    response = cv_llm.invoke(messages)
    return {"messages": [response]}


def should_continue_cv(state: MessagesState) -> str:
    """LangChain equivalent: if not response.tool_calls check in run_tool_loop()"""
    last = state["messages"][-1]
    if getattr(last, "tool_calls", None):
        return "cv_tools"
    return END

# ── Graph ─────────────────────────────────────────────────────────────────────

graph = StateGraph(MessagesState)

graph.add_node("cv_agent", cv_agent_node)
graph.add_node("cv_tools", ToolNode(cv_tools))
graph.add_edge(START, "cv_agent")
# cv_agent loop: agent → tools → agent → ... → END
graph.add_conditional_edges("cv_agent", should_continue_cv, {
    "cv_tools": "cv_tools",
    END:        END,
})
graph.add_edge("cv_tools", "cv_agent")
agent = graph.compile()

# ── Entry point ───────────────────────────────────────────────────────────────
def generate_ai_response(messages: list[dict]) -> tuple[str, list[str]]:
    """Run the agent against a full conversation history.

    `messages` is the chronological list of turns —
    `[{"role": "user"|"assistant", "content": str}, ...]` — with the new user turn
    already appended by the caller. Passing prior turns is what gives the agent
    in-session memory; the caller (HTTP client or CLI) owns the history.

    Returns (answer, contexts) where contexts are the chunks the agent retrieved
    during this run — the result of the LLM-formulated tool call, not a
    re-retrieval against the raw user question.
    """
    result = agent.invoke({"messages": messages})
    answer = result["messages"][-1].content
    contexts: list[str] = []
    for msg in result["messages"]:
        if isinstance(msg, ToolMessage) and msg.name == "cv_retrieval":
            contexts.extend(c.strip() for c in msg.content.split("\n\n") if c.strip())
    return answer, contexts

# ── Local test ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    history: list[dict] = []
    while True:
        user_input = input("\nAsk about my career (or 'exit'): ")
        if user_input.lower() == "exit":
            break
        history.append({"role": "user", "content": user_input})
        answer, contexts = generate_ai_response(history)
        history.append({"role": "assistant", "content": answer})
        print(f"\nAI RESPONSE:\n{answer}")
        print(f"\nRETRIEVED CONTEXTS ({len(contexts)}):")
        for i, ctx in enumerate(contexts, 1):
            print(f"  [{i}] {ctx}")
