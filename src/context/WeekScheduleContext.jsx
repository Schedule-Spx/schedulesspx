// src/context/WeekScheduleContext.jsx
import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

// Create context
const WeekScheduleContext = createContext();

// API endpoint
const SCHEDULE_API_URL = 'https://schedule-api.devs4u.workers.dev/api/schedule';

// Export hook for convenient usage
export const useWeekSchedule = () => useContext(WeekScheduleContext);

export const WeekScheduleProvider = ({ children }) => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(0);
  
  // Fetch schedule with caching mechanism
  const fetchSchedule = useCallback(async (forceRefresh = false) => {
    try {
      // Don't fetch if we've fetched in the last minute, unless forced
      const now = Date.now();
      const CACHE_TIME = 60 * 1000; // 1 minute cache
      
      if (!forceRefresh && now - lastFetched < CACHE_TIME && Object.keys(weekSchedule).length > 0) {
        return weekSchedule;
      }
      
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(SCHEDULE_API_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch schedule: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setWeekSchedule(data);
      setLastFetched(now);
      return data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setError(error.message);
      return weekSchedule; // Return existing data on error
    } finally {
      setIsLoading(false);
    }
  }, [weekSchedule, lastFetched]);
  
  // Save schedule changes to API
  const saveSchedule = useCallback(async (updatedSchedule) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('accessToken');
      const response = await fetch(SCHEDULE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(updatedSchedule)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save schedule: ${response.status} ${response.statusText}`);
      }
      
      setWeekSchedule(updatedSchedule);
      return true;
    } catch (error) {
      console.error('Error saving schedule:', error);
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    weekSchedule,
    setWeekSchedule,
    fetchSchedule,
    saveSchedule,
    isLoading,
    error
  }), [weekSchedule, setWeekSchedule, fetchSchedule, saveSchedule, isLoading, error]);
  
  return (
    <WeekScheduleContext.Provider value={contextValue}>
      {children}
    </WeekScheduleContext.Provider>
  );
};

export default WeekScheduleProvider;
