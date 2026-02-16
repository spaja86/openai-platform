const express = require('express');
const router = express.Router();
const openaiService = require('../services/openai');

// Text analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    const { text, analysisType } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Tekst je obavezan' });
    }

    const result = await openaiService.analyzeText(text, analysisType);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Text analysis greška:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom analize teksta' });
  }
});

// Generate business content endpoint
router.post('/generate', async (req, res) => {
  try {
    const { type, description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Opis je obavezan' });
    }

    const result = await openaiService.generateBusinessContent(type, description);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Business content generation greška:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom generisanja poslovnog sadržaja' });
  }
});

module.exports = router;
