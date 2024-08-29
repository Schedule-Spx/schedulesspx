// src/Schedule.jsx
import React, { useState, useEffect } from 'react';
import DayHeader from './DayHeader';
import { useTheme } from '../ThemeContext';

const Schedule = ({ weekSchedule }) => {
  const { currentTheme } = useTheme();
  const [dayName, setDayName] = useState('');
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[new Date().getDay()];
    setDayName(currentDayName);

    if (weekSchedule && weekSchedule[currentDayName]) {
      setTodaySchedule(weekSchedule[currentDayName]);
    }
  }, [weekSchedule]);

  if (!weekSchedule || !weekSchedule[dayName]) {
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} p-6`}>
        <p className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>{dayName}'s Schedule</p>
        <p className={`${currentTheme.text}`}>No schedule available for today.</p>
      </div>
    );
  }

  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} p-6`}>
      <p className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>{dayName}'s Schedule</p>
      {todaySchedule.length === 0 ? (
        <div className="text-center">
          <div className="text-lg" style={{ color: currentTheme.text }}>Loading schedule...</div>
        </div>
      ) : (
        todaySchedule.map((period, index) => {
          const { name, start, end } = period;
          const now = new Date();
          const startTime = new Date(`1970-01-01T${start}:00Z`);
          const endTime = new Date(`1970-01-01T${end}:00Z`);
          const isActive = now >= startTime && now <= endTime;

          return (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg mb-2" style={{ backgroundColor: isActive ? currentTheme.highlight : currentTheme.main }}>
              <div className={`${isActive ? 'animate-pulse font-bold' : ''}`} style={{ color: currentTheme.text }}>
                {name}: {start} - {end}
              </div>
              <div style={{ color: currentTheme.text }}>
                {isActive && (
                  <span className="text-sm">{`Ends in: ${Math.round((endTime - now) / 60000)} min`}</span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Schedule;
