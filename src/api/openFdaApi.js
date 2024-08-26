// src/api/openFdaApi.js
import axios from 'axios';

const BASE_URL = 'https://api.fda.gov/drug/label.json';

export const searchDrugLabel = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?search=${query}&limit=1`);
    if (response.data.results && response.data.results[0]) {
      return response.data.results[0];
    } else {
      throw new Error('No data found for the provided query.');
    }
  } catch (error) {
    console.error('Error fetching drug label data:', error.message);
    throw error;
  }
};
