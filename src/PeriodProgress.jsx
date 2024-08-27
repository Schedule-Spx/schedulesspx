// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = ({ weekSchedule }) => {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [renamedPeriods, setRenamedPeriods] = useState({});

  useEffect(() => {
    const savedRenames = JSON.parse(localStorage.getItem('renamedPeriods') || '{}');
    setRenamedPeriods(savedRenames);
  }, []);

  useEffect(() => {
    const updateCurrentPeriod = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const today = now.toLocaleDateString('en-US', { weekday: 'long' });

      const todaySchedule = weekSchedule[today];
      if (Array.isArray(todaySchedule) && todaySchedule.length > 0) {
        const currentPeriodInfo = todaySchedule.find(period => {
          const [name, time] = period.split(' - ');
          const [start, end] = time.split('-');
          return currentTime >= start.trim() && currentTime < end.trim();
        });

        if (currentPeriodInfo) {
          const [name, time] = currentPeriodInfo.split(' - ');
          const [start, end] = time.split('-');
          
          const startTime = new Date();
          const [startHour, startMinute] = start.trim().split(':');
          startTime.setHours(startHour, startMinute, 0);

          const endTime = new Date();
          const [endHour, endMinute] = end.trim().split(':');
          endTime.setHours(endHour, endMinute, 0);

          const totalDuration = endTime - startTime;
          const elapsed = now - startTime;
          const remaining = endTime - now;

          setCurrentPeriod(name);
          setProgress((elapsed / totalDuration) * 100);
          setTimeRemaining(formatTimeRemaining(remaining));

          // Update document title
          document.title = `${getPeriodName(name)} - ${formatTimeRemaining(remaining)} left`;
        } else {
          setCurrentPeriod(null);
          setProgress(0);
          setTimeRemaining('');
          document.title = 'Schedule-SPX'; // Set to website title when no active period
        }
      } else {
        setCurrentPeriod(null);
        setProgress(0);
        setTimeRemaining('');
        document.title = 'Schedule-SPX'; // Set to website title when no schedule for the day
      }
    };

    const timer = setInterval(updateCurrentPeriod, 1000); // Update every second for a more dynamic countdown
    updateCurrentPeriod(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule]);

  const formatTimeRemaining = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getPeriodName = (originalName) => {
    if (/^[1-8]$/.test(originalName)) {
      return renamedPeriods[originalName] || `Period ${originalName}`;
    }
    return originalName;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-4">Period Progress</h2>
      {currentPeriod ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold">{getPeriodName(currentPeriod)}</p>
            <p className="text-sm">{timeRemaining} remaining</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-in-out" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
      ) : (
        <p>No ongoing period</p>
      )}
    </div>
  );
};

export default PeriodProgress;
