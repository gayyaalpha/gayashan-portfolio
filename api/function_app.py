from datetime import datetime
import json
import os
import azure.functions as func
import logging
from ai_service import generate_ai_response
from azure.data.tables import TableServiceClient
from azure.core.exceptions import ResourceExistsError

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="chat_trigger", methods=["POST"])
def chat_trigger(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    message = req.params.get('message')
    if not message:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            message = req_body.get('message')

    if message:
        ai_response = generate_ai_response(message)
        return func.HttpResponse(
            json.dumps({
                "answer": ai_response
            }),
            status_code=200,
            mimetype="application/json"
        )
    else:
        return func.HttpResponse(
             "Hello I'm Gayashan's AI assistant, how can I help you today?",
             status_code=200
        )


@app.route(route="contact_submit", methods=["POST"])
def contact_submit(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Contact form submission received.")

    try:
        body = req.get_json()
    except ValueError:
        return func.HttpResponse(
            "Invalid JSON",
            status_code=400
        )

    name = body.get("name")
    email = body.get("email")
    message = body.get("message")

    # Basic validation
    if not name or not email or not message:
        return func.HttpResponse(
            json.dumps({"error": "All fields are required"}),
            status_code=400,
            mimetype="application/json"
        )
      # Connect to Azure Table Storage
    connection_string = os.environ["AzureWebJobsStorage"]
    table_service = TableServiceClient.from_connection_string(connection_string)
    table_client = table_service.get_table_client("contactMessages")

    # Create entity
    entity = {
        "PartitionKey": "contact",
        "RowKey": datetime.utcnow().isoformat(),
        "name": name,
        "email": email,
        "message": message,
        "timestamp": datetime.utcnow().isoformat(),
    }

    table_client.create_entity(entity=entity)

    return func.HttpResponse(
        json.dumps({"success": True}),
        status_code=200,
        mimetype="application/json"
    )