// src/PeriodRenamer.jsx
import React, { useState, useEffect } from 'react';

const PeriodRenamer = ({ weekSchedule }) => {
  const [renamedPeriods, setRenamedPeriods] = useState({});

  useEffect(() => {
    const savedRenames = JSON.parse(localStorage.getItem('renamedPeriods') || '{}');
    setRenamedPeriods(savedRenames);
  }, []);

  const handleRename = (originalName, newName) => {
    const updatedRenames = { ...renamedPeriods, [originalName]: newName };
    setRenamedPeriods(updatedRenames);
    localStorage.setItem('renamedPeriods', JSON.stringify(updatedRenames));
  };

  const allPeriods = Object.values(weekSchedule).flat().map(period => period.split(' - ')[0]);
  const uniquePeriods = [...new Set(allPeriods)];
  const renamablePeriods = uniquePeriods.filter(period => /^[1-8]$/.test(period));

  return (
    <div>
      {renamablePeriods.map((period) => (
        <div key={period} className="mb-2 flex items-center">
          <span className="mr-2">Period {period}:</span>
          <input
            type="text"
            value={renamedPeriods[period] || ''}
            onChange={(e) => handleRename(period, e.target.value)}
            placeholder="Enter custom name"
            className="border rounded px-2 py-1 flex-grow"
          />
        </div>
      ))}
    </div>
  );
};

export default PeriodRenamer;
