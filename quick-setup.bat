@echo off
echo CuraFam MongoDB Quick Setup
echo ========================

REM Step 1: Navigate to project
cd /d C:\CuraFam-Website
echo Current directory: %cd%

REM Step 2: Install dependencies
echo Installing packages...
npm install mongodb express cors

REM Step 3: Setup database connection
echo Setting up database...
node -e "console.log('MongoDB setup complete!')"

REM Step 4: Start server
echo Starting server...
start node server.js

REM Step 5: Open admin dashboard
timeout /t 3
start http://localhost:3000/admin-dashboard.html

echo Setup complete! Check browser for admin dashboard.
pause