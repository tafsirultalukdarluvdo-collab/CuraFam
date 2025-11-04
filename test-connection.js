require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://tafsirultalukdarluvdo_db_user:<db_password>@cluster0.ggkbd2f.mongodb.net/curafam?retryWrites=true&w=majority&appName=Cluster0';

console.log('Testing MongoDB connection...');
console.log('Using password:', process.env.DB_PASSWORD ? 'SET' : 'NOT SET');

mongoose.connect(MONGODB_URI.replace('<db_password>', process.env.DB_PASSWORD || 'luvdo1468'))
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });