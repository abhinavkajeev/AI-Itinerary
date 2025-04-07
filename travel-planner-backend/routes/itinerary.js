const express = require('express');
const router = express.Router();
const { generateItinerary } = require('../services/generateItinerary');

// Create a new itinerary
router.post('/', async (req, res) => {
  try {
    const { destination, startDate, endDate, interests, budget, pace } = req.body;

    // Validate request body
    if (!destination || !startDate || !endDate || !interests || !budget || !pace) {
      return res.status(400).json({ error: 'All fields are required: destination, startDate, endDate, interests, budget, pace' });
    }

    // Generate AI itinerary using OpenAI
    const generatedItinerary = await generateItinerary({
      destination,
      startDate,
      endDate,
      interests,
      budget,
      pace
    });

    res.json(generatedItinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;