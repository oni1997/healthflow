import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import SymptomTracker from '../components/SymptomTracker';
import HealthInsights from '../components/HealthInsights';
import AIHealthAssistant from '../components/AIHealthAssistant';
import HealthDataVisualization from '../components/HealthDataVisualization';
import MedicationManager from '../components/MedicationManager';

const Dashboard = () => {
  const [healthData, setHealthData] = useState({ symptoms: [], insights: [] });

  useEffect(() => {
    fetchUserHealthData();
  }, []);

  const fetchUserHealthData = async () => {
    const symptomsQuery = query(collection(firestore, 'symptoms'), where('userId', '==', auth.currentUser.uid));
    const insightsQuery = query(collection(firestore, 'insights'), where('userId', '==', auth.currentUser.uid));

    try {
      const [symptomsSnapshot, insightsSnapshot] = await Promise.all([
        getDocs(symptomsQuery),
        getDocs(insightsQuery)
      ]);

      setHealthData({
        symptoms: symptomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        insights: insightsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      });
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  const handleAddSymptom = async (symptom) => {
    try {
      await addDoc(collection(firestore, 'symptoms'), {
        ...symptom,
        userId: auth.currentUser.uid,
        timestamp: new Date()
      });
      fetchUserHealthData();
    } catch (error) {
      console.error('Error adding symptom: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
      <div className="dashboard-content">
        <HealthDataVisualization healthData={healthData} />
        <SymptomTracker onAddSymptom={handleAddSymptom} symptoms={healthData.symptoms} />
        <HealthInsights insights={healthData.insights} />
        <AIHealthAssistant healthData={healthData} />
        <MedicationManager />
      </div>
    </div>
  );
};

export default Dashboard;