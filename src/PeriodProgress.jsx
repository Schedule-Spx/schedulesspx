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
        handleSchoolDay(todaySchedule, now, currentDay);
      } else {
        handleNonSchoolDay(now, currentDay);
      }
    };

    const timer = setInterval(updateCurrentState, 1000);
    updateCurrentState(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule]);

  const handleSchoolDay = (schedule, now, currentDay) => {
    const currentPeriodInfo = schedule.find(period => {
      const [, time] = period.split(' - ');
      const [start, end] = time.split('-');
      const startTime = parseTime(start.trim());
      const endTime = parseTime(end.trim());
      return now >= startTime && now < endTime;
    });

    if (currentPeriodInfo) {
      // Inside a period
      const [name, time] = currentPeriodInfo.split(' - ');
      const [, end] = time.split('-');
      const endTime = parseTime(end.trim());

      const remaining = endTime - now;
      const totalDuration = endTime - parseTime(time.split('-')[0].trim());
      const progressPercentage = ((totalDuration - remaining) / totalDuration) * 100;

      setCurrentState({ type: 'activePeriod', name });
      setProgress(progressPercentage);
      setTimeRemaining(formatTimeRemaining(remaining));
      updateTitle(name, formatTimeRemaining(remaining));
    } else {
      // Between periods or before/after school
      const nextPeriod = schedule.find(period => {
        const [, time] = period.split(' - ');
        const startTime = parseTime(time.split('-')[0].trim());
        return now < startTime;
      });

      if (nextPeriod) {
        // Next period exists (between periods)
        const [nextPeriodName, nextPeriodTime] = nextPeriod.split(' - ');
        const nextPeriodStart = parseTime(nextPeriodTime.split('-')[0].trim());
        const timeUntilNext = nextPeriodStart - now;

        setCurrentState({ type: 'betweenPeriods', nextPeriod: nextPeriodName });
        setTimeRemaining(formatTimeRemaining(timeUntilNext));
        setProgress(0);
        updateTitle(`Next: ${nextPeriodName}`, formatTimeRemaining(timeUntilNext));
      } else if (now < parseTime(schedule[0].split(' - ')[1].split('-')[0].trim())) {
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
    }
  };

  const handleNonSchoolDay = (now, currentDay) => {
    const nextDay = getNextSchoolDay(currentDay);
    if (nextDay) {
      const nextDaySchedule = weekSchedule[nextDay];
      const nextSchoolStart = parseTime(nextDaySchedule[0].split(' - ')[1].split('-')[0].trim());
      const nextSchoolDay = new Date(now);
      nextSchoolDay.setDate(nextSchoolDay.getDate() + getDayDifference(currentDay, nextDay));
      nextSchoolDay.setHours(nextSchoolStart.getHours(), nextSchoolStart.getMinutes(), 0, 0);
      
      const timeUntilNextSchool = nextSchoolDay - now;
      setCurrentState({ type: 'nonSchoolDay', nextDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
      setProgress(0);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
    } else {
      setCurrentState({ type: 'noSchool' });
      setTimeRemaining('');
      setProgress(0);
      updateTitle('No School', '');
    }
  };

  const handleAfterSchool = (now, currentDay) => {
    const nextDay = getNextSchoolDay(currentDay);
    if (nextDay) {
      const nextDaySchedule = weekSchedule[nextDay];
      const nextSchoolStart = parseTime(nextDaySchedule[0].split(' - ')[1].split('-')[0].trim());
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(nextSchoolStart.getHours(), nextSchoolStart.getMinutes(), 0, 0);
      
      const timeUntilNextSchool = tomorrow - now;
      setCurrentState({ type: 'afterSchool', nextDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
      setProgress(0);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
    } else {
      handleNonSchoolDay(now, currentDay);
    }
  };

  const getNextSchoolDay = (currentDay) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let nextDay = days[(days.indexOf(currentDay) + 1) % 7];
    let count = 0;
    while (!weekSchedule[nextDay] && count < 7) {
      nextDay = days[(days.indexOf(nextDay) + 1) % 7];
      count++;
    }
    return count < 7 ? nextDay : null;
  };

  const getDayDifference = (day1, day2) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (days.indexOf(day2) - days.indexOf(day1) + 7) % 7;
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

  const updateTitle = (status, time) => {
    document.title = time ? `${status} - ${time}` : 'Schedule-SPX';
  };

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    } else if (modifier.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };

  return (
    <div className="bg-stpius-blue border border-stpius-gold p-4 rounded-lg shadow w-full flex flex-col items-center">
      {currentState ? (
        <>
          <p className="text-lg font-semibold text-stpius-white text-center mb-4">
            {currentState.type === 'activePeriod' ? currentState.name :
             currentState.type === 'betweenPeriods' ? `Next: ${currentState.nextPeriod}` :
             currentState.type === 'beforeSchool' ? 'School starts soon' :
             currentState.type === 'afterSchool' || currentState.type === 'nonSchoolDay' ? `Next school day (${currentState.nextDay})` :
             'No School'}
          </p>
          <div className="w-full bg-stpius-gold/30 rounded-full h-4 mb-4">
            <div 
              className="bg-stpius-gold h-4 rounded-full transition-all duration-1000 ease-in-out" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <p className="text-sm text-stpius-white">{timeRemaining}</p>
        </>
      ) : (
        <p className="text-stpius-white">Loading...</p>
      )}
    </div>
  );
};

export default PeriodProgress;
