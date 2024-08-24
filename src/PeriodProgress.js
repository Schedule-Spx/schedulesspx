// src/PeriodProgress.js
import React, { useState, useEffect } from 'react';

const periods = [
  { name: "Period 1", start: "08:40 AM", end: "09:21 AM" },
  { name: "Period 2", start: "09:26 AM", end: "10:06 AM" },
  { name: "Period 3", start: "10:11 AM", end: "10:51 AM" },
  { name: "Period 4", start: "10:56 AM", end: "11:36 AM" },
  { name: "Period 5", start: "11:41 AM", end: "12:21 PM" },
  { name: "Period 6", start: "12:26 PM", end: "01:06 PM" },
  { name: "Period 7", start: "01:11 PM", end: "01:51 PM" },
  { name: "Period 8", start: "01:56 PM", end: "02:36 PM" },
  { name: "Assembly", start: "02:41 PM", end: "03:01 PM" },
];

const PeriodProgress = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const checkCurrentPeriod = () => {
      const now = currentTime;
      for (let period of periods) {
        const start = new Date();
        const [startHour, startMinute, startPeriod] = period.start.split(/[: ]/);
        start.setHours(startPeriod === 'PM' ? +startHour + 12 : +startHour, +startMinute, 0, 0);

        const end = new Date();
        const [endHour, endMinute, endPeriod] = period.end.split(/[: ]/);
        end.setHours(endPeriod === 'PM' ? +endHour + 12 : +endHour, +endMinute, 0, 0);

        if (now >= start && now <= end) {
          setCurrentPeriod(period);
          const timeRemaining = Math.floor((end - now) / 1000);
          setRemainingTime(formatTime(timeRemaining));
          break;
        } else {
          setCurrentPeriod(null);
          setRemainingTime("");
        }
      }
    };

    checkCurrentPeriod();
    const interval = setInterval(checkCurrentPeriod, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getProgress = () => {
    if (currentPeriod) {
      const now = currentTime;
      const start = new Date();
      const [startHour, startMinute, startPeriod] = currentPeriod.start.split(/[: ]/);
      start.setHours(startPeriod === 'PM' ? +startHour + 12 : +startHour, +startMinute, 0, 0);

      const end = new Date();
      const [endHour, endMinute, endPeriod] = currentPeriod.end.split(/[: ]/);
      end.setHours(endPeriod === 'PM' ? +endHour + 12 : +endHour, +endMinute, 0, 0);

      const totalDuration = end - start;
      const elapsed = now - start;
      return (elapsed / totalDuration) * 100;
    }
    return 0;
  };

  return (
    <div className="period-progress glass-tile">
      {currentPeriod ? (
        <>
          <div className="text-xl font-bold">{currentPeriod.name}</div>
          <div className="text-lg">Time until period ends: {remainingTime}</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </>
      ) : (
        <div className="text-xl font-bold">No active period</div>
      )}
    </div>
  );
};

export default PeriodProgress;
