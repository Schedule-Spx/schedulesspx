// src/pages/MainDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import DayHeader from '../components/DayHeader';
import QuickLinks from '../components/QuickLinks';
import PeriodProgress from '../components/PeriodProgress';
import Schedule from '../components/Schedule';
import GoogleCalendar from '../components/GoogleCalendar';
import TutorialModal from '../components/TutorialModal';
import { useWeekSchedule } from '../context/WeekScheduleContext';

const MainDashboard = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule, fetchSchedule } = useWeekSchedule();
  const [showTutorial, setShowTutorial] = useState(false);
  const contentRef = useRef(null);

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
      <div ref={contentRef} className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left h-[164px]`}>
            <DayHeader />
          </div>
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left h-[300px]`}>
            <QuickLinks />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col slide-down h-[484px]`}>
            <Schedule weekSchedule={weekSchedule} />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right h-[484px]`}>
            <div className="h-full overflow-y-auto">
              <GoogleCalendar />
            </div>
          </div>
        </div>
        <div className={`col-span-full ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container slide-up h-[155px]`}>
          <PeriodProgress weekSchedule={weekSchedule} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
