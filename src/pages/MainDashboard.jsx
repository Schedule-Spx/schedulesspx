// src/pages/MainDashboard.jsx
import React, { useState, useEffect, Suspense } from 'react';
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
      <div className="h-screen p-4 grid grid-cols-12 grid-rows-6 gap-4">
        <div className="col-span-4 row-span-1">
          <DayHeader />
        </div>
        <div className="col-span-4 row-span-3">
          <Schedule weekSchedule={weekSchedule} />
        </div>
        <div className="col-span-4 row-span-4">
          <GoogleCalendar />
        </div>
        <div className="col-span-4 row-span-3">
          <QuickLinks />
        </div>
        <div className="col-span-4 row-span-1">
          <Announcement />
        </div>
        <div className="col-span-4 row-span-1">
          <GoogleSuiteLinks />
        </div>
        <div className="col-span-12 row-span-1">
          <PeriodProgress weekSchedule={weekSchedule} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
