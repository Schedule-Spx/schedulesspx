// src/DayHeader.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';

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
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border}`}>
      <div className="p-5 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold ${currentTheme.text} mb-2">{day}</div>
        <div className="text-xl ${currentTheme.text} mb-2">{new Date().toLocaleDateString()}</div>
        <div className={`${currentTheme.accent} ${currentTheme.text} text-lg px-4 py-2 rounded`}>
          <ul>
            {schedule.map((period, index) => (
              <li key={index}>
                {period.name}: {period.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DayHeader;
