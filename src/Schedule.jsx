// src/Schedule.jsx
import React, { useState, useEffect } from 'react';
import DayHeader from './DayHeader';
import { useTheme } from './ThemeContext';

const Schedule = ({ weekSchedule }) => {
  const { currentTheme } = useTheme();
  const [currentDay, setCurrentDay] = useState('');
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDateTime = new Date();
    const dayName = daysOfWeek[currentDateTime.getDay()];
    setCurrentDay(dayName);

    if (weekSchedule && weekSchedule[dayName]) {
      setTodaySchedule(weekSchedule[dayName]);
    }
  }, [weekSchedule]);

  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} p-6`}>
      <h2 className={`text-xl font-bold mb-4 ${currentTheme.text}`}>{currentDay}'s Schedule</h2>
      {todaySchedule.length > 0 ? (
        todaySchedule.map((period, index) => (
          <div key={index} className={`p-2 rounded ${currentTheme.accent} mb-2`}>
            <span className={currentTheme.text}>{period}</span>
          </div>
        ))
      ) : (
        <p className={currentTheme.text}>No schedule available for today.</p>
      )}
    </div>
  );
};

export default Schedule;
