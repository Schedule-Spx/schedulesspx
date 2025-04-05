import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const PeriodProgress = ({ weekSchedule, lastSchoolDay, customEndTime, largeSizing = false }) => {
  const { currentTheme } = useTheme();
  const { user, isLoggedIn, isAuthorized } = useAuth();
  const [currentState, setCurrentState] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [customNames, setCustomNames] = useState({});

  useEffect(() => {
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomNames(JSON.parse(savedNames));
    }
  }, []);

  console.log("PeriodProgress - user:", user);
  console.log("PeriodProgress - isLoggedIn:", isLoggedIn());
  console.log("PeriodProgress - isAuthorized:", isAuthorized());
  console.log("PeriodProgress - user.isAuthorized:", user?.isAuthorized);

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

  const getNextSchoolDay = useCallback((currentDay) => {
    let nextDay = DAYS[(DAYS.indexOf(currentDay) + 1) % 7];
    let count = 0;
    while (!weekSchedule[nextDay] && count < 7) {
      nextDay = DAYS[(DAYS.indexOf(nextDay) + 1) % 7];
      count++;
    }
    return count < 7 ? nextDay : null;
  }, [weekSchedule]);

  const getDayDifference = useCallback((day1, day2) => {
    return (DAYS.indexOf(day2) - DAYS.indexOf(day1) + 7) % 7;
  }, []);

  const calculateProgress = useCallback((startTime, endTime, now) => {
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    const progressPercentage = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(progressPercentage, 0), 100);
  }, []);

  const getLastSchoolDayEnd = useCallback(() => {
    if (!lastSchoolDay) return null;
    const endDate = new Date(lastSchoolDay);
    endDate.setHours(15, 0, 0, 0); // Set to 3 PM
    return endDate;
  }, [lastSchoolDay]);

  const handleSchoolDay = useCallback((schedule, now, currentDay) => {
    const lastSchoolDayEnd = getLastSchoolDayEnd();
    const schoolStartTime = parseTime(schedule[0].split(' - ')[1].split('-')[0].trim());
    
    const currentPeriodInfo = schedule.find(period => {
      const [, time] = period.split(' - ');
      const [start, end] = time.split('-').map(t => parseTime(t.trim()));
      return start && end && now >= start && now < end;
    });

    if (currentPeriodInfo) {
      const [name, time] = currentPeriodInfo.split(' - ');
      const [start, end] = time.split('-').map(t => parseTime(t.trim()));
      const progressPercentage = calculateProgress(start, end, now);
      const remaining = end - now;

      const customName = /^[1-8]$/.test(name) ? (customNames[`period${name}`] || name) : name;

      setCurrentState({ type: 'activePeriod', name: customName });
      setProgress(progressPercentage);
      setTimeRemaining(formatTimeRemaining(remaining));
      updateTitle(customName, formatTimeRemaining(remaining));
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
        
        const progressPercentage = calculateProgress(previousPeriodEnd, nextPeriodStart, now);
        const timeUntilNext = nextPeriodStart - now;

        setCurrentState({ type: 'betweenPeriods', nextPeriod: nextPeriodName });
        setTimeRemaining(formatTimeRemaining(timeUntilNext));
        setProgress(progressPercentage);
        updateTitle(`Next: ${nextPeriodName}`, formatTimeRemaining(timeUntilNext));
      } else if (schedule[0] && now < parseTime(schedule[0].split(' - ')[1].split('-')[0].trim())) {
        const firstPeriodStart = parseTime(schedule[0].split(' - ')[1].split('-')[0].trim());
        const progressPercentage = calculateProgress(lastSchoolDayEnd, firstPeriodStart, now);
        const timeUntilStart = firstPeriodStart - now;

        setCurrentState({ type: 'beforeSchool', nextPeriod: schedule[0].split(' - ')[0] });
        setTimeRemaining(formatTimeRemaining(timeUntilStart));
        setProgress(progressPercentage);
        updateTitle('School starts in', formatTimeRemaining(timeUntilStart));
      } else {
        handleAfterSchool(now, currentDay);
      }
    }
  }, [parseTime, formatTimeRemaining, updateTitle, calculateProgress, getLastSchoolDayEnd, customNames]);

  const handleNonSchoolDay = useCallback((now, currentDay) => {
    const nextDay = getNextSchoolDay(currentDay);
    if (nextDay && weekSchedule[nextDay]?.[0]) {
      const nextDaySchedule = weekSchedule[nextDay];
      const nextSchoolStart = parseTime(nextDaySchedule[0].split(' - ')[1].split('-')[0].trim());
      const nextSchoolDay = new Date(now);
      nextSchoolDay.setDate(nextSchoolDay.getDate() + getDayDifference(currentDay, nextDay));
      nextSchoolDay.setHours(nextSchoolStart.getHours(), nextSchoolStart.getMinutes(), 0, 0);
      
      const lastSchoolDayEnd = getLastSchoolDayEnd();
      const timeUntilNextSchool = nextSchoolDay - now;
      const progressPercentage = calculateProgress(lastSchoolDayEnd, nextSchoolDay, now);

      setCurrentState({ type: 'nonSchoolDay', nextDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
      setProgress(progressPercentage);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
    } else {
      setCurrentState({ type: 'noSchool' });
      setTimeRemaining('');
      setProgress(100);
      updateTitle('No School', '');
    }
  }, [weekSchedule, getNextSchoolDay, getDayDifference, parseTime, formatTimeRemaining, updateTitle, calculateProgress, getLastSchoolDayEnd]);

  const handleAfterSchool = useCallback((now, currentDay) => {
    const nextDay = getNextSchoolDay(currentDay);
    if (nextDay && weekSchedule[nextDay]?.[0]) {
      const nextDaySchedule = weekSchedule[nextDay];
      const nextSchoolStart = parseTime(nextDaySchedule[0].split(' - ')[1].split('-')[0].trim());
      const nextSchoolDay = new Date(now);
      nextSchoolDay.setDate(nextSchoolDay.getDate() + getDayDifference(currentDay, nextDay));
      nextSchoolDay.setHours(nextSchoolStart.getHours(), nextSchoolStart.getMinutes(), 0, 0);
      
      const lastSchoolDayEnd = getLastSchoolDayEnd();
      const timeUntilNextSchool = nextSchoolDay - now;
      const progressPercentage = calculateProgress(lastSchoolDayEnd, nextSchoolDay, now);

      setCurrentState({ type: 'afterSchool', nextDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
      setProgress(progressPercentage);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
    } else {
      handleNonSchoolDay(now, currentDay);
    }
  }, [weekSchedule, getNextSchoolDay, parseTime, formatTimeRemaining, updateTitle, handleNonSchoolDay, calculateProgress, getDayDifference, getLastSchoolDayEnd]);

  useEffect(() => {
    const updateCurrentState = () => {
      const now = new Date();
      
      // If a custom end time is provided
      if (customEndTime) {
        const [hours, minutes] = customEndTime.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours, minutes, 0, 0);
        
        // If the custom end time is in the past, set it to tomorrow
        if (endTime < now) {
          endTime.setDate(endTime.getDate() + 1);
        }
        
        const timeUntilEnd = endTime - now;
        const totalDuration = 3600000; // 1 hour in milliseconds - arbitrary for progress calculation
        const progressPercentage = (1 - (timeUntilEnd / totalDuration)) * 100;
        
        setCurrentState({ type: 'customEndTime', name: 'Custom Timer' });
        setProgress(Math.min(Math.max(progressPercentage, 0), 100));
        setTimeRemaining(formatTimeRemaining(timeUntilEnd));
        updateTitle('Custom Timer', formatTimeRemaining(timeUntilEnd));
        return;
      }
      
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
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
  }, [weekSchedule, handleSchoolDay, handleNonSchoolDay, customEndTime, formatTimeRemaining, updateTitle]);

  const getProgressBar = (progress, progressBarClasses) => {
    const containerWidth = containerRef.current?.offsetWidth || 700;
    const containerHeight = containerRef.current?.offsetHeight || 155;
    
    const useCircular = containerHeight > containerWidth;

    if (useCircular) {
      const size = Math.min(containerWidth, containerHeight) * 0.8;
      const strokeWidth = Math.max(size * 0.05, 8);
      const radius = (size - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (progress / 100) * circumference;

      return (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
              {/* Background circle */}
              <circle
                style={{
                  stroke: 'currentColor',
                  opacity: 0.2
                }}
                strokeWidth={strokeWidth}
                fill="none"
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
              {/* Progress circle */}
              <circle
                style={{
                  stroke: 'currentColor',
                  transition: 'stroke-dashoffset 1s ease-in-out'
                }}
                strokeWidth={strokeWidth}
                fill="none"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className={`${containerHeight > 300 ? 'text-4xl' : 'text-2xl'} font-bold ${currentTheme.text}`}>
                {progress.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Default linear progress bar
    return (
      <div className={`w-full bg-opacity-20 ${currentTheme.main} rounded-full ${progressBarClasses} relative overflow-hidden`}>
        <div 
          className={`${currentTheme.accent} h-full rounded-full transition-all duration-1000 ease-in-out absolute top-0 left-0`} 
          style={{width: `${progress}%`}}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className={`${largeSizing ? 'text-2xl' : 'text-sm'} font-semibold ${currentTheme.text} z-10`}>
            {progress.toFixed(1)}%
          </p>
        </div>
      </div>
    );
  };

  // Add ref to main container
  const containerRef = useRef(null);

  const renderContent = useMemo(() => {
    if (!currentState) return null;

    const getStatusText = () => {
      if (currentState.type === 'customEndTime') {
        return 'Time Remaining:';
      }
      
      switch (currentState.type) {
        case 'activePeriod':
          return `${currentState.name}`;
        case 'betweenPeriods':
          return `Next Period: ${currentState.nextPeriod}`;
        case 'beforeSchool':
          return `School starts in: ${timeRemaining}`;
        case 'afterSchool':
          return `School ended. Next school day: ${currentState.nextDay}`;
        case 'nonSchoolDay':
          return `No school today. Next school day: ${currentState.nextDay}`;
        case 'noSchool':
          return 'No school today';
        default:
          return '';
      }
    };

    const textSizeClasses = largeSizing 
      ? 'text-4xl mb-6' 
      : 'text-xl mb-4';
    
    const progressBarClasses = largeSizing 
      ? 'h-14 mb-8' 
      : 'h-6 mb-4';
    
    const timeRemainingClasses = largeSizing 
      ? 'text-6xl font-bold' 
      : 'text-lg font-medium';

    return (
      <div className="flex flex-col items-center">
        <p className={`${textSizeClasses} font-bold ${currentTheme.text} text-center`}>
          {getStatusText()}
        </p>
        {getProgressBar(progress, progressBarClasses)}
        <p className={`${timeRemainingClasses} ${currentTheme.text}`}>{timeRemaining}</p>
      </div>
    );
  }, [currentState, currentTheme, progress, timeRemaining, largeSizing]);

  if (!isLoggedIn()) {
    console.log("PeriodProgress - User not logged in");
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>Please log in to view the period progress.</p>
      </div>
    );
  }

  if (!isAuthorized()) {
    console.log("PeriodProgress - User not authorized");
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>You are not authorized to view the period progress.</p>
      </div>
    );
  }

  console.log("PeriodProgress - Rendering period progress");
  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className={`${currentTheme.main} w-full h-full flex flex-col justify-center relative rounded-lg overflow-hidden`}>
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
            zIndex: 0,
          }}
        ></div>
        <div className={`relative z-10 flex flex-col items-center justify-center h-full px-4`}>
          <div className="w-full max-w-3xl">
            {renderContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodProgress;
