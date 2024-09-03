import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from './ThemeContext';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const PeriodProgress = ({ weekSchedule, lastSchoolDay }) => {
  const { currentTheme } = useTheme();
  const [currentState, setCurrentState] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  const parseTime = useCallback((timeString) => {
    if (!timeString) return null;
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier?.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    else if (modifier?.toLowerCase() === 'am' && hours === 12) hours = 0;
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  }, []);

  const formatTimeRemaining = useCallback((ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }, []);

  const updateTitle = useCallback((status, time) => {
    document.title = time ? `${status} - ${time}` : 'Schedule-SPX';
  }, []);

  const getLastSchoolDayEnd = useCallback(() => {
    if (!lastSchoolDay) return null;
    const endDate = new Date(lastSchoolDay);
    endDate.setHours(15, 0, 0, 0); // Set to 3 PM
    return endDate;
  }, [lastSchoolDay]);

  const getSchoolStartTime = useCallback((schedule) => {
    if (!schedule || schedule.length === 0) return null;
    const firstPeriod = schedule[0];
    const [, time] = firstPeriod.split(' - ');
    const [startTime] = time.split('-').map(t => t.trim());
    return parseTime(startTime);
  }, [parseTime]);

  const calculateProgress = useCallback((startTime, endTime, now) => {
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    const progressPercentage = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(progressPercentage, 0), 100);
  }, []);

  const handleSchoolDay = useCallback((schedule, now) => {
    const lastSchoolDayEnd = getLastSchoolDayEnd();
    const schoolStartTime = getSchoolStartTime(schedule);
    
    if (!lastSchoolDayEnd || !schoolStartTime) {
      console.error("Could not determine last school day end or school start time");
      return;
    }

    const currentPeriodInfo = schedule.find(period => {
      const [, time] = period.split(' - ');
      const [start, end] = time.split('-').map(t => parseTime(t.trim()));
      return start && end && now >= start && now < end;
    });

    if (currentPeriodInfo) {
      const [name, time] = currentPeriodInfo.split(' - ');
      const [start, end] = time.split('-').map(t => parseTime(t.trim()));
      const periodProgress = calculateProgress(start, end, now);
      const remaining = end - now;

      setCurrentState({ type: 'activePeriod', name });
      setProgress(periodProgress);
      setTimeRemaining(formatTimeRemaining(remaining));
      updateTitle(name, formatTimeRemaining(remaining));
    } else {
      const nextPeriod = schedule.find(period => {
        const startTime = parseTime(period.split(' - ')[1].split('-')[0].trim());
        return startTime && now < startTime;
      });

      if (nextPeriod) {
        const [nextPeriodName, nextPeriodTime] = nextPeriod.split(' - ');
        const nextPeriodStart = parseTime(nextPeriodTime.split('-')[0].trim());
        const currentPeriodIndex = schedule.indexOf(nextPeriod) - 1;
        const previousPeriodEnd = currentPeriodIndex >= 0 
          ? parseTime(schedule[currentPeriodIndex].split(' - ')[1].split('-')[1].trim())
          : schoolStartTime;
        
        const betweenPeriodsProgress = calculateProgress(previousPeriodEnd, nextPeriodStart, now);
        const timeUntilNext = nextPeriodStart - now;

        setCurrentState({ type: 'betweenPeriods', nextPeriod: nextPeriodName });
        setTimeRemaining(formatTimeRemaining(timeUntilNext));
        setProgress(betweenPeriodsProgress);
        updateTitle(`Next: ${nextPeriodName}`, formatTimeRemaining(timeUntilNext));
      } else {
        const dayProgress = calculateProgress(lastSchoolDayEnd, schoolStartTime, now);
        setCurrentState({ type: 'afterSchool' });
        setTimeRemaining('');
        setProgress(dayProgress);
        updateTitle('After School', '');
      }
    }
  }, [parseTime, formatTimeRemaining, updateTitle, calculateProgress, getLastSchoolDayEnd, getSchoolStartTime]);

  useEffect(() => {
    const updateCurrentState = () => {
      const now = new Date();
      const currentDay = DAYS[now.getDay()];
      const todaySchedule = weekSchedule[currentDay];

      if (Array.isArray(todaySchedule) && todaySchedule.length > 0) {
        handleSchoolDay(todaySchedule, now);
      } else {
        const lastSchoolDayEnd = getLastSchoolDayEnd();
        const nextSchoolDay = Object.keys(weekSchedule).find(day => 
          Array.isArray(weekSchedule[day]) && weekSchedule[day].length > 0
        );
        
        if (nextSchoolDay && lastSchoolDayEnd) {
          const nextSchoolStart = getSchoolStartTime(weekSchedule[nextSchoolDay]);
          if (nextSchoolStart) {
            const progressPercentage = calculateProgress(lastSchoolDayEnd, nextSchoolStart, now);
            const timeUntilNextSchool = nextSchoolStart - now;

            setCurrentState({ type: 'nonSchoolDay', nextDay: nextSchoolDay });
            setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
            setProgress(progressPercentage);
            updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
          }
        } else {
          setCurrentState({ type: 'noSchool' });
          setTimeRemaining('');
          setProgress(100);
          updateTitle('No School', '');
        }
      }
    };

    const timer = setInterval(updateCurrentState, 1000);
    updateCurrentState(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule, lastSchoolDay, handleSchoolDay, getLastSchoolDayEnd, getSchoolStartTime, calculateProgress, formatTimeRemaining, updateTitle]);

  const renderContent = useMemo(() => {
    if (!currentState) {
      return <p className={`text-lg font-medium ${currentTheme.text} text-center`}>Loading...</p>;
    }

    const getStatusText = () => {
      switch (currentState.type) {
        case 'activePeriod': return currentState.name;
        case 'betweenPeriods': return `Next: ${currentState.nextPeriod}`;
        case 'beforeSchool': return 'School starts soon';
        case 'afterSchool': return 'After School';
        case 'nonSchoolDay': return `Next school day (${currentState.nextDay})`;
        default: return 'No School';
      }
    };

    return (
      <div className="flex flex-col items-center">
        <p className={`text-xl font-bold ${currentTheme.text} text-center mb-4`}>
          {getStatusText()}
        </p>
        <div className={`w-full bg-opacity-20 ${currentTheme.main} rounded-full h-6 mb-4 relative overflow-hidden`}>
          <div 
            className={`${currentTheme.accent} h-full rounded-full transition-all duration-1000 ease-in-out absolute top-0 left-0`} 
            style={{width: `${progress}%`}}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className={`text-sm font-semibold ${currentTheme.text} z-10`}>
              {progress.toFixed(1)}%
            </p>
          </div>
        </div>
        <p className={`text-lg font-medium ${currentTheme.text}`}>{timeRemaining}</p>
      </div>
    );
  }, [currentState, currentTheme, progress, timeRemaining]);

  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative`}>
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0,
        }}
      ></div>
      <div className="p-5 relative z-10">
        {renderContent}
      </div>
    </div>
  );
};

export default PeriodProgress;
