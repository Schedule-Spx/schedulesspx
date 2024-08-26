// src/Schedule.jsx
import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
        const data = await response.text();
        const parsedData = JSON.parse(data);
        if (typeof parsedData === 'object' && parsedData !== null) {
          setWeekSchedule(parsedData);
        } else {
          console.error('Invalid schedule data format');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDay(today);
  }, []);

  return (
    <div>
      <h2>Week Schedule</h2>
      {Object.entries(weekSchedule).map(([day, periods]) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {Array.isArray(periods) ? (
              periods.map((period, index) => <li key={index}>{period}</li>)
            ) : (
              <li>No periods available</li>
            )}
          </ul>
        </div>
      ))}
      <p>Current Day: {currentDay}</p>
    </div>
  );
};

export default Schedule;
