# CuraFam Production Deployment Guide

## Option 1: Deploy Backend to Render (Recommended)

### Step 1: Prepare for Render
1. Create account at https://render.com
2. Connect your GitHub repository
3. Create new Web Service

### Step 2: Environment Variables
Set these in Render dashboard:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://tafsirultalukdarluvdo_db_user:zQ9SiqkGQK7gCebT@cluster0.ggkbd2f.mongodb.net/curafam
```

### Step 3: Update Frontend
In `script.js`, update API_BASE:
```javascript
const API_BASE = 'https://your-app-name.onrender.com';
```

## Option 2: Deploy to Heroku

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
```

### Step 2: Deploy
```bash
heroku create your-app-name
heroku config:set MONGODB_URI="mongodb+srv://tafsirultalukdarluvdo_db_user:zQ9SiqkGQK7gCebT@cluster0.ggkbd2f.mongodb.net/curafam"
git push heroku main
```

### Step 3: Update Frontend
```javascript
const API_BASE = 'https://your-app-name.herokuapp.com';
```

## Option 3: GitHub Pages + External API

### Step 1: Deploy Backend Separately
Use Render/Heroku for backend only

### Step 2: Deploy Frontend to GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Update API_BASE to your backend URL

## Files to Update for Production:

### 1. script.js
```javascript
const API_BASE = 'https://your-production-api-url.com';
```

### 2. index.html (if needed)
```javascript
const API_BASE = 'https://your-production-api-url.com';
```

### 3. ask-question.html
```javascript
const API_BASE = 'https://your-production-api-url.com';
```

### 4. browse-qa.html
```javascript
const API_BASE = 'https://your-production-api-url.com';
```

## Testing Production:
1. Deploy backend first
2. Test API endpoints: `/api/stats`, `/api/questions`, `/api/doctors`
3. Update frontend API_BASE
4. Deploy frontend
5. Test complete functionality

## MongoDB Atlas (Already Configured):
- Database: curafam
- Collections: questions, doctors
- Connection string already in server.js

## CORS Configuration:
Backend already configured for cross-origin requests.

## Important Notes:
- MongoDB Atlas is already set up and working
- All API endpoints are ready for production
- Just need to deploy and update API URLs
- Statistics will work across all devices once deployed