import React from 'react';

const Schedule = ({ weekSchedule }) => {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const daySchedule = weekSchedule[currentDay] || [];

  const formatTime = (timeString) => {
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
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

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{currentDay}'s Schedule</h2>
      {daySchedule.length > 0 ? (
        <ul className="space-y-2">
          {daySchedule.map((period, index) => {
            const [name, time] = period.split(' - ');
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
