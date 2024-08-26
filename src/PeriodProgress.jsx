import React, { useState, useEffect } from 'react';

const PeriodProgress = () => {
  const [weekSchedule, setWeekSchedule] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
        if (!response.ok) throw new Error('Failed to fetch schedule');
        const data = await response.json();
        console.log('Fetched schedule:', data);
        setWeekSchedule(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  const convertTo24Hour = (time12) => {
    const [time, period] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  useEffect(() => {
    const updateCurrentPeriod = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const today = now.toLocaleDateString('en-US', { weekday: 'long' });
      setCurrentDay(today);

      const schedule = weekSchedule[today];
      if (Array.isArray(schedule)) {
        const currentPeriodIndex = schedule.findIndex((period) => {
          const [, time] = period.split(' - ');
          const [start, end] = time.split('-');
          const startTime = convertTo24Hour(start.trim());
          const endTime = convertTo24Hour(end.trim());
          return currentTime >= startTime && currentTime < endTime;
        });

        if (currentPeriodIndex !== -1) {
          setCurrentPeriod(schedule[currentPeriodIndex]);
          const [, time] = schedule[currentPeriodIndex].split(' - ');
          const [start, end] = time.split('-');
          const startTime = convertTo24Hour(start.trim());
          const endTime = convertTo24Hour(end.trim());
          
          const [startHour, startMinute] = startTime.split(':').map(Number);
          const [endHour, endMinute] = endTime.split(':').map(Number);
          const [currentHour, currentMinute] = currentTime.split(':').map(Number);
          
          const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
          const elapsedMinutes = (currentHour - startHour) * 60 + (currentMinute - startMinute);
          const progressPercentage = (elapsedMinutes / totalMinutes) * 100;
          setProgress(progressPercentage);

          const remainingMinutes = totalMinutes - elapsedMinutes;
          setTimeRemaining(`${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`);
        } else {
          setCurrentPeriod(null);
          setProgress(0);
          setTimeRemaining('');
        }
      }
    };

    const timer = setInterval(updateCurrentPeriod, 60000); // Update every minute
    updateCurrentPeriod(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Period Progress</h2>
      {currentPeriod ? (
        <div>
          <p className="mb-2">Current Period: {currentPeriod.split(' - ')[0]}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <p className="mt-2">Time Remaining: {timeRemaining}</p>
        </div>
      ) : (
        <p>No ongoing period.</p>
      )}
    </div>
  );
};

export default PeriodProgress;
