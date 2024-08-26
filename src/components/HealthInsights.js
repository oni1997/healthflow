import React from 'react';

const HealthInsights = ({ insights }) => (
  <div className="health-insights">
    <h2>Health Insights</h2>
    {insights.map((insight, index) => (
      <div key={index} className="insight-item">
        <h3>{insight.title}</h3>
        <p>{insight.content}</p>
      </div>
    ))}
  </div>
);

export default HealthInsights;
