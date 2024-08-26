// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const savedSchedule = localStorage.getItem('weekSchedule');
    if (savedSchedule) {
      setWeekSchedule(JSON.parse(savedSchedule));
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(days[new Date().getDay()]);
  }, []);

  useEffect(() => {
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
        const remainingDuration = endTime - now;
        const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);

        setProgress(progress);

        const minutes = Math.floor(remainingDuration / 60000);
        const seconds = Math.floor((remainingDuration % 60000) / 1000);
        setTimeRemaining(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

        document.title = `${currentPeriod.name} | ${timeRemaining} remaining | Schedule-SPX`;
      } else {
        setProgress(0);
        setTimeRemaining('');
        document.title = 'Schedule-SPX';
      }
    };

    updateProgress();
    const intervalId = setInterval(updateProgress, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPeriod]);

  const getProgressColor = () => {
    if (progress < 50) {
      return 'bg-green-500';
    } else if (progress < 75) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
      <div
        className={`h-6 rounded-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
        style={{ width: `${progress}%` }}
      >
        <span className="text-xs text-white ml-2">{currentPeriod ? `${currentPeriod.name} | ${timeRemaining}` : 'No active period'}</span>
      </div>
    </div>
  );
};

export default PeriodProgress;
