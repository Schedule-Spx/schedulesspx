import { useState, useEffect } from 'react';

export const useWeekSchedule = () => {
  const [weekSchedule, setWeekSchedule] = useState({});

  const fetchSchedule = async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      setWeekSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return { weekSchedule, setWeekSchedule, fetchSchedule };
};
