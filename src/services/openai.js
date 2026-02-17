const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.validateApiKey();
    
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'placeholder'
    });
  }

  validateApiKey() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ GREŠKA: OPENAI_API_KEY nije postavljen!');
      console.log('📖 Molimo pročitajte API_KEY_SETUP.md za instrukcije.');
      console.log('🔗 https://platform.openai.com/api-keys');
      return false;
    }

    // Check if it's the placeholder value
    if (apiKey === 'your_openai_api_key_here' || apiKey === 'placeholder') {
      console.error('❌ GREŠKA: OPENAI_API_KEY koristi placeholder vrednost!');
      console.log('📖 Molimo pročitajte API_KEY_SETUP.md za instrukcije.');
      return false;
    }

    // Validate format (should start with 'sk-')
    if (!apiKey.startsWith('sk-')) {
      console.warn('⚠️  UPOZORENJE: API ključ ne izgleda validno (treba da počinje sa "sk-")');
      console.log('📖 Proverite API_KEY_SETUP.md ako imate problema.');
      return false;
    }

    console.log('✅ OpenAI API ključ je konfigurisan');
    return true;
  }

  async generateChatResponse(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: options.model || 'gpt-3.5-turbo',
        messages: messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
      });

      return {
        success: true,
        message: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      console.error('OpenAI Chat greška:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateImage(prompt, options = {}) {
    try {
      const response = await this.client.images.generate({
        model: options.model || 'dall-e-3',
        prompt: prompt,
        n: options.n || 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
      });

      return {
        success: true,
        images: response.data
      };
    } catch (error) {
      console.error('OpenAI Image greška:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async analyzeText(text, analysisType = 'general') {
    const prompts = {
      general: `Analiziraj sledeći tekst i daj sveobuhvatnu analizu: ${text}`,
      sentiment: `Analiziraj sentiment sledećeg teksta (pozitivno, negativno, neutralno): ${text}`,
      summary: `Napravi kratak i jasan rezime sledećeg teksta: ${text}`,
      keywords: `Izdvoj ključne reči i teme iz sledećeg teksta: ${text}`
    };

    const prompt = prompts[analysisType] || prompts.general;

    return this.generateChatResponse([
      { role: 'user', content: prompt }
    ]);
  }

  async generateBusinessContent(type, description) {
    const prompts = {
      email: `Napiši profesionalan email na osnovu sledećeg opisa: ${description}`,
      proposal: `Napiši poslovnu ponudu na osnovu sledećeg opisa: ${description}`,
      report: `Napiši poslovni izveštaj na osnovu sledećeg opisa: ${description}`,
      marketing: `Napiši marketing tekst na osnovu sledećeg opisa: ${description}`
    };

    const prompt = prompts[type] || description;

    return this.generateChatResponse([
      { role: 'system', content: 'Ti si profesionalni poslovni asistent koji pomaže u kreiranju različitih vrsta poslovnih dokumenata.' },
      { role: 'user', content: prompt }
    ]);
  }
}

module.exports = new OpenAIService();
