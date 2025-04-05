FROM node:20-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "start"]