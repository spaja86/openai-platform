const express = require('express');
const router = express.Router();
const openaiService = require('../services/openai');

// Generate image endpoint
router.post('/generate', async (req, res) => {
  try {
    const { prompt, model, size, quality, n } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt je obavezan' });
    }

    const result = await openaiService.generateImage(prompt, {
      model,
      size,
      quality,
      n
    });

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Image generation greška:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom generisanja slike' });
  }
});

module.exports = router;
