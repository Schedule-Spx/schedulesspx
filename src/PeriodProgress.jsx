// src/PeriodProgress.jsx
import React, { useState, useEffect } from 'react';

const PeriodProgress = ({ user }) => {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [nextSchoolStart, setNextSchoolStart] = useState(null);

  useEffect(() => {
    const fetchNextSchoolStart = async () => {
      if (user && user.accessToken) {
        try {
          const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?q=School Starts&maxResults=1&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`, {
            headers: {
              'Authorization': `Bearer ${user.accessToken}`
            }
          });
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            setNextSchoolStart(new Date(data.items[0].start.dateTime || data.items[0].start.date));
          }
        } catch (error) {
          console.error('Error fetching next school start:', error);
        }
      }
    };
    fetchNextSchoolStart();
  }, [user]);

  useEffect(() => {
    const checkCurrentPeriod = () => {
      const now = new Date();
      if (nextSchoolStart && now < nextSchoolStart) {
        setCurrentPeriod({ name: "Break" });
        const timeRemaining = Math.floor((nextSchoolStart - now) / 1000);
        setRemainingTime(formatTime(timeRemaining));
      } else {
        // Your existing period checking logic here
      }
    };

    const timer = setInterval(checkCurrentPeriod, 1000);
    return () => clearInterval(timer);
  }, [nextSchoolStart]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="period-progress glass-tile">
      {user ? (
        currentPeriod ? (
          <>
            <div className="text-xl font-bold">{currentPeriod.name}</div>
            <div className="text-lg">
              {currentPeriod.name === "Break" 
                ? `Time until school starts: ${remainingTime}`
                : `Time until period ends: ${remainingTime}`
              }
            </div>
            {/* Progress bar code here */}
          </>
        ) : (
          <div className="text-xl font-bold">No active period</div>
        )
      ) : (
        <div className="text-xl font-bold">Please sign in to view period progress</div>
      )}
    </div>
  );
};

export default PeriodProgress;
