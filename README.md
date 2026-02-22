# AI Engineer Portfolio

Live site: https://wonderful-pebble-0682ad910.1.azurestaticapps.net

Personal portfolio started to sharpen and showcase my skills as an artificial intelligence engineer. The frontend is built with Next.js, and the Python backend lives in the `api/` folder. It includes an AI chat widget powered by an Azure Function using OpenAI, plus a contact form that stores messages in Azure Table Storage.

## Highlights
- Next.js 16 + React 19 App Router
- Tailwind CSS v4 with shadcn/ui-style components
- AI assistant widget backed by Azure Functions + OpenAI
- Contact form writes submissions to Azure Table Storage
- Azure Static Web Apps deployment with integrated API

## Tech stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Radix UI, lucide-react
- Backend: Azure Functions (Python)
- AI: OpenAI Responses API (prompt + vector store)
- Storage: Azure Table Storage

## Local development
Install dependencies and run the Next.js app:
```bash
npm install
npm run dev
```

## Local API (Azure Functions)
The `api/` folder contains the Python Azure Functions for:
- `POST /api/chat_trigger` (AI assistant)
- `POST /api/contact_submit` (contact form storage)

To run locally:
```bash
cd api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
func start
```

Then set the frontend to call your local Functions host by updating `NEXT_PUBLIC_AZURE_FUNCTION_URL` (see below).
`func` comes from Azure Functions Core Tools.

## Environment variables
Frontend (`.env.local`):
- `NEXT_PUBLIC_AZURE_FUNCTION_URL` (e.g. `http://localhost:7071`)

Azure Functions:
- `OPENAI_API_KEY`
- `OPENAI_PROMPT_ID`
- `OPENAI_PROMPT_VERSION`
- `AzureWebJobsStorage` (Azure Table Storage connection string)
.