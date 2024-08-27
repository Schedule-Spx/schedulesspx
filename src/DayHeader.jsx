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
    <div className="p-4 bg-stpius-blue border border-stpius-gold rounded-lg flex flex-col items-center justify-center">
      <div className="text-2xl font-bold text-stpius-white">{dayName}</div>
      <div className="text-xl text-stpius-white">{dateString}</div>
      <div className="text-lg text-stpius-gold">{timeString}</div>
    </div>
  );
};

export default DayHeader;
