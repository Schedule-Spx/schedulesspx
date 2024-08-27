// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = ({ weekSchedule }) => {
  const [currentState, setCurrentState] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateCurrentState = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      console.log('Current day:', currentDay);
      console.log('Current time:', currentTime);
      console.log('Week schedule:', weekSchedule);

      const todaySchedule = weekSchedule[currentDay];

      if (Array.isArray(todaySchedule) && todaySchedule.length > 0) {
        handleSchoolDay(todaySchedule, currentTime, now, currentDay);
      } else {
        handleNonSchoolDay(now, currentDay);
      }
    };

    const timer = setInterval(updateCurrentState, 1000);
    updateCurrentState(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule]);

  const handleSchoolDay = (schedule, currentTime, now, currentDay) => {
    const currentPeriodInfo = schedule.find(period => {
      const [, time] = period.split(' - ');
      const [start, end] = time.split('-');
      const startTime = convertTo24Hour(start.trim());
      const endTime = convertTo24Hour(end.trim());
      return currentTime >= startTime && currentTime < endTime;
    });

    if (currentPeriodInfo) {
      const [name, time] = currentPeriodInfo.split(' - ');
      const [, end] = time.split('-');
      const endTime = parseTime(end.trim());

      const remaining = endTime - now;
      const duration = getPercentage(now, endTime);

      setCurrentState({ type: 'activePeriod', name });
      setProgress(duration);
      setTimeRemaining(formatTimeRemaining(remaining));
      updateTitle(name, formatTimeRemaining(remaining));
    } else if (currentTime < convertTo24Hour(schedule[0].split(' - ')[1].split('-')[0].trim())) {
      // Before first period of the day
      const firstPeriodStart = parseTime(schedule[0].split(' - ')[1].split('-')[0].trim());
      const timeUntilStart = firstPeriodStart - now;
      setCurrentState({ type: 'beforeSchool', nextPeriod: schedule[0].split(' - ')[0] });
      setTimeRemaining(formatTimeRemaining(timeUntilStart));
      setProgress(0);
      updateTitle('School starts in', formatTimeRemaining(timeUntilStart));
    } else {
      // After last period, find next school day
      handleAfterSchool(now, currentDay);
    }
  };

  // ... (rest of the functions remain the same)

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-4">Period Progress</h2>
      {currentState ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold">
              {currentState.type === 'activePeriod' ? currentState.name :
               currentState.type === 'betweenPeriods' ? `Next: ${currentState.nextPeriod}` :
               currentState.type === 'beforeSchool' ? 'School starts soon' :
               currentState.type === 'afterSchool' || currentState.type === 'nonSchoolDay' ? `Next school day (${currentState.nextDay})` :
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
