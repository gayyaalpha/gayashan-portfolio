"""
migrate_to_pinecone.py
──────────────────────
One-time script to migrate CV data from the OpenAI Vector Store
into Pinecone. Run this locally before deploying the LangGraph agent.

Usage:
    python migrate_to_pinecone.py

Requires in your environment (or .env file):
    OPENAI_API_KEY
    PINECONE_API_KEY
    PINECONE_INDEX_NAME = portfolio-db
"""

import os
from dotenv import load_dotenv  # pip install python-dotenv

load_dotenv()  # loads from .env file if present

from openai import OpenAI
from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.documents import Document

# ── Clients ──────────────────────────────────────────────────────────────────
api_key=os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "portfolio-db")

# ── Embedding model ───────────────────────────────────────────────────────────
# Must match the dimensions you set in Pinecone (1536)
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

# ── Your CV data ──────────────────────────────────────────────────────────────
# This is the source of truth — your CV broken into logical chunks.
# Each chunk becomes one vector in Pinecone.
# Add/edit chunks here whenever you update your CV.

CV_CHUNKS = [
    # ── SUMMARY ────────────────────────────────────────────────────────────
    Document(
        page_content="""
        Gayashan Dewanarayana is an Artificial Intelligence Engineer based in Melbourne, Australia.
        He has hands-on experience integrating large language models into production backends,
        mitigating hallucinations through structured outputs and data grounding, and designing
        AI-powered services that improve system reliability and developer productivity.
        He has a strong background in backend and full-stack engineering, with practical experience
        building serverless, cloud-deployed AI systems and prototyping GenAI-powered solutions
        for real-world applications. He has full work rights in Australia.
        Contact: dewanarayana48@gmail.com | +61 430 572 036
        """,
        metadata={"section": "summary", "type": "profile"}
    ),

    # ── TECHNICAL SKILLS ───────────────────────────────────────────────────
    Document(
        page_content="""
        Technical skills in AI and Machine Learning:
        Computer Vision (object detection, pose estimation), Deep Learning (CNN-based models),
        Large Language Models (LLM integration, prompt pipelines), NLP fundamentals
        (tokenisation, embeddings, evaluation), Model evaluation and confidence thresholding.
        """,
        metadata={"section": "skills", "type": "technical", "category": "ai_ml"}
    ),
    Document(
        page_content="""
        Technical skills in AI Systems and Data Pipelines:
        Pose landmark extraction and metric computation, Frame-quality filtering and validation,
        RAG pipelines, semantic search systems, vector databases (Pinecone, OpenAI Vector Database),
        Structured AI outputs (JSON-based pipelines), LLM grounding and hallucination mitigation,
        Semantic metric aggregation for downstream analysis, LangGraph, LangChain.
        """,
        metadata={"section": "skills", "type": "technical", "category": "ai_systems"}
    ),
    Document(
        page_content="""
        Technical skills in Cloud and Backend:
        Firebase Cloud Functions, Firestore, Serverless architectures, Azure Functions,
        Azure Static Web Apps, GitHub Actions CI/CD, REST API development.
        Programming languages and frameworks: Python, OpenCV, Pandas, NumPy, Matplotlib,
        PyTorch, TensorFlow, MediaPipe, FastAPI.
        Engineering tools: Git, GitHub, Postman, Swagger, VS Code, Cursor.
        Data and Storage: Firebase, Oracle, MS SQL, schema-aware data handling.
        """,
        metadata={"section": "skills", "type": "technical", "category": "cloud_backend"}
    ),

    # ── EXPERIENCE: ONWARDS ANALYTICS ──────────────────────────────────────
    Document(
        page_content="""
        Work experience at Onwards Analytics as Artificial Intelligence Engineer.
        Location: Perth, Western Australia (Remote). Duration: July 2025 to Present.
        Project: Glide Swim App — a computer vision based swimming analysis application.
        Responsibilities:
        - Enhanced and extended an existing computer vision swimming pose analysis system
          to improve technique evaluation accuracy and AI-generated feedback quality.
        - Refined pose-tracking pipelines using MediaPipe's heavy model, improving joint
          landmark extraction and metric computation including stroke count, arm symmetry,
          glide duration, and hip rotation timing.
        - Designed frame-quality filtering and validation logic including body-facing
          verification, anatomical consistency checks, and displacement-based anomaly
          detection to stabilise pose analysis.
        - Identified and mitigated model failure modes, including landmark hallucinations
          when limbs exited the camera's field of view, preventing corrupted data propagation.
        - Implemented semantic, metric-grounded LLM pipelines by transforming vision-model
          metadata into validated swimming metrics to generate reliable technique-specific feedback.
        Technologies: Python, OpenCV, MediaPipe, Matplotlib, NumPy, OpenAI API, JSON.
        """,
        metadata={"section": "experience", "type": "job", "company": "onwards_analytics"}
    ),

    # ── EXPERIENCE: BLACKBOX INNOVATION ────────────────────────────────────
    Document(
        page_content="""
        Work experience at Blackbox Innovation as Intern Artificial Intelligence Engineer.
        Location: Melbourne, Australia. Duration: March 2025 to June 2025.
        Project: Serverless AI-powered mobile workout planner (pre-release).
        Responsibilities:
        - Contributed to development of a workout planner that generates personalised training
          plans based on user goals, available equipment, and targeted muscle groups.
        - Designed and implemented RAG pipelines with semantic search using OpenAI Vector
          Database and Firestore to ground LLM outputs and eliminate hallucinations.
        - Built backend orchestration using Firebase Cloud Functions to integrate LLM-based
          plan generation into a production-ready API.
        - Enforced structured, ID-based generation and authoritative metadata retrieval
          from Firestore to ensure deterministic and reliable AI outputs.
        - Implemented validation and persistence workflows to store finalised workout plans
          in Firestore with auto-generated document IDs, server timestamps, and user references.
        Technologies: Python, Firebase Cloud Functions, Firestore, OpenAI API, Postman, GitHub.
        """,
        metadata={"section": "experience", "type": "job", "company": "blackbox_innovation"}
    ),

    # ── EXPERIENCE: MICKIESOFT ──────────────────────────────────────────────
    Document(
        page_content="""
        Work experience at Mickiesoft as Software Engineer.
        Location: Colombo, Sri Lanka. Duration: November 2022 to November 2023.
        Responsibilities:
        - Contributed to backend and API-driven features for production web and mobile systems,
          including organisational management platforms and ERP systems.
        - Implemented RESTful APIs supporting data retrieval, validation, and persistence
          across HR, inventory, and financial modules.
        - Developed backend functionality using Laravel (PHP) and .NET Core, including API
          endpoints, database migrations, and role-based access logic.
        - Supported system stability through API debugging and testing using Postman and Swagger.
        Technologies: .NET Core, Laravel PHP, React, Redux, REST APIs, MS SQL, Postman,
        Swagger, Git, TypeScript.
        """,
        metadata={"section": "experience", "type": "job", "company": "mickiesoft"}
    ),

    # ── EXPERIENCE: NEEDLESACK ──────────────────────────────────────────────
    Document(
        page_content="""
        Co-founded Needlesack, an independent game development studio.
        Role: Co-founder and Creative Director.
        - Led development of a cross-platform mobile game with over 100,000 downloads.
        - Designed and implemented gameplay logic, systems, and progression mechanics using
          C# in Unity.
        - Designed modular progression and upgrade systems using an in-game economy.
        - Demonstrated product-market fit through global user adoption.
        """,
        metadata={"section": "experience", "type": "founder", "company": "needlesack"}
    ),

    # ── PROJECTS: AI PORTFOLIO ──────────────────────────────────────────────
    Document(
        page_content="""
        Personal project: AI Portfolio Platform — a Full-Stack RAG Application.
        This is Gayashan's own portfolio website which uses AI to answer questions about him.
        - Architected and deployed a production-grade full-stack AI platform, integrating
          a cloud-hosted frontend with a serverless backend on Microsoft Azure.
        - Designed and implemented a Retrieval-Augmented Generation (RAG) system with
          semantic search, grounding LLM responses in structured CV and project data
          via a vector database.
        - Engineered constrained prompting and retrieval-only grounding strategies to
          eliminate hallucinations and enforce deterministic, first-person outputs.
        - Built and secured a serverless API layer using Azure Functions (Python 3.11)
          to manage OpenAI API interactions.
        - Established CI/CD automation and secure configuration management using Azure
          App Settings and GitHub Actions, resolving runtime and deployment challenges
          in a production cloud environment.
        - Upgraded the backend to a LangGraph multi-tool agent with conditional routing,
          replacing the single-shot RAG approach with a reasoning agent that selects from
          CV retrieval, project deep-dive, and web search tools.
        - Implemented stateful multi-turn conversation using LangGraph's checkpointer
          pattern with thread-based session management.
        Technologies: Python, Azure Functions, Azure Static Web Apps, OpenAI API,
        Pinecone, LangGraph, LangChain, GitHub Actions, CI/CD, Next.js, REST APIs.
        """,
        metadata={"section": "projects", "type": "project", "name": "ai_portfolio"}
    ),

    # ── PROJECTS: MASK R-CNN ────────────────────────────────────────────────
    Document(
        page_content="""
        Academic project: Object Detection and Tracking with Mask R-CNN.
        Postgraduate coursework in Computer Vision at La Trobe University.
        - Implemented an object detection and tracking pipeline using a pre-trained
          Mask R-CNN model to track multiple COCO objects in video sequences.
        - Applied IoU-based tracking to maintain consistent object identities across frames.
        - Improved detection reliability by defining class-specific confidence thresholds
          instead of a global threshold.
        - Used IoU overlap analysis to evaluate bounding box continuity between frames.
        Technologies: Python, OpenCV, Mask R-CNN.
        Outcome: Assignment score 32 out of 40.
        """,
        metadata={"section": "projects", "type": "academic", "name": "mask_rcnn"}
    ),

    # ── EDUCATION ──────────────────────────────────────────────────────────
    Document(
        page_content="""
        Education:
        La Trobe University, Australia.
        Master of Science in Artificial Intelligence, specialisation in Natural Language Processing.
        Duration: 2023 to 2025. WAM: 76.07.

        University of Colombo, Sri Lanka.
        Bachelor of Science (Honours) in Electronics and Information Technology.
        Duration: 2018 to 2023. Result: Second Class Upper Division.
        """,
        metadata={"section": "education", "type": "education"}
    ),

    # ── CERTIFICATIONS ──────────────────────────────────────────────────────
    Document(
        page_content="""
        Certifications:
        - Microsoft Azure Fundamentals (AZ-900)
        - AWS Academy Cloud Foundations
        """,
        metadata={"section": "certifications", "type": "certifications"}
    ),
]


