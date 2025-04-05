// src/components/Schedule.jsx
import React, { useState, useEffect, useMemo, memo, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import logger from '../utils/logger';

// Constants for better performance and maintainability
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SCHOOL_START_HOUR = 8; // School starts at 8 AM

// Improved Lunch Timer component with enhanced visibility and timing logic
const LunchTimer = memo(({ startTime, isActive }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isPastLunchTime, setIsPastLunchTime] = useState(false);
  
  useEffect(() => {
    // Don't show timer if this period is active or if we're past lunch time today
    if (isActive) return;
    
    const calculateTime = () => {
      try {
        const now = new Date();
        
        // Extract hours and minutes from time string
        let [hours, minutes] = startTime.trim().split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);
        
        // Handle AM/PM
        if (startTime.toLowerCase().includes('pm') && hours < 12) {
          hours += 12;
        }
        if (startTime.toLowerCase().includes('am') && hours === 12) {
          hours = 0;
        }
        
        // Create date for the period start time (today)
        const periodTime = new Date();
        periodTime.setHours(hours, minutes, 0, 0);
        
        // Check if lunch period has already passed today
        if (now >= periodTime) {
          setIsPastLunchTime(true);
          setTimeRemaining('');
          return;
        }
        
        // Reset the past lunch flag at the beginning of each day
        // This ensures the timer shows up again on the next school day
        if (now.getHours() < SCHOOL_START_HOUR) {
          setIsPastLunchTime(false);
        }
        
        // If we previously determined we're past lunch time today, 
        // don't show the timer until the next day
        if (isPastLunchTime) {
          setTimeRemaining('');
          return;
        }
        
        // Calculate difference in minutes
        const diffMs = periodTime - now;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        // Format timer text
        let timerText = '';
        if (diffHrs > 0) {
          timerText = `${diffHrs}h ${diffMins}m`;
        } else {
          timerText = `${diffMins}m`;
        }
        
        setTimeRemaining(timerText);
      } catch (error) {
        console.error('Error calculating lunch time:', error);
        setTimeRemaining('');
      }
    };
    
    // Calculate immediately and then every minute
    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    
    return () => clearInterval(interval);
  }, [startTime, isActive, isPastLunchTime]);
  
  // Don't render if no time remaining or past lunch
  if (!timeRemaining || isPastLunchTime) return null;
  
  // More visible styling for the timer
  return (
    <span className="ml-2 text-xs font-medium bg-black bg-opacity-20 rounded px-1.5 py-0.5 inline-flex items-center">
      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,16.2L11,13V7h1.5v5.2l4.5,2.7L16.2,16.2z"/>
      </svg>
      {timeRemaining}
    </span>
  );
});

