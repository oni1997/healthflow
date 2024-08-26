import axios from 'axios';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export const getHealthInsights = async (prompt) => {
  try {
    const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
      contents: [{
        parts: [{
          text: `${prompt}\n\nPlease structure your response as follows:
1. Briefly summarize the user's symptoms.
2. Include a disclaimer about not being a medical professional.
3. Provide 3-5 key recommendations using bullet points and **bold** text for emphasis.
4. List 3-5 possible causes of the symptoms using bullet points.
5. Recommend 1-2 over-the-counter medications, if applicable, using bullet points.
6. End with a reminder to consult a medical professional.

Use Markdown formatting for headers, **bold** text, and bullet points to improve readability.`
        }]
      }]
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
      const content = response.data.candidates[0].content.parts[0].text;
      const otcMedications = content.match(/(?:•\s*)([^\n]+)/g)?.map(item => item.replace(/•\s*/, '').trim()) || [];
      return { insights: content, otcMedications };
    } else {
      throw new Error('Unexpected response structure from Gemini API');
    }
  } catch (error) {
    console.error('Error fetching health insights:', error.response ? error.response.data : error.message);
    throw error;
  }
};
