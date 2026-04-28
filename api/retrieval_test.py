"""
retrieval_test.py
─────────────────
Experiment with querying the Pinecone vector store.
Connects to the existing index without inserting anything.

Usage:
    python retrieval_test.py
    python retrieval_test.py "your question here"
    python retrieval_test.py "your question here" 5
"""

import os
import sys
from dotenv import load_dotenv

load_dotenv()

from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=os.getenv("OPENAI_API_KEY")
)


def query(question: str, k: int = 5):
    vector_store = PineconeVectorStore.from_existing_index(
        index_name=PINECONE_INDEX_NAME,
        embedding=embeddings,
    )
    results = vector_store.similarity_search(question, k=k)
    print(f"\nQuery: {question}")
    print(f"Top {k} results:\n")
    for i, doc in enumerate(results):
        print(f"  Result {i+1} [{doc.metadata.get('source', 'unknown')} | page {doc.metadata.get('page', '?')}]:")
        print(f"  {doc.page_content.strip()}")
        print()


if __name__ == "__main__":
    question = sys.argv[1] if len(sys.argv) > 1 else "experience with rag architecture"
    k = 5
    query(question, k)
