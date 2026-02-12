import json
import azure.functions as func
import logging
from ai_service import generate_ai_response

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