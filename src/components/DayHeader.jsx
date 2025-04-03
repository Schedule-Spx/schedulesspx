import React, { useEffect, useState, useMemo, memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Weather from './Weather';

// Constants
const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const UPDATE_INTERVAL = 1000; // 1 second

// Precomputed background style for better performance
const gradientOverlayStyle = {
  background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
  zIndex: 0
};

// Memoized time component to reduce re-renders - smaller size
const TimeDisplay = memo(({ time, theme }) => (
  <div className={`${theme.accent} ${theme.text} px-2 py-0.5 rounded text-sm font-medium`}>
    {time}
  </div>
));

// Main component
const DayHeader = memo(() => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Setup timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, UPDATE_INTERVAL);
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate date strings only when the time changes
  const dateInfo = useMemo(() => {
    const day = currentDateTime.getDay();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = currentDateTime.toLocaleDateString('en-US', options);
    
    return {
      formattedDate,
      timeString: currentDateTime.toLocaleTimeString()
    };
  }, [currentDateTime]);

  // Get user's first name for welcome message
  const userName = useMemo(() => {
    const fullName = user?.name || user?.displayName || 'Guest';
    return fullName.split(' ')[0]; // Extract first name only
  }, [user]);

  return (
    <div className={`h-full rounded-lg shadow-md w-full border-2 ${currentTheme.border} ${currentTheme.main} relative overflow-hidden`}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 rounded-lg" style={gradientOverlayStyle}></div>
      
      <div className="p-3 flex flex-col h-full relative z-10">
        {/* Header with welcome message across top */}
        <div className="mb-1">
          <div className={`text-2xl font-bold tracking-wide ${currentTheme.text} text-center`}>
            Welcome, {userName}!
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <div className={`text-sm tracking-wide ${currentTheme.text}`}>
              {dateInfo.formattedDate}
            </div>
            <TimeDisplay time={dateInfo.timeString} theme={currentTheme} />
          </div>
        </div>
        
        {/* Weather section - unchanged */}
        <div className="flex-grow mt-1 pt-1.5 border-t border-opacity-20">
          <Weather />
        </div>
      </div>
    </div>
  );
});

export default DayHeader;
