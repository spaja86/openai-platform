export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  isActive?: boolean;
  createdAt: string;
  subscription?: Subscription;
}

export interface Subscription {
  plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'EXPIRED';
  tokensUsed: number;
  tokensLimit: number;
}

export interface Conversation {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
  _count?: {
    messages: number;
  };
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  tokens?: number;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ChatRequest {
  conversationId: string;
  message: string;
  model?: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
}
