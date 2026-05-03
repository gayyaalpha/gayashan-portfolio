"""
migrate_to_pinecone.py
──────────────────────
PDF-driven CV pipeline. Drop your updated CV as 'CV_Gayashan.pdf' in the
api/ folder, then run this script. It extracts text, splits into overlapping
chunks, and upserts them into Pinecone — replacing any existing vectors.

Usage:
    python migrate_to_pinecone.py

Requires in your environment (or .env file):
    OPENAI_API_KEY
    PINECONE_API_KEY
    PINECONE_INDEX_NAME = portfolio-db
"""

import os
from dotenv import load_dotenv

load_dotenv()

from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

# ── Config ────────────────────────────────────────────────────────────────────
CV_PDF_PATH = os.path.join(os.path.dirname(__file__), "CV_Gayashan.pdf")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "portfolio-db")

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

# ── Step 1: Extract text from PDF ─────────────────────────────────────────────
def load_pdf(path: str) -> list[Document]:
    reader = PdfReader(path)
    pages = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        if text.strip():
            pages.append(Document(
                page_content=text,
                metadata={"source": "CV_Gayashan.pdf", "page": i + 1}
            ))
    print(f"  Extracted {len(pages)} page(s) from PDF")
    return pages


# ── Step 2: Split into overlapping chunks ─────────────────────────────────────
def chunk_documents(docs: list[Document]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,       # ~100-125 tokens per chunk
        chunk_overlap=100,    # repeat last 100 chars in next chunk
        separators=["\n\n", "\n", ". ", " "]  # prefer paragraph breaks first
    )
    chunks = splitter.split_documents(docs)
    print(f"  Split into {len(chunks)} chunks (size=500, overlap=100)")
    return chunks


# ── Step 3: Wipe old vectors + upsert new ones ────────────────────────────────
def migrate():
    existing = [i.name for i in pc.list_indexes()]
    if PINECONE_INDEX_NAME not in existing:
        print(f"Index '{PINECONE_INDEX_NAME}' not found.")
        print("Create it in Pinecone dashboard: 1536 dims, cosine, aws ap-southeast-1")
        return

    print(f"Loading PDF: {CV_PDF_PATH}")
    pages = load_pdf(CV_PDF_PATH)

    chunks = chunk_documents(pages)
    print(chunks)

    print("Deleting existing vectors from Pinecone...")
    pc.Index(PINECONE_INDEX_NAME).delete(delete_all=True)

    print("Embedding and upserting chunks...")
    PineconeVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        index_name=PINECONE_INDEX_NAME,
    )

    print(f"\nDone. {len(chunks)} chunks stored in '{PINECONE_INDEX_NAME}'.")


# ── Utility: wipe index without re-uploading ──────────────────────────────────
def delete_all_vectors():
    pc.Index(PINECONE_INDEX_NAME).delete(delete_all=True)
    print(f"All vectors deleted from '{PINECONE_INDEX_NAME}'.")


if __name__ == "__main__":
    migrate()
