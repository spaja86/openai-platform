import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { conversationService } from '../services/conversation';
import { aiService } from '../services/ai';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { Button } from '../components/Button';
import { Message } from '../types';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, clearAuth } = useAuthStore();
  const {
    conversations,
    currentConversation,
    messages,
    setConversations,
    setCurrentConversation,
    setMessages,
    addMessage,
    updateLastMessage,
  } = useChatStore();

  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Fetch conversations
  const { data: conversationsData } = useQuery({
    queryKey: ['conversations'],
    queryFn: conversationService.getAll,
  });

  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData);
    }
  }, [conversationsData, setConversations]);

  // Fetch conversation details
  const { data: conversationData } = useQuery({
    queryKey: ['conversation', currentConversation?.id],
    queryFn: () => conversationService.getById(currentConversation!.id),
    enabled: !!currentConversation,
  });

  useEffect(() => {
    if (conversationData?.messages) {
      setMessages(conversationData.messages);
    }
  }, [conversationData, setMessages]);

  // Create conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: conversationService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setCurrentConversation(data);
    },
  });

  // Delete conversation mutation
  const deleteConversationMutation = useMutation({
    mutationFn: conversationService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setCurrentConversation(null);
      setMessages([]);
    },
  });

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleNewConversation = () => {
    const title = `Conversation ${(conversations?.length || 0) + 1}`;
    createConversationMutation.mutate(title);
  };

  const handleSelectConversation = (id: string) => {
    const conv = conversations?.find((c) => c.id === id);
    if (conv) {
      setCurrentConversation(conv);
    }
  };

  const handleDeleteConversation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      deleteConversationMutation.mutate(id);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentConversation || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      conversationId: currentConversation.id,
      role: 'user',
      content: messageInput,
      createdAt: new Date().toISOString(),
    };

    addMessage(userMessage);
    setMessageInput('');
    setIsSending(true);

    // Add placeholder for assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      conversationId: currentConversation.id,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    };
    addMessage(assistantMessage);

    try {
      await aiService.chat(
        {
          conversationId: currentConversation.id,
          message: messageInput,
        },
        (content) => {
          updateLastMessage(content);
        }
      );

      // Refresh conversation list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">OpenAI Platform</h1>
          <p className="text-sm text-gray-400 mt-1">
            {user?.username || user?.email}
          </p>
        </div>

        <div className="p-4">
          <Button
            onClick={handleNewConversation}
            className="w-full"
            variant="primary"
          >
            + New Conversation
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations?.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 mx-2 mb-2 rounded cursor-pointer hover:bg-gray-700 ${
                currentConversation?.id === conv.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSelectConversation(conv.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-gray-400">
                    {conv._count?.messages || 0} messages
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conv.id);
                  }}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <Button onClick={handleLogout} className="w-full" variant="secondary">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                {currentConversation.title}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block max-w-3xl p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white border-t p-4">
              <div className="flex gap-2 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() || isSending}
                  isLoading={isSending}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                Welcome to OpenAI Platform
              </h2>
              <p className="text-gray-500 mb-6">
                Select a conversation or create a new one to get started
              </p>
              <Button onClick={handleNewConversation}>
                + New Conversation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
