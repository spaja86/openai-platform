# 🤖 OpenAI Platform

Profesionalna AI platforma za poslovanje, kreativnost i produktivnost - Powered by OpenAI

![OpenAI Platform](https://github.com/user-attachments/assets/a31de376-311f-42dc-8edd-bc56971a9ec0)

## 🌟 Karakteristike

### 💬 AI Chat Asistent
- Inteligentni chat interfejs sa GPT-3.5-turbo
- Kontekstualna konverzacija u realnom vremenu
- Podrška za kompleksna pitanja i zadatke
- Intuitivni UI sa historijom poruka

### 🎨 Generisanje Slika (DALL-E 3)
- Kreiranje jedinstvenih slika pomoću AI
- Podrška za različite veličine (1024x1024, 1792x1024, 1024x1792)
- HD i standardni kvalitet
- Instant preview generisanih slika

### 💼 Poslovni Alati
- **Generisanje Sadržaja**: Email, ponude, izveštaji, marketing tekst
- **Analiza Teksta**: Opšta analiza, sentiment analiza, rezime, ključne reči
- AI-powered profesionalno pisanje

## ✨ Novi Dizajn

Platforma je kompletno redizajnirana sa modernim, profesionalnim izgledom:

- 🎨 **Hero sekcija** sa gradijent pozadinom i SVG ilustracijama
- 📱 **Responsive dizajn** optimizovan za sve uređaje
- 🌈 **Moderne animacije** i smooth transitions
- 💡 **Feature cards** sa hover efektima
- 📖 **About sekcija** sa statistikama platforme
- ❓ **FAQ accordion** sa najčešćim pitanjima
- 🦶 **Profesionalni footer** sa linkovima i informacijama

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
│   ├── index.html             # Glavni HTML fajl (redesigned)
│   ├── styles.css             # Stilovi (modernizovani)
│   └── script.js              # Frontend JavaScript
├── .env.example               # Primer environment varijabli
├── .gitignore
├── package.json
├── README.md
├── PREDLOZI.md               # Detaljni predlozi za dalji razvoj
└── STYLE_GUIDE.md            # Vodič za dizajn i stilove
```

## 🎨 Dizajn i UX

Platforma koristi moderan, profesionalan dizajn sa:

- **Color Scheme**: Zelena (#10a37f) kao primarna boja, sa profesionalnim akcentima
- **Typography**: System font stack za optimalnu čitljivost
- **Layout**: Responsive grid sistem sa mobile-first pristupom
- **Animations**: Smooth CSS transitions i keyframe animacije
- **Accessibility**: ARIA labele i semantički HTML

Za više detalja, pogledajte [STYLE_GUIDE.md](STYLE_GUIDE.md)

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

## 🎯 Roadmap i Predlozi

Za detaljne predloge budućih funkcionalnosti i unapređenja, pogledajte [PREDLOZI.md](PREDLOZI.md).

Neki od planiranih unapređenja uključuju:
- 💾 Čuvanje istorije konverzacija
- 🌓 Dark mode
- 📱 Progressive Web App (PWA)
- 🔐 Korisnički nalozi i autentifikacija
- 📊 Analytics dashboard
- 🌍 Multi-language podrška
- 🔌 API za eksterne integracije

## 🤝 Doprinos

Doprinosi su dobrodošli! Molimo vas otvorite issue ili pull request.

### Kako doprineti:
1. Fork repozitorijum
2. Kreirajte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit izmene (`git commit -m 'Add some AmazingFeature'`)
4. Push na branch (`git push origin feature/AmazingFeature`)
5. Otvorite Pull Request

## ⚠️ Napomena

Potreban je važeći OpenAI API ključ za korišćenje ove platforme. Nabavite svoj ključ na [OpenAI Platform](https://platform.openai.com/).

## 📧 Kontakt

Za pitanja i podršku, molimo otvorite issue na GitHub repozitorijumu.

---

**Dizajnirano sa ❤️ za profesionalnu upotrebu**
