@echo off
echo Public Deployment Setup
echo ====================

REM Step 1: Install production dependencies
npm install --production

REM Step 2: Set environment variables for production
set NODE_ENV=production
set PORT=80

REM Step 3: Start server for public access
echo Starting server for public access...
node server.js

echo Server running on port 80 for public access
pause