# GramaSchool Connect

A mobile-first communication platform for rural schools in India, connecting teachers and parents.

## Architecture

```
gramaschool-connect/
├── backend/          # NestJS API server
├── mobile/           # React Native (Expo) app
├── admin/            # React web admin dashboard
├── shared/           # Shared types and constants
└── docker-compose.yml
```

## Tech Stack

- **Mobile**: React Native + Expo + TypeScript + NativeWind
- **Backend**: NestJS + TypeScript + PostgreSQL + TypeORM
- **Admin**: React + Vite + TypeScript + Tailwind CSS
- **Auth**: Firebase OTP
- **Storage**: AWS S3 / Cloudinary
- **Notifications**: Firebase Cloud Messaging + SMS fallback
- **AI**: Speech-to-text, auto-translation

## Supported Languages

English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional)
- Expo CLI
- Firebase project

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run migration:run
npm run start:dev
```

### Mobile Setup

```bash
cd mobile
cp .env.example .env
npm install
npx expo start
```

### Admin Setup

```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

### Docker Setup

```bash
docker-compose up -d
```

## Environment Variables

See `.env.example` files in each directory.

## Database

PostgreSQL with TypeORM. Run migrations:

```bash
cd backend
npm run migration:run
```

## API Documentation

Start the backend and visit `http://localhost:3000/api/docs` for Swagger documentation.

## Deployment

1. Build Docker images: `docker-compose build`
2. Set production environment variables
3. Run: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## License

MIT
