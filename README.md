public/
    ├── users.json
src/
├── components/
│   ├── Dashboard.js
│   ├── SymptomTracker.js
│   ├── MedicationManager.js
│   ├── HealthInsights.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
├── App.js
├── index.js
├── api/
│   ├── geminiApi.js
│   ├── auth.js


//src/api/geminiApi.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const getHealthInsights = async (symptoms) => {
  try {
    const response = await axios.post(`${BASE_URL}/health-insights`, { symptoms });
    return response.data.insights;
  } catch (error) {
    console.error('Error fetching health insights:', error);
    throw error;
  }
};

//src/api/auth.js

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

//src/components/Dashboard.js

import React from 'react';
import SymptomTracker from './SymptomTracker';
import MedicationManager from './MedicationManager';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <SymptomTracker />
      <MedicationManager />
    </div>
  );
};

export default Dashboard;


//src/components/MedicationManager.js

import React, { useState } from 'react';

const MedicationManager = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState('');

  const addMedication = () => {
    setMedications([...medications, newMedication]);
    setNewMedication('');
  };

  return (
    <div>
      <h2>Medication Manager</h2>
      <input
        type="text"
        value={newMedication}
        onChange={(e) => setNewMedication(e.target.value)}
        placeholder="Add a medication"
      />
      <button onClick={addMedication}>Add</button>
      <ul>
        {medications.map((med, index) => (
          <li key={index}>{med}</li>
        ))}
      </ul>
    </div>
  );
};
export default MedicationManager;


//src/components/HealthInsights.js

import React from 'react';

const HealthInsights = ({ insights }) => (
  <div>
    <h2>Health Insights</h2>
    <p>{insights}</p>
  </div>
);
export default HealthInsights;


//src/components/SymptomTracker.js

import React, { useState } from 'react';
import { getHealthInsights } from '../api/geminiApi';

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [insights, setInsights] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const result = await getHealthInsights(symptoms);
      setInsights(result);
    } catch (error) {
      console.error('Error getting health insights:', error);
      setError(error.response?.data?.error || error.message || 'An unknown error occurred');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Symptom Tracker</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter your symptoms..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Getting Insights...' : 'Get Insights'}
        </button>
      </form>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}
      {insights && (
        <div>
          <h3>Health Insights</h3>
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomTracker;
//src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to HealthFlow</h1>
      <p>Your personalized health management app.</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

//src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


//src/pages/Register.js

import React from 'react';

const Register = () => (
  <div>
    <h2>Register</h2>
    <p>Registration functionality is under development.</p>
  </div>
);

export default Register;

//App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


//server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyD-dy-2W4rogeK7TRlgrZHBizeMsAaZ0O0';
const BASE_URL = 'https://genai.googleapis.com/v1/models/gemini-pro:generateContent';

app.post('/api/health-insights', async (req, res) => {
  try {
    const { symptoms } = req.body;
    console.log('Received symptoms:', symptoms); // Log received symptoms

    const prompt = `
      As a health advisor, provide insights based on the following symptoms:
      ${symptoms}
      
      Please provide specific, actionable advice to address these symptoms and improve the person's health.
    `;

    console.log('Sending request to Gemini API with prompt:', prompt); // Log the prompt

    const response = await axios.post(BASE_URL, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Received response from Gemini API:', response.data); // Log the full response

    if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
      const insights = response.data.candidates[0].content.parts[0].text;
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