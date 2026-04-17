# Opofinance KYC Platform Dashboard

Internal dashboard for managing KYC (Know Your Customer) applications at Opofinance.

## Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 19, Vite, MUI (Material UI)       |
| Backend  | Node.js, Express 5                      |
| Database | PostgreSQL                              |
| ORM      | Prisma                                  |
| Auth     | bcrypt password hashing, JWT-style flow |

## Features

- **Authentication** — Register and login with bcrypt-hashed passwords
- **KYC Applications** — Full CRUD: create, view, update, delete applications
- **Application fields** — Client name/email, document type, status, risk level, country, assigned agent, notes
- **Dark / Light mode** — Theme toggle persisted across sessions
- **REST API** — `/api/auth`, `/api/kyc`, `/api/health` endpoints

## Project Structure

```
kyc-dashboard/
├── src/                  # React frontend (Vite)
└── backend/
    ├── controllers/      # Route handler logic
    ├── routes/           # Express route definitions
    └── prisma/           # Prisma schema & migrations
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a remote connection string)

### 1. Backend

```bash
cd backend
npm install

# Create a .env file with your database URL
echo 'DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/kyc_db"' > .env

# Run migrations and generate Prisma client
npm run db:migrate
npm run db:generate

# Start the dev server (port 3001)
npm run dev
```

### 2. Frontend

```bash
# From the project root
npm install
npm run dev   # starts at http://localhost:5173
```

### Prisma utilities

```bash
cd backend
npm run db:migrate   # apply new migrations
npm run db:studio    # open Prisma Studio GUI
```

## API Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/auth/register    | Register a new user      |
| POST   | /api/auth/login       | Login and receive token  |
| GET    | /api/kyc              | List all KYC applications|
| POST   | /api/kyc              | Create new application   |
| PUT    | /api/kyc/:id          | Update application       |
| DELETE | /api/kyc/:id          | Delete application       |
| GET    | /api/health           | Health check             |

## Team

| Name      | Role               |
|-----------|--------------------|
| Ali Javid | KYC Team Manager   |
