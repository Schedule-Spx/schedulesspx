import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const Schedule = ({ weekSchedule }) => {
  const { currentTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const daySchedule = weekSchedule[currentDay] || [];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const isActivePeriod = (start, end) => {
    const now = currentTime;
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    return now >= startTime && now < endTime;
  };

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours, 10), parseInt(minutes, 10));
  };

  return (
    <div className={`h-full p-4 ${currentTheme.accent}`}>
      <h2 className={`text-xl font-bold mb-2 ${currentTheme.text}`}>{currentDay}'s Schedule</h2>
      <div className="space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
        {daySchedule.length > 0 ? (
          daySchedule.map((period, index) => {
            const [name, time] = period.split(' - ');
            const [start, end] = time.split('-');
            const active = isActivePeriod(start.trim(), end.trim());
            return (
              <div 
                key={index} 
                className={`flex justify-between items-center p-1 rounded text-sm ${
                  active 
                    ? `${currentTheme.main} ${currentTheme.text} font-bold` 
                    : `${currentTheme.main} bg-opacity-50 ${currentTheme.text}`
                }`}
              >
                <span className="font-medium">{name}</span>
                <span className={active ? `${currentTheme.text}` : `${currentTheme.text} opacity-80`}>
                  {formatTime(start)} - {formatTime(end)}
                </span>
              </div>
            );
          })
        ) : (
          <p className={currentTheme.text}>No schedule available for today.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
