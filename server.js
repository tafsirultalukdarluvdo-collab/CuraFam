require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://tafsirultalukdarluvdo_db_user:zQ9SiqkGQK7gCebT@cluster0.ggkbd2f.mongodb.net/curafam?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  patientName: { type: String, required: true },
  description: { type: String, required: true },
  age: String,
  answer: String,
  answeredBy: String,
  createdAt: { type: Date, default: Date.now },
  answeredAt: Date
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialty: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

// Routes
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/doctors', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/questions/:id/answer', async (req, res) => {
  try {
    const { answer, answeredBy } = req.body;
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { answer, answeredBy, answeredAt: new Date() },
      { new: true }
    );
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const totalQuestions = await Question.countDocuments();
    const answeredQuestions = await Question.countDocuments({ answer: { $exists: true, $ne: '' } });
    const totalDoctors = await Doctor.countDocuments();
    const successRate = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
    
    res.json({
      totalQuestions,
      answeredQuestions,
      totalDoctors,
      successRate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});