const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyD-dy-2W4rogeK7TRlgrZHBizeMsAaZ0O0';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

app.post('/api/health-insights', async (req, res) => {
  try {
    const { symptoms } = req.body;
    console.log('Received symptoms:', symptoms);

    const prompt = `
      As a health information provider, offer general insights and information about the following symptoms:
      ${symptoms}
      
      Please provide:
      1. Possible common causes of these symptoms
      2. General self-care tips that might help alleviate these symptoms

      
      Remember to emphasize the importance of consulting a healthcare professional for proper diagnosis and treatment.
    `;

    console.log('Sending request to Gemini API with prompt:', prompt);

    const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Received response from Gemini API:', JSON.stringify(response.data, null, 2));

    if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
      const insights = response.data.candidates[0].content.parts[0].text;
      console.log('Insights:', insights);
      res.json({ insights });
    } else {
      throw new Error('Unexpected response structure from Gemini API');
    }
  } catch (error) {
    console.error('Error in /api/health-insights:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while fetching health insights', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});