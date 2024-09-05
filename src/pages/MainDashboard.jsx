// src/pages/MainDashboard.jsx
import React from 'react';
import DayHeader from '../components/DayHeader';
import QuickLinks from '../components/QuickLinks';
import PeriodProgress from '../components/PeriodProgress';
import Schedule from '../components/Schedule';
import GoogleSuiteLinks from '../components/GoogleSuiteLinks';
import Announcement from '../components/Announcement';
import GoogleCalendar from '../components/GoogleCalendar';
import { useWeekSchedule } from '../hooks/useWeekSchedule';

const Card = ({ children, className }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const MainDashboard = () => {
  const { weekSchedule } = useWeekSchedule();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <Card className="h-40">
            <DayHeader />
          </Card>
          <Card className="h-72">
            <QuickLinks />
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="h-96">
            <Schedule weekSchedule={weekSchedule} />
          </Card>
          <Card>
            <Announcement />
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="h-72">
            <GoogleCalendar />
          </Card>
          <Card className="h-40">
            <GoogleSuiteLinks />
          </Card>
        </div>
        <Card className="col-span-full h-36">
          <PeriodProgress weekSchedule={weekSchedule} />
        </Card>
      </div>
    </div>
  );
};

export default MainDashboard;
