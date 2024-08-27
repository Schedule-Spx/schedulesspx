import React, { useState, useEffect } from 'react';

const PeriodProgress = ({ weekSchedule }) => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

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
          const [name, time] = period.split(' - ');
          const [start, end] = time.split('-');
          const startTime = convertTo24Hour(start.trim());
          const endTime = convertTo24Hour(end.trim());
          return currentTime >= startTime && currentTime < endTime;
        });

        if (currentPeriodIndex !== -1) {
          const period = schedule[currentPeriodIndex];
          setCurrentPeriod(period);
          const [name, time] = period.split(' - ');
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

          // Update browser tab title
          document.title = `${name} - ${timeRemaining} left`;
        } else {
          setCurrentPeriod(null);
          setProgress(0);
          setTimeRemaining('');
          document.title = 'Schedule-SPX'; // Reset title when no active period
        }
      }
    };

    const timer = setInterval(updateCurrentPeriod, 60000); // Update every minute
    updateCurrentPeriod(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-4">Period Progress</h2>
      {currentPeriod ? (
        <div>
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
        </div>
      ) : (
        <p>No ongoing period.</p>
      )}
    </div>
  );
};

export default PeriodProgress;
