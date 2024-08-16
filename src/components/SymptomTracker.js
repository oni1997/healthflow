import React, { useState } from 'react';
import { getHealthInsights } from '../api/geminiApi';
import HealthInsights from './HealthInsights';

const SymptomTracker = () => {
  const [symptomData, setSymptomData] = useState({
    mainSymptom: '',
    duration: '',
    severity: '',
    otherSymptoms: '',
    triggers: '',
  });
  const [insights, setInsights] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSymptomData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const symptomDescription = `
        Main Symptom: ${symptomData.mainSymptom}
        Duration: ${symptomData.duration}
        Severity: ${symptomData.severity}
        Other Symptoms: ${symptomData.otherSymptoms}
        Potential Triggers: ${symptomData.triggers}
      `;
      const result = await getHealthInsights(symptomDescription);
      console.log('Received insights:', result); // Added for debugging
      setInsights(result.insights);
    } catch (error) {
      console.error('Error getting health insights:', error);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Symptom Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mainSymptom">Main Symptom:</label>
          <input
            type="text"
            id="mainSymptom"
            name="mainSymptom"
            value={symptomData.mainSymptom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={symptomData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 2 days, 1 week"
            required
          />
        </div>
        <div>
          <label htmlFor="severity">Severity (1-10):</label>
          <input
            type="number"
            id="severity"
            name="severity"
            min="1"
            max="10"
            value={symptomData.severity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="triggers">Potential Triggers:</label>
          <input
            type="text"
            id="triggers"
            name="triggers"
            value={symptomData.triggers}
            onChange={handleInputChange}
            placeholder="e.g., stress, lack of sleep"
          />
        </div>
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
        <HealthInsights insights={insights} />
      )}
    </div>
  );
};

export default SymptomTracker;
