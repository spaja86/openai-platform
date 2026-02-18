# 🚀 Uputstvo za Pokretanje - OpenAI Platform

## Brzo Pokretanje

### 1. Instalacija Zavisnosti

```bash
npm install
```

**Rezultat:** Instalira sve potrebne pakete (~138 paketa, ~2s)

### 2. Konfiguracija Okruženja

```bash
cp .env.example .env
```

**Za testiranje:** Možete ostaviti placeholder vrednost  
**Za produkciju:** Uredite `.env` i dodajte pravi OpenAI API ključ

```env
OPENAI_API_KEY=sk-proj-your_real_key_here
PORT=3000
NODE_ENV=development
```

### 3. Pokretanje Servera

```bash
npm start
```

**Izlaz:**
```
🚀 OpenAI Platform pokrenut na portu 3000
🌐 Pristupite aplikaciji na http://localhost:3000
```

### 4. Pristup Platformi

Otvorite browser na: **http://localhost:3000**

---

## 📋 Detaljne Komande

### Pokretanje

```bash
# Standardno pokretanje
npm start

# Pokretanje sa specifičnim portom
PORT=8080 npm start

# Pokretanje u production modu
NODE_ENV=production npm start
```

### Provera Statusa

```bash
# Provera da li server radi
curl http://localhost:3000/

# Provera porta
netstat -tuln | grep 3000

# Provera procesa
ps aux | grep "node src/server.js"
```

### Zaustavljanje

```bash
# Pronađi PID
ps aux | grep "node src/server.js"

# Zaustavi server
kill <PID>

# Ili koristite Ctrl+C ako nije u pozadini
```

---

## 🛠️ Različiti Načini Pokretanja

### 1. Razvojno Okruženje (Development)

```bash
npm start
```

- Pokreće se na portu 3000
- Detaljni log
- Hot reload (ako konfigurirano)

### 2. Produkciono Okruženje (Production)

```bash
NODE_ENV=production npm start
```

- Optimizovano izvršavanje
- Minimalni logovi
- Bolje performanse

### 3. Sa Custom Portom

```bash
PORT=8080 npm start
```

Pristup: http://localhost:8080

### 4. U Pozadini (Background)

```bash
nohup npm start > server.log 2>&1 &
```

- Radi u pozadini
- Logovi u `server.log`
- Nastavlja nakon zatvaranja terminala

---

## 🔍 Provera Funkcionalnosti

### Test Homepage

```bash
curl http://localhost:3000/
```

**Očekivano:** HTML stranica (200 OK)

### Test API Zdravlja

```bash
curl http://localhost:3000/api/health
```

**Očekivano:** JSON status response

### Test PWA Manifest

```bash
curl http://localhost:3000/manifest.json
```

**Očekivano:** JSON manifest fajl

### Test Service Worker

```bash
curl http://localhost:3000/sw.js
```

**Očekivano:** JavaScript fajl

---

## 📊 Monitoring

### Praćenje Logova

```bash
# Real-time praćenje
tail -f server.log

# Poslednje 50 linija
tail -n 50 server.log

# Pretraga grešaka
grep "ERROR" server.log
```

### Praćenje Performance-a

```bash
# Response time
curl -o /dev/null -s -w "Time: %{time_total}s\n" http://localhost:3000/

# Detaljne informacije
curl -w "@-" -o /dev/null -s http://localhost:3000/ <<'EOF'
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
      time_redirect:  %{time_redirect}\n
   time_pretransfer:  %{time_pretransfer}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
EOF
```

---

## ⚠️ Rešavanje Problema

### Problem: Port već u upotrebi

**Greška:** `Error: listen EADDRINUSE: address already in use :::3000`

**Rešenje:**
```bash
# Pronađi proces na portu 3000
lsof -i :3000

# Zaustavi proces
kill -9 <PID>

# Ili koristi drugi port
PORT=3001 npm start
```

### Problem: npm dependencies nedostaju

**Greška:** `Error: Cannot find module...`

**Rešenje:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: API ključ nije konfigurisan

**Upozorenje:** `⚠️ UPOZORENJE: API ključ ne izgleda validno`

**Rešenje:**
```bash
# Edituj .env fajl
nano .env

# Dodaj validan OpenAI API ključ
OPENAI_API_KEY=sk-proj-your_real_key_here

# Restartuj server
npm start
```

### Problem: Memorija puna

**Greška:** `FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed`

**Rešenje:**
```bash
# Povećaj memoriju
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

---

## 🎯 Brzi Testovi

### Test 1: Homepage Loading

```bash
curl -s http://localhost:3000/ | head -5
```

**Očekivano:** HTML `<!DOCTYPE html>`

### Test 2: API Response

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

**Očekivano:** JSON response sa AI odgovorom (ili greška ako API ključ nije validan)

### Test 3: Static Files

```bash
curl -I http://localhost:3000/styles.css
```

**Očekivano:** `200 OK` + `Content-Type: text/css`

---

## 📱 Testiranje na Mobilnom

### Pristup sa Mobilnog Uređaja

1. **Proveri IP adresu računara:**
   ```bash
   hostname -I
   # ili
   ifconfig | grep "inet "
   ```

2. **Pokreni server:**
   ```bash
   npm start
   ```

3. **Sa mobilnog:**
   - Otvorite browser
   - Unesite: `http://<IP_ADRESA>:3000`
   - Primer: `http://192.168.1.100:3000`

### PWA Instalacija na Mobilnom

**Android (Chrome):**
1. Otvorite sajt u Chrome
2. Tapnite meni (3 tačke)
3. Izaberite "Add to Home screen"
4. Potvrdite

**iOS (Safari):**
1. Otvorite sajt u Safari
2. Tapnite Share dugme
3. Izaberite "Add to Home Screen"
4. Potvrdite

---

## 🚀 Deployment

### Lokalno Testiranje Production Build-a

```bash
# Build za produkciju
NODE_ENV=production npm start

# Test
curl http://localhost:3000/
```

### Deploy na Vercel

```bash
# Instalacija Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Ili koristi `deploy.sh`:**
```bash
./deploy.sh
```

### Više Deployment Opcija

Vidi **DEPLOYMENT.md** za detaljne instrukcije za:
- Vercel
- Netlify
- Heroku
- Railway
- Render
- DigitalOcean

---

## 📞 Pomoć i Podrška

### Dokumentacija

- **README.md** - Opšti pregled
- **API_KEY_SETUP.md** - Konfiguracija API ključa
- **DEPLOYMENT.md** - Deployment vodič
- **PWA_INSTALACIJA.md** - PWA instalacija
- **PREDLOZI.md** - Predlozi za unapređenje

### Kontakt

- **Email:** spajicn@yahoo.com, spajicn@gmail.com
- **GitHub:** https://github.com/spaja86/openai-platform

---

## ✅ Checklist Pokretanja

- [ ] Node.js instaliran (v14+)
- [ ] `npm install` izvršeno
- [ ] `.env` fajl kreiran
- [ ] OpenAI API ključ dodat (za produkciju)
- [ ] `npm start` izvršeno
- [ ] Server radi na http://localhost:3000
- [ ] Homepage se učitava
- [ ] PWA manifest dostupan
- [ ] Service Worker registrovan

---

**Platforma je spremna! Srećno korišćenje! 🎉**
