# Use the official Ollama image as the base image
FROM ollama/ollama:latest

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm
RUN npm add --global nx@latest
# Create app directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port that your API will use
EXPOSE 8000

# Start the API server
# CMD ["node", "app.js"]
CMD ["sh", "-c", "ollama run & node app.js"]