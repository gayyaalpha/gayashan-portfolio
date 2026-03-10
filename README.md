# AI Engineer Portfolio

Live site: https://ambitious-tree-053dd6010.4.azurestaticapps.net/

Personal portfolio built to sharpen and showcase my skills as an AI engineer. The frontend is built with Next.js and the Python backend lives in the `api/` folder. It features an AI chat assistant powered by a LangGraph agent with Pinecone-backed RAG, plus a contact form that stores messages in Azure Table Storage.

## Highlights
- Next.js 16 + React 19 App Router
- Tailwind CSS v4 with shadcn/ui-style components
- AI assistant powered by a LangGraph agent with Pinecone vector search (RAG)
- Semantic retrieval using OpenAI `text-embedding-3-small` embeddings
- Contact form writes submissions to Azure Table Storage
- Azure Static Web Apps + Azure Functions deployment with GitHub Actions CI/CD

## Tech stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Radix UI, lucide-react
- Backend: Azure Functions (Python)
- AI: LangGraph agent, LangChain, OpenAI (`gpt-4o-mini`)
- Vector DB: Pinecone (`text-embedding-3-small`, 1536 dims, cosine)
- Storage: Azure Table Storage

## Local development
Install dependencies and run the Next.js app:
```bash
npm install
npm run dev
```

## Local API (Azure Functions)
The `api/` folder contains the Python Azure Functions for:
- `POST /api/chat_trigger` — AI assistant (LangGraph + Pinecone RAG)
- `POST /api/contact_submit` — contact form storage

To run locally:
```bash
cd api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
func start
```

`func` comes from Azure Functions Core Tools.

## Pinecone vector store
CV data is stored as vector embeddings in Pinecone. To migrate or reset:
```bash
cd api
source .venv/bin/activate

# Embed and upsert all CV chunks (one-time setup)
python migrate_to_pinecone.py migrate

# Delete all vectors (reset)
python migrate_to_pinecone.py delete
```

## Environment variables
Frontend (`.env.local`):
- `NEXT_PUBLIC_AZURE_FUNCTION_URL` (e.g. `http://localhost:7071`)

Azure Functions (`local.settings.json` locally, App Settings in production):
- `OPENAI_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME` (e.g. `portfolio-db`)
- `AzureWebJobsStorage` (Azure Table Storage connection string)

## Deployment
Backend (Azure Functions):
```bash
cd api
func azure functionapp publish <your-function-app-name> --python
```

Frontend deploys automatically via GitHub Actions on push to `main`.
