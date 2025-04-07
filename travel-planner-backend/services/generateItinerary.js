const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey:process.env.OPENAI_API_KEY,
});
const generateItinerary = async (params) => {
  const { destination, startDate, endDate, interests, budget, pace } = params;
  
  // Calculate number of days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  try {
    const prompt = `Generate a detailed ${diffDays}-day travel itinerary for ${destination}.
      Start date: ${startDate}
      End date: ${endDate}
      Interests: ${interests.join(', ')}
      Budget: ${budget}
      Pace: ${pace}
      
      The itinerary should include:
      1. Daily activities with times, names, descriptions, and types (dining, sightseeing, cultural, outdoor, indoor, shopping, wellness)
      2. Weather predictions for each day
      3. Appropriate activities based on the interests, budget, and pace provided
      
      Format the response as a JSON object with this structure:
      {
        "id": "string",
        "destination": "string",
        "duration": "string",
        "budget": "string",
        "pace": "string",
        "days": [
          {
            "day": number,
            "date": "YYYY-MM-DD",
            "weather": "string",
            "activities": [
              {
                "time": "HH:MM",
                "name": "string",
                "description": "string",
                "type": "string"
              }
            ]
          }
        ]
      }`;
    
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001', // or your preferred model
      messages: [
        {
          role: 'system',
          content: 'You are an AI travel planner specialized in creating detailed travel itineraries.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });
    
    // Parse the completion to get structured data
    const itineraryData = JSON.parse(completion.choices[0].message.content);
    
    // Add an ID if it's not already in the response
    if (!itineraryData.id) {
      itineraryData.id = Date.now().toString();
    }
    
    return itineraryData;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary');
  }
};

module.exports = { generateItinerary };