# ── Migration ─────────────────────────────────────────────────────────────────

def migrate():
    """One-time: embed and upsert all CV chunks into Pinecone."""
    print(f"🔗 Connecting to Pinecone index: {PINECONE_INDEX_NAME}")
    existing_indexes = [i.name for i in pc.list_indexes()]
    if PINECONE_INDEX_NAME not in existing_indexes:
        print(f"❌ Index '{PINECONE_INDEX_NAME}' not found in Pinecone.")
        print(f"   Create it in the Pinecone dashboard first.")
        print(f"   Dimensions: 1536, Metric: cosine, Region: aws ap-southeast-1")
        return

    print(f"✅ Index found. Starting migration of {len(CV_CHUNKS)} chunks...")

    PineconeVectorStore.from_documents(
        documents=CV_CHUNKS,
        embedding=embeddings,
        index_name=PINECONE_INDEX_NAME,
    )

    print(f"✅ Migration complete. {len(CV_CHUNKS)} chunks embedded and stored.")


def delete_all_vectors():
    """Delete all vectors from the index (keeps the index itself)."""
    index = pc.Index(PINECONE_INDEX_NAME)
    index.delete(delete_all=True)
    print(f"All vectors deleted from '{PINECONE_INDEX_NAME}'.")


if __name__ == "__main__":

        migrate()

