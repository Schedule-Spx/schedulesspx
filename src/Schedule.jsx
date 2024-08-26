// src/Schedule.jsx
import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const savedSchedule = localStorage.getItem('weekSchedule');
    if (savedSchedule) {
      setWeekSchedule(JSON.parse(savedSchedule));
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(days[new Date().getDay()]);
  }, []);

  if (!weekSchedule[currentDay] || weekSchedule[currentDay].length === 0) {
    return <div className="p-4">No schedule available for today.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Today's Schedule ({currentDay})</h2>
      <ul className="space-y-2">
        {weekSchedule[currentDay].map((period, index) => (
          period.visible && (
            <li key={index} className="bg-white dark:bg-gray-700 p-2 rounded shadow">
              <div className="font-semibold">{period.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {period.start} - {period.end}
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
