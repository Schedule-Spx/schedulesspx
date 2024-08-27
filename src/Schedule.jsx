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
    <div className="bg-stpius-blue border border-stpius-gold p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-stpius-white">{currentDay}'s Schedule</h2>
      {daySchedule.length > 0 ? (
        <ul className="space-y-2">
          {daySchedule.map((period, index) => {
            const [name, time] = period.split(' - ');
            const [start, end] = time.split('-');
            return (
              <li key={index} className="flex justify-between items-center bg-stpius-gold/30 p-2 rounded">
                <span className="font-medium text-stpius-white">{name}</span>
                <span className="text-sm text-stpius-white/70">
                  {formatTime(start)} - {formatTime(end)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-stpius-white">No schedule available for today.</p>
      )}
    </div>
  );
};

export default Schedule;
