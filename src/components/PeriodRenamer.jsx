import React, { useState, useEffect } from 'react';
import PeriodCustomization from './PeriodCustomization';
import { useTheme } from '../context/ThemeContext';

const PeriodRenamer = () => {
  const { currentTheme } = useTheme();
  const [customNames, setCustomNames] = useState({
    period1: 'Period 1',
    period2: 'Period 2',
    period3: 'Period 3',
    period4: 'Period 4',
    period5: 'Period 5',
    period6: 'Period 6',
    period7: 'Period 7',
    period8: 'Period 8'
  });

  // Load saved names when component mounts
  useEffect(() => {
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomNames(JSON.parse(savedNames));
    }
  }, []);

  // Handler for saving period names
  const handleSaveNames = (updatedNames) => {
    setCustomNames(updatedNames);
    localStorage.setItem('customPeriodNames', JSON.stringify(updatedNames));
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${currentTheme.border} ${currentTheme.main}`}>
      <PeriodCustomization 
        initialPeriods={customNames} 
        handleSave={handleSaveNames}
      />
    </div>
  );
};

export default PeriodRenamer;
