// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        console.log('Raw schedule data:', data); // Log raw data
        const parsedData = JSON.parse(data);
        console.log('Parsed schedule data:', parsedData); // Log parsed data
        if (typeof parsedData === 'object' && parsedData !== null) {
          setWeekSchedule(parsedData);
        } else {
          throw new Error('Invalid schedule data format');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError(error.message);
      }
    };

    fetchSchedule();
  }, []);

  useEffect(() => {
    const updateCurrentPeriod = () => {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      setCurrentDay(today);

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();

      const schedule = weekSchedule[today];
      if (Array.isArray(schedule)) {
        const currentPeriodIndex = schedule.findIndex((period) => {
          if (period && typeof period === 'string') {
            const [startTime, endTime] = period.split('-');
            if (startTime && endTime) {
              const [startHour, startMinute] = startTime.split(':').map(Number);
              const [endHour, endMinute] = endTime.split(':').map(Number);
              return (
                (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
                (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
              );
            }
          }
          return false;
        });

        if (currentPeriodIndex !== -1) {
          setCurrentPeriod(schedule[currentPeriodIndex]);
          const [startTime, endTime] = schedule[currentPeriodIndex].split('-');
          if (startTime && endTime) {
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);
            const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
            const elapsedMinutes = (currentHour - startHour) * 60 + (currentMinute - startMinute);
            const progressPercentage = (elapsedMinutes / totalMinutes) * 100;
            setProgress(progressPercentage);

            const remainingMinutes = totalMinutes - elapsedMinutes;
            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMinutesFormatted = remainingMinutes % 60;
            setTimeRemaining(`${remainingHours}h ${remainingMinutesFormatted}m`);
          } else {
            console.error('Invalid period format:', schedule[currentPeriodIndex]);
            setCurrentPeriod(null);
            setProgress(0);
            setTimeRemaining('');
          }
        } else {
          setCurrentPeriod(null);
          setProgress(0);
          setTimeRemaining('');
        }
      } else {
        console.error('Invalid schedule for today:', schedule);
      }
    };

    const timer = setInterval(updateCurrentPeriod, 60000); // Update every minute
    updateCurrentPeriod(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule]);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
