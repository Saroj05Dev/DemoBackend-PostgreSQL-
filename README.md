# Backend API with PostgreSQL, Drizzle ORM, and Neon

A Node.js backend API using Express.js, PostgreSQL with Neon database, and Drizzle ORM following a layered architecture.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables in `.env`:
```
DATABASE_URL="your-neon-database-url"
PORT=5000
JWT_SECRET="your-super-secret-jwt-key-here"
```

3. Generate and run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### User Registration
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### User Login
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
```
GET /api/users/profile/:id
```

## Architecture

- **index.js** - Main application entry point
- **routes/** - API route definitions
- **controllers/** - Request/response handling and validation
- **services/** - Business logic
- **repositories/** - Database operations
- **schemas/** - Drizzle ORM table definitions