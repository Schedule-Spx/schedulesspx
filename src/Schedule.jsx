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
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {weekSchedule[currentDay].map((period, index) => (
          period.visible && (
            <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm">
              <div className="font-semibold">{period.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {period.start} - {period.end}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Schedule;
