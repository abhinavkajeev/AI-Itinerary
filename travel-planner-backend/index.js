const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/itinerary', require('./routes/itinerary'));

// Basic route
app.get('/', (req, res) => {
  res.send('Travel Planner API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));