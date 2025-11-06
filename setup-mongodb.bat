@echo off
echo MongoDB Setup Starting...

REM Navigate to project directory
cd /d C:\CuraFam-Website

REM Install MongoDB driver
echo Installing MongoDB driver...
npm install mongodb

REM Install additional dependencies
echo Installing other dependencies...
npm install express cors dotenv

REM Create .env file for MongoDB connection
echo Creating environment file...
echo MONGODB_URI=mongodb://localhost:27017 > .env
echo DB_NAME=curafam_db >> .env
echo PORT=3000 >> .env

REM Start MongoDB service (if installed locally)
echo Starting MongoDB service...
net start MongoDB

REM Run the application
echo Starting application...
node server.js

pause