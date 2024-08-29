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
    <div className={`p-4 ${currentTheme.secondary} ${currentTheme.border} rounded-lg flex flex-col items-center justify-center`}>
      <div className={`text-2xl font-bold ${currentTheme.text}`}>{dayName}</div>
      <div className={`text-xl ${currentTheme.text}`}>{dateString}</div>
      <div className={`text-lg ${currentTheme.primary}`}>{timeString}</div>
    </div>
  );
};

export default DayHeader;
