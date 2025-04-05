# Taqa Mate - Energy Efficiency Recommendations

Taqa Mate is an energy efficiency recommendation app that helps users identify potential energy-saving opportunities for their buildings.

## Project Structure

The application is structured as follows:

- **client/**: React frontend built with Vite and shadcn UI components
- **server/**: Express.js backend with API endpoints
- **shared/**: Common code and types shared between frontend and backend
- **app/**: Next.js app structure (in development)

## Database Schema

The application uses PostgreSQL with Drizzle ORM for data modeling:

- `users`: User authentication and profiles
- `buildings`: Building information submitted by users
- `monthlyConsumption`: Monthly energy consumption data
- `recommendations`: Energy-saving recommendations
- `buildingRecommendations`: Junction table linking buildings to recommendations

## API Endpoints

- POST /api/recommendations: Submit building data and get personalized recommendations
- GET /api/buildings/:id/recommendations: Get recommendations for a specific building

## Development Notes

- The application uses Drizzle ORM with PostgreSQL for database operations
- API endpoints are defined in server/routes.ts
- Database schema is defined in shared/schema.ts
- Storage interface for database operations is in server/storage.ts
