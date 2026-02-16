# 🎨 OpenAI Platform - Style Guide

## Boje

### Primarne Boje
- **Primary Green**: `#10a37f` - Glavna boja platforme
- **Primary Dark**: `#0d8c6a` - Hover stanja
- **Secondary**: `#1a7f64` - Akcenti

### Dodatne Boje
- **Accent**: `#ff6b6b` - Greške, upozorenja
- **Background**: `#f7f7f8` - Pozadina stranice
- **Card Background**: `#ffffff` - Kartice i paneli
- **Text**: `#2d3748` - Glavni tekst
- **Text Light**: `#718096` - Sekundarni tekst
- **Border**: `#e2e8f0` - Granice

### Gradijenti
```css
/* Hero gradient */
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Header gradient */
linear-gradient(135deg, #10a37f, #1a7f64)

/* Footer gradient */
linear-gradient(135deg, #2d3748 0%, #1a202c 100%)
```

## Tipografija

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Veličine
- **Hero Title**: 3rem (desktop), 2rem (mobile)
- **Section Title**: 2.5rem
- **Card Title**: 1.5rem
- **Body Text**: 1rem
- **Small Text**: 0.9rem

### Line Heights
- **Headings**: 1.2
- **Body**: 1.6
- **Descriptive**: 1.8

## Spacing

### Margins
- **Section spacing**: 5rem (desktop), 3rem (mobile)
- **Card spacing**: 2rem
- **Element spacing**: 1.5rem, 1rem, 0.5rem

### Padding
- **Sections**: 5rem 0
- **Cards**: 2rem
- **Buttons**: 0.75rem 2rem

## Shadows

```css
--shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

## Border Radius

- **Cards**: 12px-16px
- **Buttons**: 8px
- **Inputs**: 8px
- **Images**: 12px

## Animations

### Duration
- **Fast**: 0.3s - Hover, click effects
- **Medium**: 0.6s - Transitions
- **Slow**: 1s - Page loads

### Easing
```css
ease-out /* Standard */
ease-in-out /* Smooth */
```

### Common Animations
```css
/* Fade In */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Fade In Up */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Float */
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```

## Komponente

### Buttons
```css
/* Primary Button */
.btn-primary {
    background: #10a37f;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    transition: all 0.3s;
}

.btn-primary:hover {
    background: #0d8c6a;
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

/* Secondary Button */
.btn-secondary {
    background: white;
    color: #10a37f;
    border: 2px solid #10a37f;
}

/* Outline Button */
.btn-outline {
    background: transparent;
    color: #10a37f;
    border: 2px solid #10a37f;
}
```

### Cards
```css
.card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: var(--shadow);
    transition: all 0.3s;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-xl);
}
```

### Forms
```css
input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    transition: border-color 0.3s;
}

input:focus {
    outline: none;
    border-color: #10a37f;
}
```

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (max-width: 968px) { }

/* Desktop */
@media (min-width: 1200px) { }
```

## Emoji Icons

- 🤖 - AI/Bot
- 💬 - Chat
- 🎨 - Kreativnost/Slike
- 💼 - Poslovanje
- 📖 - Dokumentacija
- ✨ - Magija/Funkcije
- 🏠 - Početna
- 🚀 - Brzo/Performanse
- 🔒 - Sigurnost
- 🎯 - Preciznost
- ❓ - FAQ
- ❤️ - Ljubav/Kvalitet

## Best Practices

1. **Konzistentnost**: Koristite predefinisane boje i veličine
2. **Accessibility**: Održavajte kontrast najmanje 4.5:1
3. **Performance**: Optimizujte animacije (transform > left/top)
4. **Responsive**: Mobile-first pristup
5. **Semantika**: Koristite odgovarajuće HTML tagove
6. **Čitljivost**: Line-height 1.6+ za body tekst
