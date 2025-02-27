import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import PeriodProgress from '../PeriodProgress';
import { useWeekSchedule } from '../../context/WeekScheduleContext';

const BoardMode = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule } = useWeekSchedule();

  return (
    <div className={`fixed inset-0 ${currentTheme.main} flex items-center justify-center p-4`} style={{ zIndex: 9999 }}>
      <div className="w-full max-w-4xl">
        <div className={`${currentTheme.accent} bg-opacity-10 rounded-xl shadow-2xl p-10`}>
          <PeriodProgress weekSchedule={weekSchedule} />
        </div>
      </div>
    </div>
  );
};

export default BoardMode;
