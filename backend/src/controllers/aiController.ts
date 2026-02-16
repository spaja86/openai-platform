import { Response } from 'express';
import { z } from 'zod';
import OpenAI from 'openai';
import prisma from '../config/database';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

const chatSchema = z.object({
  conversationId: z.string().uuid(),
  message: z.string().min(1),
  model: z.string().optional().default('gpt-3.5-turbo'),
});

export const chat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const data = chatSchema.parse(req.body);

    // Verify conversation ownership
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: data.conversationId,
        userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 20, // Limit context to last 20 messages
        },
      },
    });

    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }

    // Check subscription limits
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (
      subscription &&
      subscription.tokensUsed >= subscription.tokensLimit
    ) {
      res.status(403).json({ error: 'Token limit exceeded' });
      return;
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: data.conversationId,
        role: 'user',
        content: data.message,
      },
    });

    // Prepare messages for OpenAI
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      ...conversation.messages.map((msg) => ({
        role: msg.role as 'system' | 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: data.message,
      },
    ];

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Create streaming completion
    const stream = await openai.chat.completions.create({
      model: data.model,
      messages,
      stream: true,
    });

    let fullResponse = '';
    let totalTokens = 0;

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }

      // Estimate tokens (rough estimation)
      totalTokens = Math.ceil(fullResponse.length / 4);
    }

    // Save assistant message
    await prisma.message.create({
      data: {
        conversationId: data.conversationId,
        role: 'assistant',
        content: fullResponse,
        tokens: totalTokens,
      },
    });

    // Update subscription usage
    if (subscription) {
      await prisma.subscription.update({
        where: { userId },
        data: {
          tokensUsed: subscription.tokensUsed + totalTokens,
        },
      });
    }

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() },
    });

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input', details: error.errors });
      return;
    }
    console.error('Chat error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process chat' });
    }
  }
};

export const getModels = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // Return common models (API doesn't require listing)
    const models = [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'Most capable model, best for complex tasks',
      },
      {
        id: 'gpt-4-turbo-preview',
        name: 'GPT-4 Turbo',
        description: 'Faster and cheaper than GPT-4',
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        description: 'Fast and efficient for most tasks',
      },
    ];

    res.json(models);
  } catch (error) {
    console.error('Get models error:', error);
    res.status(500).json({ error: 'Failed to get models' });
  }
};
