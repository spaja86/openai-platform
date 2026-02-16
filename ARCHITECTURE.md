# OpenAI Platform - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Port 80)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React 18 + TypeScript + Vite + Tailwind CSS          │ │
│  │  - Login/Register Pages                               │ │
│  │  - Dashboard with Chat Interface                      │ │
│  │  - Conversation Management                            │ │
│  │  - Real-time Messaging                                │ │
│  │  - State Management (Zustand)                         │ │
│  │  - API Client (TanStack Query + Axios)               │ │
│  └────────────────────────────────────────────────────────┘ │
│                    Nginx Reverse Proxy                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/WebSocket
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API (Port 3000)                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Node.js + Express + TypeScript                       │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Authentication Layer (JWT + bcrypt)              │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ API Routes                                       │ │ │
│  │  │ - /api/auth/*    (login, register, refresh)     │ │ │
│  │  │ - /api/conversations/* (CRUD operations)        │ │ │
│  │  │ - /api/ai/*      (chat, models)                 │ │ │
│  │  │ - /api/users/*   (profile, usage)               │ │ │
│  │  │ - /api/admin/*   (user management, stats)       │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Controllers                                      │ │ │
│  │  │ - authController                                │ │ │
│  │  │ - conversationController                        │ │ │
│  │  │ - aiController (OpenAI integration)             │ │ │
│  │  │ - userController                                │ │ │
│  │  │ - adminController                               │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Socket.io (Real-time Communication)             │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────┬────────────────────────┬─────────────────────┘
               │                        │
               ▼                        ▼
┌──────────────────────────┐  ┌─────────────────────────────┐
│   PostgreSQL Database    │  │    OpenAI API               │
│   (Port 5432)            │  │                             │
│  ┌────────────────────┐  │  │  - Chat Completions        │
│  │ Tables:            │  │  │  - Streaming Support       │
│  │ - Users            │  │  │  - Multiple Models         │
│  │ - Conversations    │  │  │    (GPT-4, GPT-3.5)       │
│  │ - Messages         │  │  └─────────────────────────────┘
│  │ - Subscriptions    │  │
│  │ - API Keys         │  │
│  │ - Audit Logs       │  │
│  └────────────────────┘  │
│   Prisma ORM             │
└──────────────────────────┘
```

## Data Flow

### User Authentication Flow
```
User → Frontend (Login) → POST /api/auth/login → Backend
                                                    ↓
                                            Verify Password
                                                    ↓
                                            Generate JWT Tokens
                                                    ↓
Frontend ← Access Token + Refresh Token ← Backend
```

### Chat Message Flow
```
User Types Message → Frontend
                       ↓
                POST /api/ai/chat (with JWT)
                       ↓
                    Backend
                       ↓
              Verify Authentication
                       ↓
              Check Token Limits
                       ↓
              Save User Message to DB
                       ↓
              Stream to OpenAI API
                       ↓
              Stream Response Back
                       ↓
              Save Assistant Message
                       ↓
              Update Token Usage
                       ↓
Frontend ← SSE Stream ← Backend
    ↓
Display Message in Real-time
```

## Technology Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Real-time**: Socket.io
- **AI Integration**: OpenAI SDK
- **Validation**: Zod

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Real-time**: Socket.io Client

### Database
- **Database**: PostgreSQL 15
- **Schema Management**: Prisma
- **Migrations**: Prisma Migrate

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (for frontend)
- **Build**: Multi-stage Docker builds

## Security Features

1. **Authentication**
   - JWT-based authentication
   - Secure password hashing with bcrypt
   - Token refresh mechanism
   - Protected routes

2. **Authorization**
   - Role-based access control (USER, ADMIN, SUPERADMIN)
   - Ownership verification for resources
   - Admin-only endpoints

3. **API Security**
   - CORS configuration
   - Request validation with Zod
   - Error handling middleware
   - SQL injection prevention (Prisma ORM)

4. **Data Protection**
   - Environment variables for secrets
   - Secure database connections
   - Token expiration
   - Audit logging

## Deployment

### Docker Compose
```bash
docker compose up -d
```

This starts:
- PostgreSQL database on port 5432
- Backend API on port 3000
- Frontend application on port 80

### Environment Variables
Required variables in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `JWT_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get tokens
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

### Conversation Endpoints
- `GET /api/conversations` - List all user conversations
- `GET /api/conversations/:id` - Get conversation details
- `POST /api/conversations` - Create new conversation
- `PUT /api/conversations/:id` - Update conversation title
- `DELETE /api/conversations/:id` - Delete conversation

### AI Endpoints
- `POST /api/ai/chat` - Send message (Server-Sent Events streaming)
- `GET /api/ai/models` - Get available AI models

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/change-password` - Change password
- `GET /api/users/usage` - Get usage statistics

### Admin Endpoints (Admin only)
- `GET /api/admin/users` - List all users
- `GET /api/admin/stats` - Platform statistics
- `PATCH /api/admin/users/:id/toggle` - Toggle user active status

## Database Schema

### Users
- ID, email, username, password (hashed)
- First name, last name
- Role (USER, ADMIN, SUPERADMIN)
- Active status
- Timestamps

### Conversations
- ID, title, user ID
- Timestamps
- Cascade delete with user

### Messages
- ID, conversation ID
- Role (system, user, assistant)
- Content (text)
- Token count
- Timestamp
- Cascade delete with conversation

### Subscriptions
- ID, user ID
- Plan (FREE, BASIC, PRO, ENTERPRISE)
- Status (ACTIVE, INACTIVE, CANCELLED, EXPIRED)
- Tokens used/limit
- Dates

### API Keys
- ID, user ID, name
- Key value (unique)
- Active status
- Last used timestamp
- Expiration

### Audit Logs
- ID, user ID
- Action, resource
- Details (JSON)
- IP address
- Timestamp

## Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] File upload support
- [ ] Image generation (DALL-E)
- [ ] Voice input/output
- [ ] Conversation sharing
- [ ] Export conversations
- [ ] Advanced analytics dashboard
- [ ] Rate limiting
- [ ] API key management UI
- [ ] Multi-language support
