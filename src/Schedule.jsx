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
        console.log('Fetched schedule data:', data); // Log the fetched data
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setCurrentDay(today);
        if (data[today] && Array.isArray(data[today])) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{currentDay}'s Schedule</h2>
      {daySchedule.length > 0 ? (
        <ul className="space-y-2">
          {daySchedule.map((period, index) => {
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
                  {start} - {end}
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
