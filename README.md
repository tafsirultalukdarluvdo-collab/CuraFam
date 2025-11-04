# CuraFam Healthcare Platform

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Database Password**
   - Edit `.env` file
   - Replace `REPLACE_WITH_YOUR_ACTUAL_MONGODB_PASSWORD` with your actual MongoDB password
   - Get your password from MongoDB Atlas dashboard

3. **Test Database Connection**
   ```bash
   node test-connection.js
   ```

4. **Run the Application**
   ```bash
   npm start
   ```
   Or double-click `start.bat` on Windows

5. **Access the Website**
   - Open browser and go to `http://localhost:3000`

## ⚠️ IMPORTANT
- You MUST set the correct MongoDB password in `.env` file
- The current password in `.env` is a placeholder - replace it with your real password
- Without the correct password, the database connection will fail

## Features
- Ask health questions for humans and animals
- Doctor registration system
- Real-time notifications
- Admin panel for managing data
- MongoDB database integration
- Responsive design with Bengali language support

## API Endpoints
- `GET /api/questions` - Get all questions
- `POST /api/questions` - Add new question
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Register new doctor
- `PUT /api/questions/:id/answer` - Answer a question
- `GET /api/stats` - Get platform statistics