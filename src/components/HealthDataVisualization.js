import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthDataVisualization = ({ healthData }) => {
  const formatDataForChart = () => {
    const symptomsByDate = {};
    healthData.symptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp.seconds * 1000).toLocaleDateString();
      if (!symptomsByDate[date]) {
        symptomsByDate[date] = { date, count: 0, averageSeverity: 0 };
      }
      symptomsByDate[date].count++;
      symptomsByDate[date].averageSeverity += symptom.severity;
    });

    return Object.values(symptomsByDate).map(day => ({
      ...day,
      averageSeverity: day.averageSeverity / day.count
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="health-data-visualization">
      <h2>Symptom Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatDataForChart()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="count" stroke="#8884d8" name="Symptom Count" />
          <Line yAxisId="right" type="monotone" dataKey="averageSeverity" stroke="#82ca9d" name="Avg Severity" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthDataVisualization;
