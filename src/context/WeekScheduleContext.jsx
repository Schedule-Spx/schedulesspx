// src/context/WeekScheduleContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

const WeekScheduleContext = createContext();

export const useWeekSchedule = () => useContext(WeekScheduleContext);

export const WeekScheduleProvider = ({ children }) => {
  const [weekSchedule, setWeekSchedule] = useState({});

  const fetchSchedule = useCallback(async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      setWeekSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }, []);

  return (
    <WeekScheduleContext.Provider value={{ weekSchedule, setWeekSchedule, fetchSchedule }}>
      {children}
    </WeekScheduleContext.Provider>
  );
};
