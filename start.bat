@echo off
echo Starting CuraFam Server...
echo.
echo Make sure to:
echo 1. Replace DB_PASSWORD in .env file with your actual MongoDB password
echo 2. Your MongoDB connection string is ready
echo.
node server.js
pause