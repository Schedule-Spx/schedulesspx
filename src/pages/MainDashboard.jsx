// src/pages/MainDashboard.jsx
import React, { useRef, useEffect, memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import DayHeader from '../components/DayHeader';
import QuickLinks from '../components/QuickLinks';
import PeriodProgress from '../components/PeriodProgress';
import Schedule from '../components/Schedule';
import GoogleCalendar from '../components/GoogleCalendar';
import PopupMessage from '../components/PopupMessage';
import { useWeekSchedule } from '../context/WeekScheduleContext';

// Memoized grid item component to reduce re-rendering
const GridItem = memo(({ children, className, animationClass = '' }) => (
  <div className={`${className} ${animationClass}`}>
    {children}
  </div>
));

// Main component
const MainDashboard = memo(() => {
  const { currentTheme } = useTheme();
  const { weekSchedule, fetchSchedule, isLoading } = useWeekSchedule();
  const contentRef = useRef(null);
  
  // Fetch schedule on mount
  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);
  
  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div ref={contentRef} className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="flex flex-col space-y-4">
          <GridItem 
            className={`hidden lg:block ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden h-[230px]`}
            animationClass="slide-in-left"
          >
            <DayHeader />
          </GridItem>
          
          {/* QuickLinks Component - more even distribution */}
          <GridItem 
            className={`hidden lg:block ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden h-[240px]`}
            animationClass="slide-in-left"
          >
            <QuickLinks />
          </GridItem>
        </div>
        
        {/* Middle Column */}
        <GridItem 
          className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col h-[484px]`}
          animationClass="slide-down"
        >
          <Schedule weekSchedule={weekSchedule} />
        </GridItem>
        
        {/* Right Column */}
        <GridItem 
          className={`hidden lg:block ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden h-[484px]`}
          animationClass="slide-in-right"
        >
          <div className="h-full overflow-y-auto">
            <GoogleCalendar />
          </div>
        </GridItem>
        
        {/* Bottom Row - Full Width */}
        <GridItem 
          className={`col-span-full ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container h-[155px]`}
          animationClass="slide-up"
        >
          <PeriodProgress weekSchedule={weekSchedule} />
        </GridItem>
      </div>
      
      {/* Popup message component */}
      <PopupMessage />
    </div>
  );
});

export default MainDashboard;
