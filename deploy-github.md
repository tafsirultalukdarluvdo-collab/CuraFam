# GitHub Pages Deployment Guide

## ⚠️ Important: MongoDB won't work on GitHub Pages

GitHub Pages শুধু static files serve করে। Server-side code run করতে পারে না।

## Solutions:

### Option 1: Firebase (Recommended for GitHub Pages)
```bash
# 1. Firebase project create করুন
# 2. github-pages-config.js এ Firebase config add করুন
# 3. GitHub Pages এ deploy করুন
```

### Option 2: Netlify/Vercel (Full MongoDB support)
```bash
# Netlify
netlify deploy --prod

# Vercel  
vercel --prod
```

### Option 3: GitHub Pages + External API
```bash
# 1. MongoDB server আলাদা host করুন (Heroku/Railway)
# 2. GitHub Pages থেকে API call করুন
```

## GitHub Pages Deploy Commands:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## Result:
- ✅ Website: https://username.github.io/repository-name
- ❌ MongoDB: কাজ করবে না
- ✅ LocalStorage: কাজ করবে (device specific)
- ✅ Firebase: কাজ করবে (all devices)

## Recommendation:
**Netlify বা Vercel ব্যবহার করুন MongoDB এর জন্য।**