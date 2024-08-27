// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = ({ weekSchedule, googleCalendarEvents }) => {
  const [currentState, setCurrentState] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [renamedPeriods, setRenamedPeriods] = useState({});

  useEffect(() => {
    const savedRenames = JSON.parse(localStorage.getItem('renamedPeriods') || '{}');
    setRenamedPeriods(savedRenames);
  }, []);

  useEffect(() => {
    const updateCurrentState = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const todaySchedule = weekSchedule[currentDay];

      if (isWeekend(now)) {
        handleWeekend(now);
      } else if (Array.isArray(todaySchedule) && todaySchedule.length > 0) {
        handleSchoolDay(todaySchedule, currentTime, now);
      } else {
        handleNonSchoolDay(now);
      }
    };

    const timer = setInterval(updateCurrentState, 1000);
    updateCurrentState(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule, googleCalendarEvents]);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleWeekend = (now) => {
    const nextSchoolDay = findNextSchoolDay(now);
    if (nextSchoolDay) {
      const timeUntilNextSchoolDay = nextSchoolDay - now;
      setCurrentState({ type: 'weekend', nextSchoolDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchoolDay));
      setProgress(0);
      updateTitle('Weekend', formatTimeRemaining(timeUntilNextSchoolDay));
    } else {
      setCurrentState({ type: 'noSchool' });
      setTimeRemaining('');
      setProgress(0);
      updateTitle('No School', '');
    }
  };

  const handleSchoolDay = (schedule, currentTime, now) => {
    const currentPeriodInfo = schedule.find(period => {
      const [, time] = period.split(' - ');
      const [start, end] = time.split('-');
      return currentTime >= start.trim() && currentTime < end.trim();
    });

    if (currentPeriodInfo) {
      const [name, time] = currentPeriodInfo.split(' - ');
      const [, end] = time.split('-');
      const endTime = new Date(now);
      const [endHour, endMinute] = end.trim().split(':');
      endTime.setHours(endHour, endMinute, 0);

      const remaining = endTime - now;
      const duration = getPercentage(now, endTime);

      setCurrentState({ type: 'activePeriod', name });
      setProgress(duration);
      setTimeRemaining(formatTimeRemaining(remaining));
      updateTitle(getPeriodName(name), formatTimeRemaining(remaining));
    } else if (currentTime < schedule[0].split(' - ')[1].split('-')[0].trim()) {
      // Before first period
      const firstPeriodStart = new Date(now);
      const [startHour, startMinute] = schedule[0].split(' - ')[1].split('-')[0].trim().split(':');
      firstPeriodStart.setHours(startHour, startMinute, 0);

      const timeUntilStart = firstPeriodStart - now;
      setCurrentState({ type: 'beforeSchool', nextPeriod: schedule[0].split(' - ')[0] });
      setTimeRemaining(formatTimeRemaining(timeUntilStart));
      setProgress(0);
      updateTitle('School starts in', formatTimeRemaining(timeUntilStart));
    } else if (currentTime >= schedule[schedule.length - 1].split(' - ')[1].split('-')[1].trim()) {
      // After last period
      handleAfterSchool(now);
    } else {
      // Between periods
      const nextPeriod = schedule.find(period => {
        const [, time] = period.split(' - ');
        const [start] = time.split('-');
        return currentTime < start.trim();
      });

      if (nextPeriod) {
        const [nextPeriodName, nextPeriodTime] = nextPeriod.split(' - ');
        const [nextPeriodStart] = nextPeriodTime.split('-');
        const nextStartTime = new Date(now);
        const [nextStartHour, nextStartMinute] = nextPeriodStart.trim().split(':');
        nextStartTime.setHours(nextStartHour, nextStartMinute, 0);

        const timeUntilNext = nextStartTime - now;
        setCurrentState({ type: 'betweenPeriods', nextPeriod: nextPeriodName });
        setTimeRemaining(formatTimeRemaining(timeUntilNext));
        setProgress(0);
        updateTitle(`Next: ${getPeriodName(nextPeriodName)}`, formatTimeRemaining(timeUntilNext));
      }
    }
  };

  const handleAfterSchool = (now) => {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextSchoolDay = findNextSchoolDay(tomorrow);
    if (nextSchoolDay) {
      const timeUntilNextSchoolDay = nextSchoolDay - now;
      setCurrentState({ type: 'afterSchool', nextSchoolDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchoolDay));
      setProgress(0);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchoolDay));
    } else {
      setCurrentState({ type: 'noSchool' });
      setTimeRemaining('');
      setProgress(0);
      updateTitle('No School', '');
    }
  };

  const handleNonSchoolDay = (now) => {
    const nextSchoolDay = findNextSchoolDay(now);
    if (nextSchoolDay) {
      const timeUntilNextSchoolDay = nextSchoolDay - now;
      setCurrentState({ type: 'nonSchoolDay', nextSchoolDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchoolDay));
      setProgress(0);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchoolDay));
    } else {
      setCurrentState({ type: 'noSchool' });
      setTimeRemaining('');
      setProgress(0);
      updateTitle('No School', '');
    }
  };

  const findNextSchoolDay = (startDate) => {
    // This function should use googleCalendarEvents to find the next school day
    // For now, we'll use a placeholder implementation
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(8, 0, 0, 0); // Assume school starts at 8 AM
    return nextDay;
  };

  const formatTimeRemaining = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
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

  const updateTitle = (status, time) => {
    document.title = time ? `${status} - ${time}` : 'Schedule-SPX';
  };

  const getPercentage = (start, end) => {
    const total = end - start;
    const elapsed = new Date() - start;
    return (elapsed / total) * 100;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-4">Period Progress</h2>
      {currentState ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold">
              {currentState.type === 'activePeriod' ? getPeriodName(currentState.name) :
               currentState.type === 'betweenPeriods' ? `Next: ${getPeriodName(currentState.nextPeriod)}` :
               currentState.type === 'weekend' ? 'Weekend' :
               currentState.type === 'beforeSchool' ? 'School starts soon' :
               currentState.type === 'afterSchool' || currentState.type === 'nonSchoolDay' ? 'Next school day' :
               'No School'}
            </p>
            <p className="text-sm">{timeRemaining}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-in-out" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PeriodProgress;
