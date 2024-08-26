// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);

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
    const updateProgress = () => {
      if (currentPeriod) {
        const startTime = new Date(`1970-01-01T${currentPeriod.start}`);
        const endTime = new Date(`1970-01-01T${currentPeriod.end}`);
        const now = new Date();

        const totalDuration = endTime - startTime;
        const elapsedDuration = now - startTime;
        const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);

        setProgress(progress);
      } else {
        setProgress(0);
      }
    };

    updateProgress();
    const intervalId = setInterval(updateProgress, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPeriod]);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
      <div
        className="bg-blue-500 h-6 rounded-full transition-all duration-1000 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default PeriodProgress;
