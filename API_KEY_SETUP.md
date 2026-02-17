# 🔑 OpenAI API Key Setup Guide

## ⚠️ BEZBEDNOSNO UPOZORENJE / SECURITY WARNING

**NIKADA NE DELITE VAŠE API KLJUČEVE JAVNO!**  
**NEVER SHARE YOUR API KEYS PUBLICLY!**

API ključevi su kao lozinke - treba ih čuvati u tajnosti!

---

## 📋 Kako Dobiti OpenAI API Ključ

### Korak 1: Kreiraj OpenAI Nalog

1. Idi na [platform.openai.com](https://platform.openai.com)
2. Klikni na "Sign Up" ili "Log In"
3. Kreiraj nalog ili se prijavi

### Korak 2: Dodaj Kredit

1. Idi na [Billing](https://platform.openai.com/account/billing)
2. Dodaj način plaćanja (kreditna kartica)
3. Dodaj kredit ($5-$10 za početak je dovoljno)

### Korak 3: Kreiraj API Ključ

1. Idi na [API Keys](https://platform.openai.com/api-keys)
2. Klikni **"Create new secret key"**
3. Daj mu ime (npr. "OpenAI Platform Production")
4. **ODMAH kopiraj ključ** - neće biti prikazan ponovo!
5. Sačuvaj ga na sigurnom mestu

**Format API ključa:**
```
sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
ili stariji format:
```
sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 🛠️ Konfiguracija na Lokalnom Računaru

### 1. Kreiraj `.env` Fajl

U root folderu projekta, kreiraj fajl `.env`:

```bash
# Na Windows
copy .env.example .env

# Na Mac/Linux
cp .env.example .env
```

### 2. Dodaj API Ključ

Otvori `.env` fajl i zameni `your_openai_api_key_here` sa tvojim pravim ključem:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-proj-vaš_pravi_ključ_ovde

# Server Configuration
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Verifikuj Setup

```bash
# Instaliraj dependencies
npm install

# Startuj server
npm start
```

Ako je sve OK, videćeš:
```
✅ Server pokrenut na http://localhost:3000
```

Ako API ključ nije postavljen:
```
⚠️  OPENAI_API_KEY nije postavljen u .env fajlu
```

---

## 🚀 Konfiguracija za Produkciju

### Vercel

1. Idi na Vercel Dashboard
2. Izaberi svoj projekat
3. Idi na **Settings** → **Environment Variables**
4. Dodaj:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-vaš_ključ`
   - **Environments:** Production, Preview, Development

### Netlify

1. Idi na Netlify Dashboard
2. Izaberi svoj sajt
3. Idi na **Site settings** → **Environment variables**
4. Dodaj:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-vaš_ključ`

### Heroku

```bash
heroku config:set OPENAI_API_KEY=sk-proj-vaš_ključ
```

### Railway

1. Idi na Railway Dashboard
2. Izaberi svoj projekat
3. Idi na **Variables** tab
4. Dodaj:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-vaš_ključ`

### Render

1. Idi na Render Dashboard
2. Izaberi svoj servis
3. Idi na **Environment** tab
4. Dodaj:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-vaš_ključ`

---

## 🔒 Bezbednost API Ključa

### ✅ ŠTO TREBA DA RADIŠ

- ✅ Čuvaj API ključ u `.env` fajlu
- ✅ Dodaj `.env` u `.gitignore` (već dodato!)
- ✅ Koristi environment variables na hosting platformama
- ✅ Regeneriši ključ ako sumačaš da je kompromitovan
- ✅ Koristi različite ključeve za development i production
- ✅ Prati usage na OpenAI dashboard-u

### ❌ ŠTO NE TREBA DA RADIŠ

- ❌ NIKAD ne commituj `.env` fajl u Git
- ❌ NIKAD ne deli API ključ u kodu
- ❌ NIKAD ne postavi API ključ u frontend JavaScript
- ❌ NIKAD ne šalji API ključ preko email-a
- ❌ NIKAD ne deli screenshots sa API ključem
- ❌ NIKAD ne postavi API ključ u GitHub Issues/PRs

---

## 🧪 Testiranje API Ključa

### Test 1: Chat API

```bash
curl http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Pozdrav!"}
    ]
  }'
```

**Očekivan odgovor:**
```json
{
  "success": true,
  "message": "Zdravo! Kako ti mogu pomoći danas?"
}
```

### Test 2: Image Generation

```bash
curl http://localhost:3000/api/image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Beautiful sunset over mountains"
  }'
```

**Očekivan odgovor:**
```json
{
  "success": true,
  "images": [...]
}
```

---

## 🐛 Troubleshooting

### Problem: "Invalid API key"

**Rešenje:**
1. Proveri da li si koristio `sk-` prefiks
2. Proveri da li si kopirao kompletan ključ
3. Proveri da li ima extra spaces/line breaks
4. Regeneriši novi ključ na OpenAI platformi

### Problem: "You exceeded your current quota"

**Rešenje:**
1. Proveri billing na [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
2. Dodaj kredit na nalog
3. Proveri da li imaš aktivnu payment metodu

### Problem: "Rate limit exceeded"

**Rešenje:**
1. Sačekaj nekoliko minuta
2. Ako se nastavlja, povećaj tier na OpenAI platformi
3. Optimizuj broj API calls u aplikaciji

### Problem: API ključ ne radi nakon deploy-a

**Rešenje:**
1. Proveri environment variables na hosting platformi
2. Proveri da li si restartovao servis nakon dodavanja
3. Proveri logs za greške

---

## 💰 Cene i Limitsi

### GPT-3.5-Turbo (Chat)
- ~$0.0005 per 1K input tokens
- ~$0.0015 per 1K output tokens
- **Prosečna cena po poruci:** ~$0.001-0.003

### DALL-E 3 (Slike)
- Standard quality: $0.040 per image (1024×1024)
- HD quality: $0.080 per image (1024×1024)

### Procena Troškova

**Za 1000 korisnika:**
- 1000 chat poruka: ~$1-3
- 1000 slika: ~$40-80

**Preporuka:**
- Počni sa $10-20 kredita
- Monitor usage svakodnevno
- Postavi usage limits na OpenAI dashboard-u

---

## 📊 Monitoring

### OpenAI Dashboard

1. Idi na [platform.openai.com/usage](https://platform.openai.com/usage)
2. Proveri:
   - Dnevni usage
   - Mesečni trošak
   - Broj API calls
   - Errors

### Postavi Limite

1. Idi na [Limits](https://platform.openai.com/account/limits)
2. Postavi:
   - **Monthly budget:** Maksimalna mesečna potrošnja
   - **Email alerts:** Obaveštenja kada dostigne % budžeta

---

## 🆘 Support

### OpenAI Support
- Email: support@openai.com
- Help Center: [help.openai.com](https://help.openai.com)
- Community: [community.openai.com](https://community.openai.com)

### Platforma Support
- GitHub Issues: [github.com/spaja86/openai-platform/issues](https://github.com/spaja86/openai-platform/issues)
- Email: spajicn@yahoo.com ili spajicn@gmail.com

---

## 📚 Dodatni Resursi

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI Pricing](https://openai.com/pricing)
- [Rate Limits Guide](https://platform.openai.com/docs/guides/rate-limits)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

---

## ✅ Checklist

Pre pokretanja u produkciji:

- [ ] Kreiran OpenAI nalog
- [ ] Dodat kredit na nalog
- [ ] Kreiran API ključ
- [ ] API ključ postavljen u `.env` lokalno
- [ ] Testiran lokalno (`npm start`)
- [ ] API ključ postavljen u production environment variables
- [ ] Postavljeni usage limits na OpenAI dashboard-u
- [ ] Testiran na production URL-u
- [ ] Monitoring podešen

**Sada si spreman! 🚀**
