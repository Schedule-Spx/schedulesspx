// src/Schedule.js
import React, { useEffect, useState } from 'react';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Today's Schedule</h2>
      <ul className="mt-4">
        {schedule.filter(period => period.visible).map((period, index) => (
          <li key={index} className="mb-2">
            {period.start} - {period.end}: {period.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
