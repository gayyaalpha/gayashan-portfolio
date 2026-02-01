import azure.functions as func
import datetime
import json
import logging
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = func.FunctionApp()

def generate_ai_reply(user_message: str, projects: list) -> str:
    """
    Generates a conversational AI response grounded ONLY on matched projects.
    """

    if not projects:
        context = "No projects matched the user's message."
    else:
        context = "\n".join(
            f"- {p['title']}: {p['summary']} (Tech: {', '.join(p['technologies'])})"
            for p in projects
        )

    prompt = f"""
You are an AI assistant helping explain a software engineer's portfolio.

User message:
"{user_message}"

Matched projects:
{context}

Rules:
- Only refer to the projects listed above
- Do NOT invent projects
- Keep response concise and professional
- Speak in first person ("I built...", "I worked on...")

Write a helpful response:
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # fast + cheap for prod
        messages=[
            {"role": "system", "content": "You are a professional portfolio assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4
    )

    return response.choices[0].message.content.strip()




@app.route(route="chat", auth_level=func.AuthLevel.ANONYMOUS, methods=["POST"])
def chat(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

  # 1️⃣ Parse JSON body
    try:
        body = req.get_json()
    except ValueError:
        return func.HttpResponse(
            json.dumps({"error": "Request body must be valid JSON"}),
            status_code=400,
            mimetype="application/json"
        )

    # 2️⃣ Validate required field
    message = body.get("message")
    if not message or not isinstance(message, str):
        return func.HttpResponse(
            json.dumps({"error": "Field 'message' (string) is required"}),
            status_code=400,
            mimetype="application/json"
        )

    projects = load_projects()
    matched_projects = match_projects(message, projects)

    ai_response = generate_ai_reply(message, matched_projects)

    # 4️⃣ Return structured JSON response
    return func.HttpResponse(
        json.dumps(ai_response),
        status_code=200,
        mimetype="application/json"
    )