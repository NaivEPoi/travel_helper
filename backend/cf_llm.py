import requests
from dotenv import dotenv_values

config = dotenv_values("../.env")

API_BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{config['CF_ACCOUNT_ID']}/ai/run/"
headers = {"Authorization": f"Bearer {config['CF_API_TOKEN']}"}


def run(model, inputs):
    input = { "messages": inputs }
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

def get_attractions(location):
    inputs = [
        { 
            "role": "user", 
            "content": f"Give me some attractions of {location}, along with their address, available time, and expected time to spend. Give the answer in this format with no other extra things: {{\"name\": \"City Tour\", \"location\": \"Downtown\", \"timeAvailability\": \"9:00 AM - 5:00 PM\", \"expectedTime\": \"2 hours\"}}. Don't say Here are some attractions in {location}, along with their address, available time, and expected time to spend: Make sure every part is included between \"\""
        }
    ]
    print(inputs)
    response = run("@cf/meta/llama-3-8b-instruct", inputs)
    # Replace '\n' with ',' in the output
    # output_text = response.get('choices', [{}])[0].get('message', {}).get('content', '')
    output_text = response.get('result', {}).get('response', '')
    # print(output_text)
    output_text = output_text.replace('\n\n', ',')
    output_text = output_text.replace('\n', ',')
    # output_text = output_text.replace('"', '\'')
    output_text = f"[{output_text}]"
    
    return output_text

# Example usage
# output = get_attractions("Chicago")
# print(output)
