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
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.tools import tool
from langchain_core.messages import ToolMessage
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.prebuilt import ToolNode

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


# ── Tools ─────────────────────────────────────────────────────────────────────
@tool
def cv_retrieval(query: str) -> str:
    """Search Gayashan's CV data including experience, skills, projects, and education.
    Use this tool to find information before answering any question about Gayashan."""
    print(f"cv_retrieval called with query: {query}")
    results = vector_store.similarity_search(query, k=5)
    if not results:
        return "No relevant information found."
    return "\n\n".join(
        f"[{doc.metadata.get('source', 'unknown')} | page {doc.metadata.get('page', '?')}]: {doc.page_content.strip()}"
        for doc in results
    )


cv_tools = [cv_retrieval]
cv_llm        = llm.bind_tools(cv_tools)

CV_PROMPT = """You are Gayashan Dewanarayana, an AI Engineer.

You must answer all questions in third person as Gayashan Dewanarayana, speaking as a “talking CV”.

If asked about your name, state it directly as “Gayashan Dewanarayana”.

You must use retrieved context from the attached Portfolio DB to answer questions about:
- experience
- projects
- roles
- skills
- technologies
- education

Rules you MUST follow:
- Answer questions using ONLY information retrieved from the attached Portfolio DB.
- If the requested information is not found in the retrieved context, clearly state that you do not have that information.
- Do NOT invent or assume experience, projects, skills, technologies, employers, or achievements.
- Do NOT answer from general knowledge or from the perspective of an AI assistant.
- Be concise, clear, and professional.
- If multiple relevant pieces of information are retrieved, summarise the most relevant one.
- Do not over-explain unless explicitly asked.
- Never speculate about future roles, employers, or goals unless explicitly present in the retrieved data.
"""

def cv_agent_node(state: MessagesState) -> dict:
    """Answers CV questions. LangChain equivalent: run_tool_loop() with CV_PROMPT"""
    messages = [{"role": "system", "content": CV_PROMPT}] + state["messages"]
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
def generate_ai_response(message: str) -> tuple[str, list[str]]:
    """Returns (answer, contexts) where contexts are the chunks the agent actually
    retrieved during the run — i.e. the result of the LLM-formulated tool call,
    not a re-retrieval against the raw user question."""
    result = agent.invoke({"messages": [{"role": "user", "content": message}]})
    print(result)
    answer = result["messages"][-1].content
    contexts: list[str] = []
    for msg in result["messages"]:
        if isinstance(msg, ToolMessage) and msg.name == "cv_retrieval":
            contexts.extend(c.strip() for c in msg.content.split("\n\n") if c.strip())
    return answer, contexts

# ── Local test ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    while True:
        user_input = input("\nAsk about my career (or 'exit'): ")
        if user_input.lower() == "exit":
            break
        answer, contexts = generate_ai_response(user_input)
        print(f"\nAI RESPONSE:\n{answer}")
        print(f"\nRETRIEVED CONTEXTS ({len(contexts)}):")
        for i, ctx in enumerate(contexts, 1):
            print(f"  [{i}] {ctx}")
