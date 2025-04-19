# Use the official Node.js LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

RUN npm run build

# Expose the port the app runs on (adjust if needed)
EXPOSE 8000

ENV PORT=8000

# Command to start your app
CMD ["node", "dist/index.js"]
