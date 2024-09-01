import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

const DayHeader = () => {
  const { currentTheme } = useTheme();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dayName = daysOfWeek[currentDateTime.getDay()];
  const dateString = currentDateTime.toLocaleDateString();
  const timeString = currentDateTime.toLocaleTimeString();

  return (
    <div className={`rounded-lg shadow-md w-full border-2 ${currentTheme.border} ${currentTheme.main} relative`}>
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-5 flex flex-col items-center justify-center relative z-10">
        <div className={`text-2xl font-bold ${currentTheme.text} mb-2`}>{dayName}</div>
        <div className={`text-xl ${currentTheme.text} mb-2`}>{dateString}</div>
        <div className={`${currentTheme.accent} ${currentTheme.text} text-lg px-4 py-2 rounded`}>
          {timeString}
        </div>
      </div>
    </div>
  );
};

export default DayHeader;
