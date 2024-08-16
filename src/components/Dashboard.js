import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import SymptomTracker from './SymptomTracker';
import MedicationManager from './MedicationManager';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>HealthFlow Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="dashboard-content container">
        <section className="dashboard-section">
          <h2>Symptom Tracker</h2>
          <SymptomTracker />
        </section>
        <section className="dashboard-section">
          <h2>Medication Manager</h2>
          <MedicationManager />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;