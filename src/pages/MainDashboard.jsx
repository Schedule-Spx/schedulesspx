// src/pages/MainDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import DayHeader from '../components/DayHeader';
import QuickLinks from '../components/QuickLinks';
import PeriodProgress from '../components/PeriodProgress';
import Schedule from '../components/Schedule';
import GoogleSuiteLinks from '../components/GoogleSuiteLinks';
import Announcement from '../components/Announcement';
import GoogleCalendar from '../components/GoogleCalendar';
import TutorialModal from '../components/TutorialModal';
import { useWeekSchedule } from '../context/WeekScheduleContext';

const MainDashboard = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule, fetchSchedule } = useWeekSchedule();
  const [showTutorial, setShowTutorial] = useState(false);
  const contentRef = useRef(null);

  // Original heights reduced by 10%
  const originalHeights = {
    scheduleHeight: 390,
    googleCalendarHeight: 372,
    dayHeaderHeight: 163,
    quickLinksHeight: 300,
    googleSuiteLinksHeight: 163,
    periodProgressHeight: 155,
  };

  useEffect(() => {
    const tutorialShown = localStorage.getItem('tutorialShown');
    if (!tutorialShown) {
      setShowTutorial(true);
    }
    fetchSchedule();
  }, [fetchSchedule]);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialShown', 'true');
  };

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      {showTutorial && <TutorialModal closeTutorial={closeTutorial} />}
      <div ref={contentRef} className="h-screen p-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left`} style={{ height: `${originalHeights.dayHeaderHeight}px` }}>
            <DayHeader />
          </div>
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left`} style={{ height: `${originalHeights.quickLinksHeight}px`, animationDuration: '2.5s' }}>
            <QuickLinks />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col slide-down`} style={{ height: `${originalHeights.scheduleHeight}px` }}>
            <Schedule weekSchedule={weekSchedule} />
          </div>
          <div className="slide-in-bottom">
            <Announcement />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: `${originalHeights.googleCalendarHeight}px`, animationDuration: '2.5s' }}>
            <GoogleCalendar />
          </div>
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: `${originalHeights.googleSuiteLinksHeight}px` }}>
            <GoogleSuiteLinks />
          </div>
        </div>
        <div 
          className={`absolute bottom-0 left-4 right-4 ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container slide-up`} 
          style={{ 
            height: `${originalHeights.periodProgressHeight}px`,
          }}
        >
          <PeriodProgress weekSchedule={weekSchedule} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
