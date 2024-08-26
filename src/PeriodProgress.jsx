// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

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

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const schedule = weekSchedule[today];
    if (Array.isArray(schedule)) {
      const currentPeriodIndex = schedule.findIndex((period) => {
        if (period) {
          const [startHour, startMinute] = period.split('-')[0].split(':').map(Number);
          const [endHour, endMinute] = period.split('-')[1].split(':').map(Number);
          return (
            (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
            (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
          );
        }
        return false;
      });

      if (currentPeriodIndex !== -1) {
        setCurrentPeriod(schedule[currentPeriodIndex]);
        const [startHour, startMinute] = schedule[currentPeriodIndex].split('-')[0].split(':').map(Number);
        const [endHour, endMinute] = schedule[currentPeriodIndex].split('-')[1].split(':').map(Number);
        const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
        const elapsedMinutes = (currentHour - startHour) * 60 + (currentMinute - startMinute);
        const progressPercentage = (elapsedMinutes / totalMinutes) * 100;
        setProgress(progressPercentage);

        const remainingMinutes = totalMinutes - elapsedMinutes;
        const remainingHours = Math.floor(remainingMinutes / 60);
        const remainingMinutesFormatted = remainingMinutes % 60;
        setTimeRemaining(`${remainingHours}h ${remainingMinutesFormatted}m`);
      } else {
        setCurrentPeriod(null);
        setProgress(0);
        setTimeRemaining('');
      }
    }
  }, [weekSchedule, currentDay]);

  return (
    <div>
      <h2>Period Progress</h2>
      {currentPeriod ? (
        <div>
          <p>Current Period: {currentPeriod}</p>
          <progress value={progress} max="100" />
          <p>Time Remaining: {timeRemaining}</p>
        </div>
      ) : (
        <p>No ongoing period.</p>
      )}
    </div>
  );
};

export default PeriodProgress;
