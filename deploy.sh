#!/bin/bash

# Quick deployment script for OpenAI Platform
# This script helps deploy to Vercel quickly

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 OpenAI Platform - Quick Deploy Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI nije instaliran"
    echo "📦 Instaliram Vercel CLI..."
    npm install -g vercel
fi

# Run autofinish validation
echo ""
echo "🔍 Pokretanje validacije..."
npm run autofinish

if [ $? -ne 0 ]; then
    echo "❌ Validacija nije uspela. Proveri greške pre deploy-a."
    exit 1
fi

echo ""
echo "✅ Validacija uspešna!"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env fajl ne postoji"
    echo "💡 Kreiraj .env fajl sa:"
    echo "   OPENAI_API_KEY=sk-..."
    echo ""
    echo "❓ Želiš li da nastaviš bez .env? (Environment variables se mogu dodati u Vercel dashboard)"
    read -p "   Nastavi? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        exit 1
    fi
fi

echo ""
echo "🚀 Pokretanje Vercel deploya..."
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Deploy uspešan!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📋 Sledeći koraci:"
    echo "   1. Dodaj OPENAI_API_KEY u Vercel dashboard"
    echo "   2. Test aplikaciju na production URL-u"
    echo "   3. Share na social media! 🎉"
    echo ""
else
    echo ""
    echo "❌ Deploy nije uspeo. Proveri log iznad za detalje."
    exit 1
fi
