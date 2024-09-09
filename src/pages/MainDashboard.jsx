// src/pages/MainDashboard.jsx
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useTheme } from '../context/ThemeContext';
import DayHeader from '../components/DayHeader';
import QuickLinks from '../components/QuickLinks';
import PeriodProgress from '../components/PeriodProgress';
import Schedule from '../components/Schedule';
import GoogleSuiteLinks from '../components/GoogleSuiteLinks';
import Announcement from '../components/Announcement';
import GoogleCalendar from '../components/GoogleCalendar';
import TutorialModal from '../components/TutorialModal';
import { useWeekSchedule } from '../hooks/useWeekSchedule';

const Card = ({ children, className, style }) => {
  const { currentTheme } = useTheme();
  return (
    <div 
      className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

const MainDashboard = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule, fetchSchedule } = useWeekSchedule();
  const [showTutorial, setShowTutorial] = useState(false);
  const contentRef = useRef(null);

  const originalHeights = {
    scheduleHeight: 390,
    googleCalendarHeight: 300,
    dayHeaderHeight: 165,
    quickLinksHeight: 300,
    googleSuiteLinksHeight: 165,
    periodProgressHeight: 156,
  };

  useEffect(() => {
    const tutorialShown = localStorage.getItem('tutorialShown');
    if (!tutorialShown) {
      setShowTutorial(true);
    }

    fetchSchedule();

    const handleResize = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight - 64;
        if (contentHeight > windowHeight) {
          const scale = windowHeight / contentHeight;
          contentRef.current.style.transform = `scale(${scale})`;
          contentRef.current.style.transformOrigin = 'top center';
          contentRef.current.style.height = `${contentHeight}px`;
        } else {
          contentRef.current.style.transform = 'none';
          contentRef.current.style.height = 'auto';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchSchedule]);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialShown', 'true');
  };

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      {showTutorial && <TutorialModal closeTutorial={closeTutorial} />}
      <div ref={contentRef} className="flex-grow overflow-auto">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <Card className="slide-in-left" style={{ height: `${originalHeights.dayHeaderHeight}px` }}>
                <DayHeader />
              </Card>
              <Card className="slide-in-left" style={{ height: `${originalHeights.quickLinksHeight}px`, animationDuration: '2.5s' }}>
                <QuickLinks />
              </Card>
            </div>
            <div className="space-y-4">
              <Card className="slide-down" style={{ height: `${originalHeights.scheduleHeight}px` }}>
                <Schedule weekSchedule={weekSchedule} />
              </Card>
              <Card className="slide-in-bottom">
                <Announcement />
              </Card>
            </div>
            <div className="space-y-4">
              <Card className="slide-in-right" style={{ height: `${originalHeights.googleCalendarHeight}px`, animationDuration: '2.5s' }}>
                <Suspense fallback={<div>Loading Calendar...</div>}>
                  <GoogleCalendar />
                </Suspense>
              </Card>
              <Card className="slide-in-right" style={{ height: `${originalHeights.googleSuiteLinksHeight}px` }}>
                <GoogleSuiteLinks />
              </Card>
            </div>
            <Card className="col-span-full slide-up" style={{ height: `${originalHeights.periodProgressHeight}px` }}>
              <PeriodProgress weekSchedule={weekSchedule} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
