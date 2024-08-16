import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const getHealthInsights = async (symptoms) => {
  try {
    const response = await axios.post(`${BASE_URL}/health-insights`, { symptoms });
    console.log('API response:', response.data); // Added for debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching health insights:', error);
    throw error;
  }
};
