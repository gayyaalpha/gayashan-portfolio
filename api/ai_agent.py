"""
ai_agent.py
───────────
LangGraph implementation of the two-agent architecture.

Architecture:
    Router node       — classifies intent: cv_question, comparison, off_topic
    cv_agent node     — answers CV questions using cv_retrieval tool
    comparison_agent  — compares CV data with industry trends using both tools
    tools node        — executes tool calls requested by agent nodes

Compare with: examples/langchain_two_agent.py — the same logic built manually.
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.prebuilt import ToolNode
from pydantic import BaseModel

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


cv_tools = [cv_retrieval]
comparison_tools = [cv_retrieval, web_search]

cv_llm        = llm.bind_tools(cv_tools)
comparison_llm = llm.bind_tools(comparison_tools)


# ── Prompts ───────────────────────────────────────────────────────────────────
INTENT_PROMPT = """Classify the user's question into exactly one of these categories:
- cv_question: asking about Gayashan's experience, skills, education, or projects
- comparison: asking to compare Gayashan's profile with industry demand, trends, or the job market
- off_topic: anything unrelated to Gayashan or his professional profile

Return only the category name, nothing else."""

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


# ── Node 1: Router ────────────────────────────────────────────────────────────
# Same job as classify_intent() in the LangChain version.
# Returns intent via MessagesState — LangGraph reads it in route_intent().

def router_node(state: MessagesState) -> dict:
    """Classifies user intent. LangChain equivalent: classify_intent()"""
    user_message = state["messages"][-1].content
    response = llm.invoke([
        {"role": "system", "content": INTENT_PROMPT},
        {"role": "user", "content": user_message},
    ])
    intent = response.content.strip()
    print(f"[INTENT] {intent}")
    # Store intent as a system message so route_intent() can read it
    return {"messages": [{"role": "system", "content": f"INTENT:{intent}"}]}


def route_intent(state: MessagesState) -> str:
    """Reads the intent from state and returns the next node name.
    LangChain equivalent: the if/else in generate_ai_response()"""
    for msg in reversed(state["messages"]):
        content = getattr(msg, "content", "")
        if isinstance(content, str) and content.startswith("INTENT:"):
            intent = content.replace("INTENT:", "").strip()
            if intent == "off_topic":
                return "off_topic"
            if intent == "comparison":
                return "comparison_agent"
            return "cv_agent"
    return "cv_agent"


# ── Node 2: CV Agent ──────────────────────────────────────────────────────────
# LangChain equivalent: run_tool_loop() with CV_PROMPT

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


# ── Node 3: Comparison Agent ──────────────────────────────────────────────────
# LangChain equivalent: run_tool_loop() with COMPARISON_PROMPT

def comparison_agent_node(state: MessagesState) -> dict:
    """Handles comparison questions. LangChain equivalent: run_tool_loop() with COMPARISON_PROMPT"""
    messages = [{"role": "system", "content": COMPARISON_PROMPT}] + state["messages"]
    response = comparison_llm.invoke(messages)
    return {"messages": [response]}


def should_continue_comparison(state: MessagesState) -> str:
    """LangChain equivalent: if not response.tool_calls check in run_tool_loop()"""
    last = state["messages"][-1]
    if getattr(last, "tool_calls", None):
        return "comparison_tools"
    return END


# ── Node 4: Off-topic ─────────────────────────────────────────────────────────
def off_topic_node(state: MessagesState) -> dict:
    """LangChain equivalent: return OFF_TOPIC_RESPONSE directly"""
    return {"messages": [{"role": "assistant", "content": OFF_TOPIC_RESPONSE}]}


# ── Graph ─────────────────────────────────────────────────────────────────────
# LangChain equivalent: the if/else branching in generate_ai_response()

graph = StateGraph(MessagesState)

graph.add_node("router", router_node)
graph.add_node("cv_agent", cv_agent_node)
graph.add_node("cv_tools", ToolNode(cv_tools))
graph.add_node("comparison_agent", comparison_agent_node)
graph.add_node("comparison_tools", ToolNode(comparison_tools))
graph.add_node("off_topic", off_topic_node)

graph.add_edge(START, "router")

graph.add_conditional_edges("router", route_intent, {
    "cv_agent" : "cv_agent",
    "comparison_agent" : "comparison_agent",
    "off_topic" : "off_topic"
})
# cv_agent loop: agent → tools → agent → ... → END
graph.add_conditional_edges("cv_agent", should_continue_cv, {
    "cv_tools": "cv_tools",
    END:        END,
})
graph.add_conditional_edges("comparison_agent", should_continue_comparison, {
    "comparison_tools": "comparison_tools",
    END:        END,
})
graph.add_edge("cv_tools", "cv_agent")
graph.add_edge("comparison_tools", "comparison_agent")
graph.add_edge("off_topic" , END)

agent = graph.compile()


# ── Entry point ───────────────────────────────────────────────────────────────
def generate_ai_response(message: str) -> str:
    result = agent.invoke({"messages": [{"role": "user", "content": message}]})
    print(result)
    return result["messages"][-1].content


# ── Local test ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    while True:
        user_input = input("\nAsk about my career (or 'exit'): ")
        if user_input.lower() == "exit":
            break
        answer = generate_ai_response(user_input)
        print(f"\nAI RESPONSE:\n{answer}")
