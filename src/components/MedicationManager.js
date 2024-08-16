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