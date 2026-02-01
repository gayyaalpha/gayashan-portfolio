import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_ai_response(message: str, projects: list) -> str:
    if not projects:
        return "I couldn’t find any relevant projects that match your question."

    context = "\n".join(
        f"- {p['title']}: {p['summary']}"
        for p in projects
    )

    prompt = f"""
You are an AI assistant helping explain my software engineering portfolio.

User question:
{message}

Relevant projects:
{context}

Rules:
- Only talk about the projects above
- Do not invent projects
- Be concise and professional
- Speak in first person
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a portfolio assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4
    )

    return response.choices[0].message.content.strip()


# ✅ Run locally without Azure
if __name__ == "__main__":
    from project_func import load_projects
    from project_func import match_projects

    projects = load_projects()
    message = "portfolio"

    matched = match_projects(message, projects)
    ai_reply = generate_ai_response(message, matched)

    print("\nAI RESPONSE:\n")
    print(ai_reply)
