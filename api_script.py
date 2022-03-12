import requests
for i in range(20):
    query = {
        "temperature": -100+i*5,
        "humidity": i*5,
        "light": i*(4000/5),
        "wind": 0.0,
        "pressure": 5000+i*10,
        "base": 2,
    }
    response = requests.post('http://85.90.247.66/api/measurement-create/', data=query)

print(response.json())