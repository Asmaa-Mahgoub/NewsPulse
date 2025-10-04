""" import requests

API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"
headers = {"Authorization": "Bearer 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"}  

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

print(query({"inputs": "Hello, how are you?"})) """
