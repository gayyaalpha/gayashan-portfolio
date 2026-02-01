import datetime
import json
import logging
import os


def load_projects():
    file_path = os.path.join(os.path.dirname(__file__), "projects.json")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def match_projects(message: str, projects: list) -> list:
    message = message.lower()
    matched = []

    for project in projects:
        keywords = [
            project["id"].lower(),
            project["title"].lower(),
            *[tech.lower() for tech in project.get("technologies", [])]
        ]

        if any(keyword in message for keyword in keywords):
            matched.append(project)

    return matched
