docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

docker exec -it ollama ollama run tinyllama

 curl -X POST "http://localhost:3000/message" -H "Content-Type: application/json" -d '{ "message": "generate code in python to connect to redis" }'
