import requests , json
url = 'https://translator-m1zi.onrender.com/'

word = input('enter a word : ')

message = {
    'text' : word,
    'target' : 'ta',
}

response = requests.post(url, data=message)
print(response.status_code)  
print(response.json())

