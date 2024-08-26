// components/AIHealthAssistant.js
import React, { useState } from 'react';
import { getHealthInsights } from '../api/healthInsightsApi';
import ReactMarkdown from 'react-markdown';

const AIHealthAssistant = ({ healthData }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const context = `User's recent symptoms: ${healthData.symptoms.slice(-5).map(s => s.description).join(', ')}`;
      const response = await getHealthInsights(`${context}\n\nUser question: ${question}\n\nPlease provide a structured response with the following sections:\n1. Brief summary of the user's symptoms\n2. Important disclaimer about not being a medical professional\n3. Key recommendations (using bullet points)\n4. Possible causes (using bullet points)\n5. Final reminder about consulting a medical professional\n\nUse Markdown formatting for emphasis and structure.`);
      setAnswer(response.insights);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAnswer('Sorry, I encountered an error. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <div className="ai-health-assistant">
      <h2>AI Health Assistant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a health-related question..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div className="ai-response">
          <h3>AI Assistant Response:</h3>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AIHealthAssistant;

