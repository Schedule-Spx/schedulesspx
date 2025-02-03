import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Schedule = ({ weekSchedule }) => {
  const { currentTheme } = useTheme();
  const { user, isAuthorized } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const daySchedule = weekSchedule[currentDay] || [];
  const [customNames, setCustomNames] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setLoading(false);
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomNames(JSON.parse(savedNames));
    }
    return () => clearInterval(timer);
  }, []);

  console.log("Schedule - Current user:", user);
  console.log("Schedule - Is authorized:", isAuthorized());

  const formatTime = (timeString) => {
    if (!timeString) return '';
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
    if (!start || !end) return false;
    const now = currentTime;
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    return now >= startTime && now < endTime;
  };

  const parseTime = (timeString) => {
    if (!timeString) return null;
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

  if (!user || !isAuthorized()) {
    console.log("Schedule - User not authorized");
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>You are not authorized to view the schedule.</p>
      </div>
    );
  }

  console.log("Schedule - User authorized, rendering schedule");
  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col`}>
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-4 flex flex-col h-full relative z-10">
        <h2 className={`text-xl font-bold ${currentTheme.text} mb-4 text-center`}>{currentDay}'s Schedule</h2>
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <div className={`${currentTheme.text} animate-pulse text-center`}>Loading schedule...</div>
          ) : daySchedule.length > 0 ? (
            <div className="space-y-2">
              {daySchedule.map((period, index) => {
                if (!period) return null; // Skip if period is undefined
                let name, start, end;
                if (typeof period === 'string') {
                  const parts = period.split(' - ');
                  name = parts[0];
                  if (parts[1]) {
                    [start, end] = parts[1].split('-');
                  }
                } else {
                  // Handle case where period might be an object
                  name = period.name;
                  start = period.start;
                  end = period.end;
                }
                if (!name || !start || !end) return null; // Skip if essential data is missing
                const active = isActivePeriod(start.trim(), end.trim());
                const customName = customNames[`period${index + 1}`] || name;
                return (
                  <div 
                    key={index} 
                    className={`
                      relative flex justify-between items-center p-2 rounded-lg
                      ${active ? currentTheme.accent : `${currentTheme.main} bg-opacity-50`}
                      transition-all duration-300 ease-in-out
                      animate-fadeIn
                    `}
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div 
                      className={`
                        absolute inset-0 rounded-lg 
                        ${active ? 'animate-highlightFadeIn' : ''}
                      `}
                      style={{
                        animationDelay: `${(index * 50) + 300}ms`,
                        animationDuration: '1s',
                      }}
                    ></div>
                    <span className={`font-medium relative z-10 ${currentTheme.text} text-center`}>{customName}</span>
                    <span className={`relative z-10 ${currentTheme.text} ${active ? 'font-semibold' : 'opacity-80'} text-center`}>
                      {formatTime(start)} - {formatTime(end)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={`${currentTheme.text} animate-fadeIn text-center`}>No schedule available for today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;