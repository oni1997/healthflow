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
