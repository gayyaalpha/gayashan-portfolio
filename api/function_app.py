import azure.functions as func
import datetime
import json
import logging
import os
from openai import OpenAI
from ai_service import generate_ai_response


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = func.FunctionApp()

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

    try:
        answer = generate_ai_response(message)
        return func.HttpResponse(
            json.dumps({"answer": answer}),
            status_code=200,
            mimetype="application/json",
        )
    except Exception as e:
        logging.exception("AI generation failed")
        return func.HttpResponse(
            json.dumps({"error": "AI request failed", "details": str(e)}),
            status_code=500,
            mimetype="application/json",
        )