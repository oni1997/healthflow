import React, { useState } from 'react';
import { getHealthInsights } from '../api/healthInsightsApi';

const SymptomTracker = ({ onAddSymptom, symptoms }) => {
  const [symptom, setSymptom] = useState({ description: '', severity: 1 });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const insights = await getHealthInsights(symptom.description);
      onAddSymptom({ ...symptom, insights });
      setSymptom({ description: '', severity: 1 });
    } catch (error) {
      console.error('Error getting health insights:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="symptom-tracker">
      <h2>Track Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptom.description}
          onChange={(e) => setSymptom({ ...symptom, description: e.target.value })}
          placeholder="Describe your symptom"
          required
        />
        <input
          type="range"
          min="1"
          max="10"
          value={symptom.severity}
          onChange={(e) => setSymptom({ ...symptom, severity: parseInt(e.target.value) })}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Tracking...' : 'Track Symptom'}
        </button>
      </form>
      <ul>
        {symptoms.map((s, index) => (
          <li key={index}>{s.description} (Severity: {s.severity})</li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomTracker;