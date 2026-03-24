# Smart Solid Waste Management System

Full-stack web application with on-server waste classification (Node + React only).

## Project Structure

- `frontend` React + Tailwind web app
- `backend` Node.js + Express + MongoDB API

## Step-by-Step Setup

### 1) Backend API

1. Open a terminal at `backend`
1. Install dependencies:

```bash
npm install
```

1. Create the environment file:

```bash
copy .env.example .env
```

1. Update `.env` with your MongoDB connection string and JWT secret.
1. Start MongoDB locally (or use MongoDB Atlas).
1. Seed admin and sample user:

```bash
npm run seed
```

1. Run the API:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 2) Frontend

1. Open a terminal at `frontend`
1. Install dependencies:

```bash
npm install
```

1. Create the environment file:

```bash
copy .env.example .env
```

1. Run the app:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment Configuration

### Backend `.env`

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/swms
JWT_SECRET=replace_with_strong_secret
UPLOAD_DIR=uploads
ADMIN_EMAIL=admin@swms.local
ADMIN_PASSWORD=Admin123!
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

## Sample Test Data

- `backend/sample-data/users.json` includes sample user credentials.
- `backend/sample-data/complaints.json` includes sample complaint payloads.

Sample user logins:

- Admin: `admin@swms.local` / `Admin123!`
- User: `user@swms.local` / `User123!`

## Notes

- The backend handles waste classification directly in Node.js.
- Use `POST /api/complaints` to submit complaints with an image and location.
