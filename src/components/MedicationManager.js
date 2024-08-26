// src/components/MedicationManager.js
import React, { useState } from 'react';
import { searchDrugLabel } from '../api/openFdaApi';

const MedicationManager = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState('');
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addMedication = async () => {
    setLoading(true);
    setError('');
    try {
      const drugData = await searchDrugLabel(newMedication);
      setMedications([...medications, { name: newMedication, info: drugData }]);
      setDrugInfo(drugData);
      setNewMedication('');
    } catch (error) {
      setError('Error fetching drug information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Medication Manager</h2>
      <input
        type="text"
        value={newMedication}
        onChange={(e) => setNewMedication(e.target.value)}
        placeholder="Search for a medication"
      />
      <button onClick={addMedication} disabled={loading}>
        {loading ? 'Searching...' : 'Add'}
      </button>
      {error && <p className="error">{error}</p>}
      <ul>
        {medications.map((med, index) => (
          <li key={index}>
            <strong>{med.name}</strong>: {med.info.purpose?.[0] || 'No description available'}
          </li>
        ))}
      </ul>
      {drugInfo && (
        <div className="drug-info">
          <h3>{drugInfo.openfda.brand_name?.[0]}</h3>
          <p>{drugInfo.indications_and_usage?.[0]}</p>
        </div>
      )}
    </div>
  );
};

export default MedicationManager;
