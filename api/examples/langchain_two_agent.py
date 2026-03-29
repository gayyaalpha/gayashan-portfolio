"""
langchain_two_agent.py
──────────────────────
LangChain-only implementation of a two-agent architecture.
No LangGraph — all routing and state management done manually with Python.

Architecture:
    Agent 1 (Router)  — classifies user intent into: cv_question, comparison, off_topic
    Agent 2 (Executor)— runs the tool loop with the appropriate system prompt

This file is preserved as a learning reference to show how agentic AI works
internally — state passing via messages list, manual tool execution loop,
and branching logic via plain if/else.

Compare with: langgraph_two_agent.py — the same architecture built with LangGraph.
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.tools import tool
from langchain_core.messages import ToolMessage

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
        f"[{doc.metadata.get('section', 'unknown')}]: {doc.page_content.strip()}"
        for doc in results
    )


@tool
def web_search(query: str) -> str:
    """Search the web for general knowledge questions not related to Gayashan's CV.
    Use this tool ONLY for questions about general topics, technologies, or industry trends."""
    print(f"web_search called with query: {query}")
    # Placeholder — swap in Tavily or DuckDuckGo when needed
    return f"Web search result for '{query}': [web search not yet connected]"


tools = [cv_retrieval, web_search]
llm_with_tools = llm.bind_tools(tools)
tool_map = {t.name: t for t in tools}


# ── Agent 1: Router ───────────────────────────────────────────────────────────
# Classifies user intent with a dedicated LLM call.
# This is "Agent 1" — its only job is to decide which path to take.
# In LangGraph this becomes a named router node with conditional edges.

INTENT_PROMPT = """Classify the user's question into exactly one of these categories:
- cv_question: asking about Gayashan's experience, skills, education, or projects
- comparison: asking to compare Gayashan's profile with industry demand, trends, or the job market
- off_topic: anything unrelated to Gayashan or his professional profile

Return only the category name, nothing else."""

def classify_intent(message: str) -> str:
    """Agent 1 — router. One LLM call to classify intent."""
    response = llm.invoke([
        {"role": "system", "content": INTENT_PROMPT},
        {"role": "user", "content": message},
    ])
    intent = response.content.strip()
    print(f"[INTENT] {intent}")
    return intent


# ── Agent 2: Executor ─────────────────────────────────────────────────────────
# Runs the tool loop with the appropriate system prompt.
# This is "Agent 2" — it does the actual retrieval and answer synthesis.
# The messages list IS the memory — LLM is stateless, we maintain context manually.
# In LangGraph this becomes MessagesState passed between nodes automatically.

CV_PROMPT = """You are Gayashan Dewanarayana's personal AI assistant.
Answer in first person. Only use information from cv_retrieval. Be concise and professional.
Timeframe: current date March 2026. Gayashan works at Onwards Analytics (July 2025–present).
IMPORTANT: Call cv_retrieval before answering."""

COMPARISON_PROMPT = """You are Gayashan Dewanarayana's personal AI assistant.
For comparison questions:
Step 1 — call cv_retrieval to get Gayashan's relevant data.
Step 2 — use that data to form a specific web_search query. Do NOT call web_search first.
Step 3 — synthesize a clear first-person comparison highlighting strengths and any gaps."""

OFF_TOPIC_RESPONSE = "I'm Gayashan's AI assistant — I can only answer questions about his experience, skills, projects, and education. Feel free to ask me anything about his background!"

def run_tool_loop(messages: list) -> str:
    """
    Agent 2 — executor.
    Manually maintains the messages list and runs tool calls until the LLM
    returns a final answer (no tool_calls in response).

    This is what LangGraph automates:
    - MessagesState  = the messages list
    - ToolNode       = the tool execution inside the for loop
    - should_continue = the if not response.tool_calls check
    - graph loop     = the while True
    """
    while True:
        response = llm_with_tools.invoke(messages)
        messages.append(response)                    # manually maintain state

        if not response.tool_calls:                  # LangGraph: should_continue → END
            return response.content

        for tool_call in response.tool_calls:        # LangGraph: ToolNode
            print(f"[TOOL CALL] {tool_call['name']} | args: {tool_call['args']}")
            result = tool_map[tool_call["name"]].invoke(tool_call["args"])
            messages.append(ToolMessage(content=result, tool_call_id=tool_call["id"]))
                                                     # LangGraph: graph loops back to agent


# ── Main entry point ──────────────────────────────────────────────────────────
# Branching logic via plain Python if/else.
# In LangGraph this becomes add_conditional_edges() from the router node.

def generate_ai_response(message: str) -> str:
    intent = classify_intent(message)          # Agent 1

    if intent == "off_topic":                  # LangGraph: edge → END (no agent needed)
        return OFF_TOPIC_RESPONSE

    if intent == "cv_question":                # LangGraph: edge → cv_agent node
        messages = [
            {"role": "system", "content": CV_PROMPT},
            {"role": "user", "content": message},
        ]
        return run_tool_loop(messages)         # Agent 2

    if intent == "comparison":                 # LangGraph: edge → comparison_agent node
        messages = [
            {"role": "system", "content": COMPARISON_PROMPT},
            {"role": "user", "content": message},
        ]
        return run_tool_loop(messages)         # Agent 2

    # Fallback
    messages = [
        {"role": "system", "content": CV_PROMPT},
        {"role": "user", "content": message},
    ]
    return run_tool_loop(messages)


# ── Local test ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    while True:
        user_input = input("\nAsk about my career (or 'exit'): ")
        if user_input.lower() == "exit":
            break
        answer = generate_ai_response(user_input)
        print(f"\nAI RESPONSE:\n{answer}")
