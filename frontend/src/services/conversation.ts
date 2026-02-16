import api from './api';
import { Conversation } from '../types';

export const conversationService = {
  getAll: async (): Promise<Conversation[]> => {
    const response = await api.get<Conversation[]>('/conversations');
    return response.data;
  },

  getById: async (id: string): Promise<Conversation> => {
    const response = await api.get<Conversation>(`/conversations/${id}`);
    return response.data;
  },

  create: async (title: string): Promise<Conversation> => {
    const response = await api.post<Conversation>('/conversations', { title });
    return response.data;
  },

  update: async (id: string, title: string): Promise<Conversation> => {
    const response = await api.put<Conversation>(`/conversations/${id}`, {
      title,
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/conversations/${id}`);
  },
};
