// src/Schedule.jsx
import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);

  useEffect(() => {
    const savedSchedule = localStorage.getItem('weekSchedule');
    if (savedSchedule) {
      setWeekSchedule(JSON.parse(savedSchedule));
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(days[new Date().getDay()]);

    const updateCurrentPeriod = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (weekSchedule[currentDay]) {
        const period = weekSchedule[currentDay].find((p) => {
          return currentTime >= p.start && currentTime < p.end;
        });

        setCurrentPeriod(period || null);
      }
    };

    updateCurrentPeriod();
    const intervalId = setInterval(updateCurrentPeriod, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [weekSchedule, currentDay]);

  useEffect(() => {
    if (currentPeriod) {
      document.title = `${currentPeriod.name} | Schedule-SPX`;
    } else {
      document.title = 'Schedule-SPX';
    }
  }, [currentPeriod]);

  if (!weekSchedule[currentDay] || weekSchedule[currentDay].length === 0) {
    return <div className="p-4">No schedule available for today.</div>;
  }

  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-bold mb-2">Today's Schedule ({currentDay})</h2>
      <ul className="space-y-2 h-full">
        {weekSchedule[currentDay].map((period, index) => (
          period.visible && (
            <li
              key={index}
              className={`p-2 rounded shadow ${
                currentPeriod === period ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700'
              }`}
            >
              <div className="font-semibold">Period {index + 1}: {period.name}</div>
              <div className="text-sm">
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
