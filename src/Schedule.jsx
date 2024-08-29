// src/Schedule.jsx
import React from 'react';
import DayHeader from './DayHeader';
import { useTheme } from './ThemeContext';

const Schedule = ({ scheduleData }) => {
  const { currentTheme } = useTheme();

  if (!scheduleData || typeof scheduleData !== 'object') {
    console.error('Schedule data is undefined or not an object:', scheduleData);
    return <div style={{ color: currentTheme.text }}>No schedule available</div>;
  }

  const { Monday, Tuesday, Wednesday, Thursday, Friday } = scheduleData;

  return (
    <div style={{ color: currentTheme.text }}>
      <DayHeader day="Monday" schedule={Monday} />
      <DayHeader day="Tuesday" schedule={Tuesday} />
      <DayHeader day="Wednesday" schedule={Wednesday} />
      <DayHeader day="Thursday" schedule={Thursday} />
      <DayHeader day="Friday" schedule={Friday} />
    </div>
  );
};

export default Schedule;
