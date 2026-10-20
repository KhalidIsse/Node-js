require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 4000;

// Body Parser Middleware (Crucial for receiving POST/PUT data)
app.use(express.json());

// API Routes
app.use('/books', bookRoutes);

// 😊 SIMPLE FIX: Send a friendly message when visiting http://localhost:4000/
app.get('/', (req, res) => {
  res.send('Welcome to my Books API! Use http://localhost:4000/books to see the books.');
});

// Database connection & Server initialization
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('📦 Connected to MongoDB successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
  });
