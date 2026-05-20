"""
chunk_markdown.py
─────────────────
Section-aware chunking + Pinecone migration pipeline for CV_Gayashan.md.

Pipeline:
1. Load CV_Gayashan.md
2. Split at `##` headers using MarkdownHeaderTextSplitter — produces one chunk
   per CV entry. The CV is structured so every entry is its own `##` section
   with a self-describing header (role + company + dates, etc.).
3. Prepend the `##` header back into each chunk's searchable text
   (Option A — contextual chunking). This makes the header visible to both
   dense embeddings and BM25 keyword search, so queries that mention
   "Onwards Analytics" or "Present" can match those chunks directly even
   when those phrases aren't repeated in the body content.
4. Write chunks.json — read by ai_agent.py at startup to build the BM25 index.
5. Wipe existing Pinecone vectors and upsert the new chunks.

Run this whenever CV_Gayashan.md is edited.

Usage:
    python chunk_markdown.py

Requires in environment / .env:
    OPENAI_API_KEY
    PINECONE_API_KEY
    PINECONE_INDEX_NAME = portfolio-db
"""

import json
import os
from dotenv import load_dotenv

load_dotenv()

from langchain_text_splitters import MarkdownHeaderTextSplitter
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

# ── Config ────────────────────────────────────────────────────────────────────
CV_MD_PATH = os.path.join(os.path.dirname(__file__), "CV_Gayashan.md")
CHUNKS_JSON_PATH = os.path.join(os.path.dirname(__file__), "chunks.json")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "portfolio-db")

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=os.getenv("OPENAI_API_KEY"),
)


# ── Step 1: Load Markdown ─────────────────────────────────────────────────────
def load_markdown(path: str) -> str:
    with open(path, encoding="utf-8") as f:
        return f.read()


# ── Step 2: Split on `##` only + inject section header into searchable text ───
def chunk_markdown(md_text: str) -> list[Document]:
    splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[("##", "section")],
    )
    chunks = splitter.split_text(md_text)

    # Option A — contextual chunking: prepend the section header into the chunk
    # body so BOTH dense embeddings and BM25 see it. Without this the header
    # only lives in metadata, invisible to retrieval ranking.
    for chunk in chunks:
        section = chunk.metadata.get("section", "")
        if section:
            chunk.page_content = f"Section: {section}/n{chunk.page_content}"

        chunk.metadata["source"] = "CV_Gayashan.md"

    return chunks


# ── Step 3: Wipe + re-upsert Pinecone, write chunks.json ─────────────────────
def migrate():
    existing = [i.name for i in pc.list_indexes()]
    if PINECONE_INDEX_NAME not in existing:
        print(f"Index '{PINECONE_INDEX_NAME}' not found.")
        print("Create it in Pinecone dashboard: 1536 dims, cosine, aws ap-southeast-1")
        return

    print(f"Loading: {CV_MD_PATH}")
    md_text = load_markdown(CV_MD_PATH)
    print(f"  Markdown source: {len(md_text)} characters")

    chunks = chunk_markdown(md_text)
    print(f"  Split into {len(chunks)} chunks (with metadata prefix injected)\n")

    print("  ── Chunk summary ──")
    for i, chunk in enumerate(chunks, start=1):
        section = chunk.metadata.get("section", "—")
        char_count = len(chunk.page_content)
        print(f"  [{i:>2}] chars={char_count:<4} section={section!r}")

    # Write chunks.json — used by ai_agent.py at startup to build the BM25 index.
    chunks_json = [
        {"index": i, "text": c.page_content, "metadata": c.metadata}
        for i, c in enumerate(chunks, start=1)
    ]
    with open(CHUNKS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(chunks_json, f, ensure_ascii=False, indent=2)
    print(f"\nWrote {len(chunks)} chunks to {CHUNKS_JSON_PATH}")

    # Wipe Pinecone and re-upload
    print("\nDeleting existing vectors from Pinecone...")
    pc.Index(PINECONE_INDEX_NAME).delete(delete_all=True)

    print("Embedding and upserting chunks to Pinecone...")
    PineconeVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        index_name=PINECONE_INDEX_NAME,
    )
    print(f"\nDone. {len(chunks)} chunks stored in '{PINECONE_INDEX_NAME}'.")


if __name__ == "__main__":
    migrate()
