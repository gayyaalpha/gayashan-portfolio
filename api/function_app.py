import azure.functions as func
import datetime
import json
import logging

app = func.FunctionApp()

@app.route(route="chat", auth_level=func.AuthLevel.ANONYMOUS, methods=["POST"])
def chat(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    param  = req.params.get("project") 

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

    # 3️⃣ Placeholder reply (LLM will go here next)
    reply = f"You said: {message+param}"

    # 4️⃣ Return structured JSON response
    return func.HttpResponse(
        json.dumps({"reply": reply}),
        status_code=200,
        mimetype="application/json"
    )