import React, { useState, useEffect } from 'react';

const LunchCountdown = ({ period }) => {
  const [timeUntilLunch, setTimeUntilLunch] = useState('');

  useEffect(() => {
    const calculateTimeUntilLunch = () => {
      const now = new Date();
      let lunchTime = new Date(now);

      if (period === '4') {
        lunchTime.setHours(11, 0, 0, 0); // Assuming lunch period 4 is at 11:00 AM
      } else if (period === '5') {
        lunchTime.setHours(12, 0, 0, 0); // Assuming lunch period 5 is at 12:00 PM
      } else if (period === '6') {
        lunchTime.setHours(13, 0, 0, 0); // Assuming lunch period 6 is at 1:00 PM
      }

      const diff = lunchTime - now;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      if (hours > 0) {
        setTimeUntilLunch(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilLunch(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeUntilLunch();
    const timer = setInterval(calculateTimeUntilLunch, 1000);

    return () => clearInterval(timer);
  }, [period]);

  return (
    <span className="relative z-10 text-center text-xs">
      {timeUntilLunch}
    </span>
  );
};

export default LunchCountdown;
