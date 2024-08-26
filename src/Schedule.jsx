import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [daySchedule, setDaySchedule] = useState([]);
  const [currentDay, setCurrentDay] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched schedule data:', data);
        
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        console.log('Current day:', today);
        setCurrentDay(today);
        
        if (data[today] && Array.isArray(data[today])) {
          console.log(`Schedule for ${today}:`, data[today]);
          setDaySchedule(data[today]);
        } else {
          console.log(`No schedule found for ${today}`);
          setDaySchedule([]);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const formatTime = (timeString) => {
    // Check if the time is already in 12-hour format
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours, 10);
    
    if (hours12 >= 12) {
      period = 'PM';
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }
    if (hours12 === 0) {
      hours12 = 12;
    }
    
    return `${hours12.toString().padStart(2, '0')}:${minutes} ${period}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{currentDay}'s Schedule</h2>
      {daySchedule.length > 0 ? (
        <ul className="space-y-2">
          {daySchedule.map((period, index) => {
            console.log('Processing period:', period);
            if (typeof period !== 'string') {
              console.error('Invalid period format:', period);
              return null;
            }
            const parts = period.split(' - ');
            if (parts.length !== 2) {
              console.error('Invalid period format:', period);
              return null;
            }
            const [name, time] = parts;
            const [start, end] = time.split('-');
            return (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium">{name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTime(start)} - {formatTime(end)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No schedule available for today.</p>
      )}
    </div>
  );
};

export default Schedule;
