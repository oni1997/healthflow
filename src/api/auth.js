import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.get('/users.json');
    const users = response.data;
    const user = users.find((u) => u.username === username && u.password === password);
    return user ? { success: true, user } : { success: false, message: 'Invalid credentials' };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};
