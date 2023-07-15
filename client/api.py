import requests , json
url = 'http://localhost:8080/'

word = input('enter a word : ')

message = {
    'text' : word,
    'target' : 'ta',
}

response = requests.post(url, data=message)
print(response.status_code)  
print(response.json())

