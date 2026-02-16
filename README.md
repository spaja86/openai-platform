# 🤖 OpenAI Platform

Profesionalna platforma za poslovanje, filmove, slike, igrice i još mnogo toga, pokretana OpenAI tehnologijom.

## 🌟 Karakteristike

### 💬 AI Chat Asistent
- Inteligentni chat interfejs
- Podrška za kompleksna pitanja
- Kontekstualna konverzacija

### 🎨 Generisanje Slika (DALL-E)
- Kreiranje jedinstvenih slika pomoću AI
- Podrška za različite veličine (1024x1024, 1792x1024, 1024x1792)
- HD i standardni kvalitet

### 💼 Poslovni Alati
- **Generisanje Sadržaja**: Email, ponude, izveštaji, marketing tekst
- **Analiza Teksta**: Opšta analiza, sentiment analiza, rezime, ključne reči

## 🚀 Instalacija

### Preduslov
- Node.js (v14 ili noviji)
- OpenAI API ključ

### Koraci

1. **Klonirajte repozitorijum**
```bash
git clone https://github.com/spaja86/openai-platform.git
cd openai-platform
```

2. **Instalirajte zavisnosti**
```bash
npm install
```

3. **Podesite environment varijable**
```bash
cp .env.example .env
```

Uredite `.env` fajl i dodajte vaš OpenAI API ključ:
```
OPENAI_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=development
```

4. **Pokrenite aplikaciju**
```bash
npm start
```

Za razvoj sa automatskim ponovnim pokretanjem:
```bash
npm run dev
```

5. **Pristupite aplikaciji**
Otvorite pretraživač i idite na `http://localhost:3000`

## 📁 Struktura Projekta

```
openai-platform/
├── src/
│   ├── server.js              # Glavni server fajl
│   ├── services/
│   │   └── openai.js          # OpenAI servis
│   └── routes/
│       ├── chat.js            # Chat rute
│       ├── image.js           # Rute za generisanje slika
│       └── business.js        # Poslovne rute
├── public/
│   ├── index.html             # Glavni HTML fajl
│   ├── styles.css             # Stilovi
│   └── script.js              # Frontend JavaScript
├── .env.example               # Primer environment varijabli
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Chat
- `POST /api/chat` - Pošalji chat poruke
- `POST /api/chat/question` - Postavi jednostavno pitanje

### Generisanje Slika
- `POST /api/image/generate` - Generiši sliku pomoću DALL-E

### Poslovni Alati
- `POST /api/business/analyze` - Analiziraj tekst
- `POST /api/business/generate` - Generiši poslovni sadržaj

### Zdravlje Sistema
- `GET /api/health` - Proveri status servera

## 🔒 Sigurnost

Platforma uključuje:
- Helmet.js za sigurnosne zaglavlja
- Rate limiting za prevenciju zlouptrebe
- CORS konfiguraciju
- Input validaciju
- Environment varijable za osetljive podatke

## 🛠️ Tehnologije

- **Backend**: Node.js, Express.js
- **AI**: OpenAI API (GPT-3.5-turbo, DALL-E 3)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Sigurnost**: Helmet, Express Rate Limit, CORS

## 📝 Licence

MIT License - Vidite LICENSE fajl za detalje

## 👨‍💻 Autor

spaja86

## 🤝 Doprinos

Doprinosi su dobrodošli! Molimo vas otvorite issue ili pull request.

## ⚠️ Napomena

Potreban je važeći OpenAI API ključ za korišćenje ove platforme. Nabavite svoj ključ na [OpenAI Platform](https://platform.openai.com/).

## 📧 Kontakt

Za pitanja i podršku, molimo otvorite issue na GitHub repozitorijumu.
