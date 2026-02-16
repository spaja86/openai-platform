# OpenAI Platform

A complete professional full-stack OpenAI platform with user authentication, real-time chat, conversation management, and admin panel.

## Features

### Backend
- **Authentication System**: JWT-based authentication with bcrypt password hashing
- **Database**: PostgreSQL with Prisma ORM
- **OpenAI Integration**: Chat completions with streaming support
- **Real-time Communication**: Socket.io for live updates
- **API Endpoints**: RESTful APIs for auth, conversations, AI, users, and admin
- **Usage Tracking**: Token usage monitoring and subscription management
- **Admin Panel**: User management and analytics

### Frontend
- **Modern Stack**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Real-time Updates**: Socket.io client integration

### Infrastructure
- **Containerization**: Docker and Docker Compose
- **Database**: PostgreSQL 15
- **Reverse Proxy**: Nginx for frontend
- **Production Ready**: Multi-stage Docker builds

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: JWT, bcrypt
- **Real-time**: Socket.io
- **State Management**: Zustand, TanStack Query
- **DevOps**: Docker, Docker Compose, Nginx

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL (if not using Docker)

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd openai-platform
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Update environment variables**
   Edit `.env` and set your OpenAI API key and other configurations:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   JWT_SECRET=your-secret-key-here
   JWT_REFRESH_SECRET=your-refresh-secret-here
   ```

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

5. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - API Health Check: http://localhost:3000/health

## Local Development Setup

### Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp ../.env.example .env
   # Edit .env with your configuration
   ```

4. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:push
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

The backend will be available at http://localhost:3000

### Frontend

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Conversations
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id` - Get conversation by ID
- `POST /api/conversations` - Create new conversation
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

### AI
- `POST /api/ai/chat` - Send chat message (streaming)
- `GET /api/ai/models` - Get available models

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `GET /api/users/usage` - Get usage statistics

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/stats` - Get platform statistics (Admin only)
- `PATCH /api/admin/users/:id/toggle` - Toggle user status (Admin only)

## Database Schema

### Users
- User authentication and profile information
- Role-based access control (USER, ADMIN, SUPERADMIN)
- Account status management

### Conversations
- Chat conversation metadata
- User ownership
- Timestamps

### Messages
- Chat messages with role (system, user, assistant)
- Token usage tracking
- Conversation association

### Subscriptions
- User subscription plans (FREE, BASIC, PRO, ENTERPRISE)
- Token limits and usage tracking
- Status management

### API Keys
- User API key management
- Usage tracking
- Expiration handling

### Audit Logs
- User action tracking
- Resource access logging
- IP address recording

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `JWT_SECRET` - Secret for JWT access tokens
- `JWT_REFRESH_SECRET` - Secret for JWT refresh tokens

### Optional
- `PORT` - Backend server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Docker Commands

### Build and start all services
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild services
```bash
docker-compose up -d --build
```

### Access database
```bash
docker-compose exec postgres psql -U postgres -d openai_platform
```

## Project Structure

```
openai-platform/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docker-compose.yml
├── .env.example
└── README.md
```

## Production Deployment

1. Update environment variables for production
2. Set strong JWT secrets
3. Configure production database URL
4. Update FRONTEND_URL to production domain
5. Build and deploy using Docker Compose:
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

## Security Considerations

- Always use strong, unique JWT secrets in production
- Keep OpenAI API key secure and never commit to version control
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Regular security updates for dependencies
- Enable CORS only for trusted domains

## License

ISC

## Support

For issues and questions, please open an issue in the repository.
