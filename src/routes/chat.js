const express = require('express');
const router = express.Router();
const openaiService = require('../services/openai');

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { messages, model, temperature, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Poruke su obavezne i moraju biti niz' });
    }

    const result = await openaiService.generateChatResponse(messages, {
      model,
      temperature,
      max_tokens
    });

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Chat greška:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom obrade chat zahteva' });
  }
});

// Simple question endpoint
router.post('/question', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Pitanje je obavezno' });
    }

    const result = await openaiService.generateChatResponse([
      { role: 'user', content: question }
    ]);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Question greška:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom obrade pitanja' });
  }
});

module.exports = router;
