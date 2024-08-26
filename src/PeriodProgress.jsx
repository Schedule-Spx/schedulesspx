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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto">
        {currentPeriod ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold">{currentPeriod.split(' - ')[0]}</p>
              <p className="text-sm">{timeRemaining} remaining</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-in-out" 
                style={{width: `${progress}%`}}
              ></div>
            </div>
          </>
        ) : (
          <p className="text-center">No ongoing period</p>
        )}
      </div>
    </div>
  );
};

export default PeriodProgress;
