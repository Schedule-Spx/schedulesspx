// src/DayHeader.js
import React, { useEffect, useState } from 'react';

const DayHeader = () => {
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
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">{dayName}</div>
      <div className="text-xl">{dateString}</div>
      <div className="text-lg">{timeString}</div>
    </div>
  );
};

export default DayHeader;
