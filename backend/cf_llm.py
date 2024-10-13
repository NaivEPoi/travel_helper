import requests
from dotenv import dotenv_values

config = dotenv_values("../.env")

API_BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{config["CF_ACCOUNT_ID"]}/ai/run/"
headers = {"Authorization": f"Bearer {config["CF_API_TOKEN"]}"}


def run(model, inputs):
    input = { "messages": inputs }
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()


inputs = [
    { "role": "system", "content": "You are a friendly assistan that helps write stories" },
    { "role": "user", "content": "Write a short story about a llama that goes on a journey to find an orange cloud "}
]
output = run("@cf/meta/llama-3-8b-instruct", inputs)
print(output)