// Arrow button component - refined styling for better space usage
const DayNavArrow = memo(({ direction, onClick, disabled, theme }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center h-7 w-7 rounded-full
      ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}
      ${theme.accent} ${theme.text} transition-colors
    `}
    aria-label={`Go to ${direction} day`}
  >
    {direction === 'previous' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
));

// User greeting component with refined styling
const UserGreeting = memo(({ theme }) => {
  const { user } = useAuth();
  
  // Extract first name from user's full name
  const firstName = useMemo(() => {
    if (!user?.name) return '';
    return user.name.split(' ')[0];
  }, [user]);
  
  if (!firstName) return null;
  
  return (
    <div className={`text-sm font-medium ${theme.text} mb-1 px-3 mt-2`}>
      Hello, {firstName}! Here's your schedule:
    </div>
  );
});

// Memoized Period component with enhanced active styling and error protection
const Period = memo(({ period, isActive, isHighlighted, theme }) => {
  const [showDuration, setShowDuration] = useState(false);
  const periodRef = useRef(null);
  
  // Use ref to scroll active period into view - with safety checks
  useEffect(() => {
    if (isActive && periodRef.current) {
      try {
        // Use a more compatible scrollIntoView option with fallback
        if (typeof periodRef.current.scrollIntoView === 'function') {
          // Use a timeout to ensure the DOM is ready
          const timer = setTimeout(() => {
            periodRef.current?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            });
          }, 100);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        logger.error('Error scrolling to active period:', error);
      }
    }
  }, [isActive]);
  
  // Safe parsing of period data with error handling
  const periodData = useMemo(() => {
    try {
      // Default values in case of parsing errors
      const result = {
        name: '',
        time: '',
        start: '',
        end: '',
        periodName: 'Unknown Period'
      };
      
      // Try to parse the period string
      if (typeof period !== 'string') {
        return result;
      }
      
      const parts = period.split(' - ');
      if (parts.length < 2) {
        return result;
      }
      
      result.name = parts[0] || '';
      result.time = parts[1] || '';
      
      const timeParts = result.time.split('-');
      result.start = timeParts[0]?.trim() || '';
      result.end = timeParts[1]?.trim() || '';
      
      return result;
    } catch (error) {
      logger.error('Error parsing period data:', error);
      return {
        name: '',
        time: '',
        start: '',
        end: '',
        periodName: 'Error'
      };
    }
  }, [period]);
  
  // Format time to ensure 12-hour format with AM/PM
  const formatTo12Hour = useCallback((timeStr) => {
    if (!timeStr) return '';
    
    try {
      timeStr = timeStr.trim();
      
      // Check if time already has AM/PM
      if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) {
        return timeStr;
      }
      
      // Handle 24-hour format
      const parts = timeStr.split(':');
      if (parts.length < 2) return timeStr;
      
      let hour = parseInt(parts[0], 10);
      if (isNaN(hour)) return timeStr;
      
      const min = parts[1] || '00';
      
      // Convert to 12-hour format
      const period = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12; // Convert to 12-hour format (0 becomes 12)
      
      return `${hour}:${min} ${period}`;
    } catch (error) {
      logger.error('Error formatting time:', error);
      return timeStr; // Return original on error
    }
  }, []);
  
  // Format time strings to ensure 12-hour format
  const formattedStart = useMemo(() => 
    formatTo12Hour(periodData.start)
  , [periodData.start, formatTo12Hour]);
  
  const formattedEnd = useMemo(() => 
    formatTo12Hour(periodData.end)
  , [periodData.end, formatTo12Hour]);
  
  // Calculate total class time - updated for better 12/24 hour handling
  const classDuration = useMemo(() => {
    try {
      // Extract time components
      const startParts = formattedStart.match(/(\d+):(\d+)\s*(am|pm)?/i);
      const endParts = formattedEnd.match(/(\d+):(\d+)\s*(am|pm)?/i);
      
      if (!startParts || !endParts) return null;
      
      let startHour = parseInt(startParts[1]);
      const startMin = parseInt(startParts[2]);
      const startAmPm = startParts[3]?.toLowerCase();
      
      let endHour = parseInt(endParts[1]);
      const endMin = parseInt(endParts[2]);
      const endAmPm = endParts[3]?.toLowerCase();
      
      // Convert to 24-hour format for calculation
      if (startAmPm === 'pm' && startHour !== 12) startHour += 12;
      if (startAmPm === 'am' && startHour === 12) startHour = 0;
      if (endAmPm === 'pm' && endHour !== 12) endHour += 12;
      if (endAmPm === 'am' && endHour === 12) endHour = 0;
      
      // Calculate minutes
      const startTotalMins = startHour * 60 + startMin;
      const endTotalMins = endHour * 60 + endMin;
      const diffMins = endTotalMins - startTotalMins;
      
      if (diffMins <= 0) return null;
      
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      
      return hours > 0 
        ? `${hours} hour${hours > 1 ? 's' : ''} ${mins > 0 ? `${mins} min` : ''}`
        : `${mins} minutes`;
    } catch (error) {
      console.error('Error calculating class duration:', error);
      return null;
    }
  }, [formattedStart, formattedEnd]);
  
  // Determine custom names from localStorage with safe parsing
  const customNames = useMemo(() => {
    try {
      const storedNames = localStorage.getItem('customPeriodNames');
      if (!storedNames) return {};
      return JSON.parse(storedNames);
    } catch (error) {
      logger.error('Error parsing custom period names:', error);
      return {};
    }
  }, []);
  
  // Check for custom name with safety checks
  const periodName = useMemo(() => {
    try {
      if (!periodData.name) return 'Unknown Period';
      
      if (/^[1-8]$/.test(periodData.name)) {
        return customNames[`period${periodData.name}`] || `Period ${periodData.name}`;
      }
      return periodData.name;
    } catch (error) {
      logger.error('Error determining period name:', error);
      return 'Unknown Period';
    }
  }, [periodData.name, customNames]);
  
  // Improved logic to detect lunch period - case insensitive and more robust
  const isLunchPeriod = useMemo(() => {
    if (!periodName) return false;
    return periodName.toLowerCase().includes('lunch');
  }, [periodName]);
  
  // Prevent rendering if period data is invalid
  if (!periodData.time) {
    return null;
  }
  
  return (
    <div 
      ref={periodRef}
      className={`
        flex justify-between items-center py-2 px-3 rounded-lg
        ${isActive 
          ? `${theme.accent} border ${theme.border}` 
          : theme.secondary}
        mb-2 hover:scale-[1.01] transition-all duration-150 shadow
        relative
      `}
      onMouseEnter={() => setShowDuration(true)}
      onMouseLeave={() => setShowDuration(false)}
    >
      <div className="flex items-center flex-wrap">
        {/* Removed the green indicator bar that was here */}
        <span className={`font-medium ${theme.text} ${isActive ? 'font-bold' : ''}`}>
          {periodName}
        </span>
        
        {/* Lunch timer with improved logic */}
        {isLunchPeriod && (
          <LunchTimer startTime={periodData.start} isActive={isActive} />
        )}
      </div>
      
      {/* Simpler duration/time display with visible transition */}
      <div className="text-right">
        {showDuration && classDuration ? (
          <div className={`text-xs font-medium ${theme.text} opacity-80 bg-black bg-opacity-10 px-2 py-0.5 rounded animate-fadeIn`}>
            {classDuration}
          </div>
        ) : (
          <div className={`text-sm ${theme.text} opacity-70`}>
            {formattedStart} - {formattedEnd}
          </div>
        )}
      </div>
    </div>
  );
});

// Empty state components
const EmptyState = memo(({ message, theme }) => (
  <div className={`flex items-center justify-center h-full p-4`}>
    <p className={`${theme.text} text-center`}>{message}</p>
  </div>
));

// Main Schedule component with error protection
const Schedule = memo(({ weekSchedule, compact = false }) => {
  const { currentTheme } = useTheme();
  const [activeDay, setActiveDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState('');
  const periodsContainerRef = useRef(null);
  
  // Safely get available days with error handling
  const availableDays = useMemo(() => {
    try {
      if (!weekSchedule || typeof weekSchedule !== 'object') {
        return [];
      }
      return DAYS_OF_WEEK.filter(day => 
        weekSchedule[day] && Array.isArray(weekSchedule[day]) && weekSchedule[day].length > 0
      );
    } catch (error) {
      logger.error('Error determining available days:', error);
      return [];
    }
  }, [weekSchedule]);
  
  // Set initial active day based on current day - with error handling
  useEffect(() => {
    try {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      
      // If today has a schedule, use it; otherwise find the first day with schedule
      if (weekSchedule?.[today]?.length > 0) {
        setActiveDay(today);
      } else {
        // Find the next day with schedule
        const currentDayIndex = DAYS_OF_WEEK.indexOf(today);
        
        // Look forward from current day
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (currentDayIndex + i) % 7;
          const nextDay = DAYS_OF_WEEK[nextDayIndex];
          if (weekSchedule?.[nextDay]?.length > 0) {
            setActiveDay(nextDay);
            break;
          }
        }
      }
    } catch (error) {
      logger.error('Error setting initial active day:', error);
      // Fallback to first available day
      if (availableDays.length > 0) {
        setActiveDay(availableDays[0]);
      }
    }
  }, [weekSchedule, availableDays]);
  
  // More robust current period detection
  useEffect(() => {
    let timerId = null;
    
    const checkCurrentPeriod = () => {
      try {
        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (!weekSchedule?.[currentDay]) {
          setCurrentPeriod('');
          return;
        }
        
        const currentPeriodInfo = weekSchedule[currentDay].find(period => {
          try {
            if (typeof period !== 'string') return false;
            
            const [, time] = period.split(' - ');
            if (!time) return false;
            
            const [startStr, endStr] = time.split('-');
            if (!startStr || !endStr) return false;
            
            // Parse times with protection against malformed input
            const parseTime = (timeStr) => {
              try {
                const [hourStr, minuteStr] = timeStr.trim().split(':');
                if (!hourStr || !minuteStr) return null;
                
                const hourParts = hourStr.match(/^\d+/);
                const minuteParts = minuteStr.match(/^\d+/);
                if (!hourParts || !minuteParts) return null;
                
                let hour = parseInt(hourParts[0]);
                const minute = parseInt(minuteParts[0]);
                
                if (isNaN(hour) || isNaN(minute)) return null;
                
                const isPM = timeStr.trim().toLowerCase().includes('pm');
                if (isPM && hour !== 12) hour += 12;
                if (!isPM && hour === 12) hour = 0;
                
                const timeObj = new Date();
                timeObj.setHours(hour, minute, 0, 0);
                return timeObj;
              } catch (e) {
                return null;
              }
            };
            
            const startTime = parseTime(startStr);
            const endTime = parseTime(endStr);
            
            if (!startTime || !endTime) return false;
            
            return now >= startTime && now < endTime;
          } catch (e) {
            logger.error('Error parsing period time:', e);
            return false;
          }
        });
        
        setCurrentPeriod(currentPeriodInfo || '');
      } catch (error) {
        logger.error('Error checking current period:', error);
      }
    };
    
    // Initial check
    checkCurrentPeriod();
    
    // Set interval for periodic checks
    timerId = setInterval(checkCurrentPeriod, 30000);
    
    // Cleanup on unmount
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [weekSchedule]);
  
  // Get index of active day in available days array with safety check
  const activeDayIndex = useMemo(() => {
    if (!activeDay || !Array.isArray(availableDays)) return -1;
    return availableDays.indexOf(activeDay);
  }, [availableDays, activeDay]);
  
  // Navigation handlers with safety checks
  const goToPreviousDay = useCallback(() => {
    if (activeDayIndex > 0 && Array.isArray(availableDays)) {
      setActiveDay(availableDays[activeDayIndex - 1]);
    }
  }, [activeDayIndex, availableDays]);
  
  const goToNextDay = useCallback(() => {
    if (Array.isArray(availableDays) && activeDayIndex < availableDays.length - 1) {
      setActiveDay(availableDays[activeDayIndex + 1]);
    }
  }, [activeDayIndex, availableDays]);
  
  // Safeguarded schedule validation
  const hasValidSchedule = useMemo(() => {
    try {
      return weekSchedule && typeof weekSchedule === 'object' && Object.keys(weekSchedule).length > 0;
    } catch (error) {
      logger.error('Error validating schedule:', error);
      return false;
    }
  }, [weekSchedule]);
  
  // Early return if no schedule with proper fallback UI
  if (!hasValidSchedule) {
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col`}>
        <EmptyState message="No schedule available." theme={currentTheme} />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className={`${currentTheme.main} w-full h-full flex flex-col relative rounded-lg overflow-hidden`}>
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
            zIndex: 0,
          }}
        />
        
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Day navigation bar */}
          <div className="flex items-center justify-between px-3 py-2">
            <DayNavArrow 
              direction="previous" 
              onClick={goToPreviousDay} 
              disabled={activeDayIndex <= 0}
              theme={currentTheme}
            />
            
            {/* Current day display - styled to match other components */}
            <div className={`
              ${currentTheme.accent} ${currentTheme.text}
              py-1 px-4 rounded-lg font-bold text-center
              flex-1 mx-2 shadow-sm
            `}>
              {activeDay || 'No Day Selected'}
            </div>
            
            <DayNavArrow 
              direction="next" 
              onClick={goToNextDay} 
              disabled={activeDayIndex >= availableDays.length - 1 || activeDayIndex === -1}
              theme={currentTheme}
            />
          </div>
          
          {/* Periods list */}
          <div 
            ref={periodsContainerRef}
            className="px-3 py-2 flex-grow overflow-y-auto"
          >
            {activeDay ? (
              weekSchedule[activeDay]?.length > 0 ? (
                weekSchedule[activeDay].map((period, index) => (
                  <Period
                    key={`${activeDay}-${index}`}
                    period={period}
                    isActive={period === currentPeriod && activeDay === new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    isHighlighted={false}
                    theme={currentTheme}
                  />
                ))
              ) : (
                <EmptyState message={`No periods on ${activeDay}.`} theme={currentTheme} />
              )
            ) : (
              <EmptyState message="Select a day to view the schedule." theme={currentTheme} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// Animations and styles
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}
`;

// Style component separated for cleaner code
const StyleTag = memo(() => (
  <style>{styles}</style>
));

// Export wrapper with error boundary pattern
const ScheduleWithStyles = memo((props) => {
  try {
    return (
      <>
        <StyleTag />
        <Schedule {...props} />
      </>
    );
  } catch (error) {
    logger.error('Error rendering Schedule component:', error);
    return (
      <div className="bg-gray-100 rounded-lg shadow-lg w-full border-2 border-gray-300 relative p-4 h-full flex justify-center items-center">
        <p className="text-gray-700 text-center">Unable to display schedule.</p>
      </div>
    );
  }
});

export default ScheduleWithStyles;
