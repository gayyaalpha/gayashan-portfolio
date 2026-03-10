import os
import logging
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.prebuilt import ToolNode

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY"),
)

# ── Pinecone retrieval setup ────────────────────────────────────────────────
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=os.getenv("OPENAI_API_KEY"),
)

vector_store = PineconeVectorStore.from_existing_index(
    index_name=os.getenv("PINECONE_INDEX_NAME", "portfolio-db"),
    embedding=embeddings,
)


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


tools = [cv_retrieval]

SYSTEM_PROMPT = """You are Gayashan Dewanarayana's personal AI assistant on his portfolio website.
Answer questions about Gayashan's experience, skills, projects, and education.
Always respond in first person as if you are speaking on behalf of Gayashan.
Be concise, professional, and friendly.
If you don't have enough information to answer a question, say so honestly.

Timeframe awareness:
- The current date is March 2026.
- Gayashan completed his Master's at La Trobe University in 2025.
- He completed his Bachelor's at the University of Colombo in 2023.
- He worked at Mickiesoft from November 2022 to November 2023.
- He interned at Blackbox Innovation from March 2025 to June 2025.
- He has been working at Onwards Analytics from July 2025 to present.
Use this timeline to answer questions about current role, past roles, and education status accurately.

IMPORTANT: You MUST call the cv_retrieval tool before answering ANY question about Gayashan.
Do NOT answer from your own knowledge. Only use information returned by the cv_retrieval tool.
If the tool returns no relevant information, say you don't have that information."""


llm_with_tools = llm.bind_tools(tools)


def agent_node(state: MessagesState):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + state["messages"]
    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}


def should_continue(state: MessagesState):
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return END

graph = StateGraph(MessagesState)
graph.add_node("agent", agent_node)
graph.add_node("tools", ToolNode(tools))
graph.add_edge(START, "agent")
graph.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
graph.add_edge("tools", "agent")
agent = graph.compile()


def generate_ai_response(message: str) -> str:
    result = agent.invoke({"messages": [{"role": "user", "content": message}]})
    return result["messages"][-1].content



# Local test
if __name__ == "__main__":
    while True:
        user_input = input("\nAsk about my career (or 'exit'): ")
        if user_input.lower() == "exit":
            break
        answer = generate_ai_response(user_input)
        print(f"\nAI RESPONSE:\n{answer}")
