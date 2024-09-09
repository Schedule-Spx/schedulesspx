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

const Card = ({ children, className }) => {
  const { currentTheme } = useTheme();
  return (
    <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
};

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
      <div className="h-screen p-4 grid grid-cols-3 grid-rows-6 gap-4">
        <Card className="row-span-2">
          <DayHeader />
        </Card>
        <Card className="row-span-3">
          <Schedule weekSchedule={weekSchedule} />
        </Card>
        <Card className="row-span-3">
          <Suspense fallback={<div>Loading Calendar...</div>}>
            <GoogleCalendar />
          </Suspense>
        </Card>
        <Card className="row-span-4">
          <QuickLinks />
        </Card>
        <Card className="row-span-2">
          <Announcement />
        </Card>
        <Card className="row-span-2">
          <GoogleSuiteLinks />
        </Card>
        <Card className="col-span-3 row-span-1">
          <PeriodProgress weekSchedule={weekSchedule} />
        </Card>
      </div>
    </div>
  );
};

export default MainDashboard;
