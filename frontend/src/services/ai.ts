import api from './api';
import { ChatRequest, Model } from '../types';

export const aiService = {
  chat: async (
    request: ChatRequest,
    onMessage: (content: string) => void
  ): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const response = await fetch(`${API_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.substring(6);
          if (data === '[DONE]') {
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              onMessage(parsed.content);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }
  },

  getModels: async (): Promise<Model[]> => {
    const response = await api.get<Model[]>('/ai/models');
    return response.data;
  },
};
