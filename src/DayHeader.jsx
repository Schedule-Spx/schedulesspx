// src/DayHeader.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

const DayHeader = ({ day, schedule }) => {
  const { currentTheme } = useTheme();

  if (!schedule) {
    console.warn(`No schedule available for ${day}`);
    return (
      <div style={{ color: currentTheme.text }}>
        <h2>{day}</h2>
        <p>No schedule available</p>
      </div>
    );
  }

  return (
    <div style={{ color: currentTheme.text }}>
      <h2>{day}</h2>
      <ul>
        {schedule.map((period, index) => (
          <li key={index}>
            {period.name}: {period.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayHeader;
