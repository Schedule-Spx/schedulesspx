// src/DayHeader.jsx
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
    <div className="bg-stpius-blue border border-stpius-gold rounded-lg flex flex-col items-center justify-between h-full p-4">
      <div className="text-3xl font-bold text-stpius-white mb-2">{dayName}</div>
      <div className="text-xl text-stpius-white mb-2">{dateString}</div>
      <div className="text-2xl font-semibold text-stpius-gold">{timeString}</div>
    </div>
  );
};

export default DayHeader;
