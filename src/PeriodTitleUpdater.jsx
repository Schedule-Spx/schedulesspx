// src/PeriodTitleUpdater.jsx
import { useEffect, useState } from 'react';

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

const PeriodTitleUpdater = () => {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const checkCurrentPeriod = () => {
      const now = new Date();
      const day = now.getDay();
      const isWeekend = day === 0 || day === 6;

      if (isWeekend) {
        // Calculate time until Monday 8 AM
        const monday = new Date(now);
        monday.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
        monday.setHours(8, 0, 0, 0);
        const timeUntilMonday = Math.floor((monday - now) / 1000);
        setCurrentPeriod({ name: "Weekend" });
        setRemainingTime(formatTime(timeUntilMonday));
      } else {
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
      }
    };

    checkCurrentPeriod();
    const interval = setInterval(checkCurrentPeriod, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentPeriod) {
      document.title = `${currentPeriod.name} - ${remainingTime}`;
    } else {
      document.title = "Schedule-SPX";
    }
  }, [currentPeriod, remainingTime]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return null;
};

export default PeriodTitleUpdater;
