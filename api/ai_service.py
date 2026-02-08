import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


PROMPT_ID = os.getenv("OPENAI_PROMPT_ID")
PROMPT_VERSION = os.getenv("OPENAI_PROMPT_VERSION")

def generate_ai_response(message: str) -> str:
    """
    Sends the user message to the OpenAI Prompt
    which is already connected to the vector store.
    """

    response = client.responses.create(
        prompt={
            "id": PROMPT_ID,
            "version": PROMPT_VERSION
        },
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": message}
                ]
            }
        ]
    )

    for output in response.output:
        if output.type == "message":
            for content in output.content:
                if content.type == "output_text":
                    return content.text

    return "I’m sorry — I couldn’t generate a response."


# ✅ Local test (NO Azure required)
if __name__ == "__main__":
    while True:
        user_input = input("\nAsk about my career (or 'exit'): ")
        if user_input.lower() == "exit":
            break

        answer = generate_ai_response(user_input)
        print("\nAI RESPONSE:\n")
        print(answer)