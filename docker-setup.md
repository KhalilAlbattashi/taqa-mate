# Docker Setup for Taqa Mate

To containerize the application with Docker, you need to create two files: `Dockerfile` and `docker-compose.yml`. Here's the content for each file:

## Dockerfile

```dockerfile
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
```

## docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/taqa_mate
      - NODE_ENV=production
      - PGHOST=db
      - PGPORT=5432
      - PGUSER=postgres
      - PGPASSWORD=postgres
      - PGDATABASE=taqa_mate
    restart: always

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=taqa_mate
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

## How to Run the Containerized Application

1. Create the `Dockerfile` and `docker-compose.yml` files with the content above
2. Run the following command to build and start the application:

```bash
docker-compose up -d
```

3. To stop the application:

```bash
docker-compose down
```

## Database Migrations

When you first run the application with Docker, you need to create the database tables:

1. Connect to the application container:

```bash
docker-compose exec app bash
```

2. Run the database migration:

```bash
npm run db:push
```

This will create all the necessary tables in the PostgreSQL database according to your schema definitions.