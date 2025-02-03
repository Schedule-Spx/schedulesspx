import React, { useState, useEffect } from 'react';

const LunchCountdown = ({ period }) => {
  const [minutesUntilLunch, setMinutesUntilLunch] = useState(null);

  useEffect(() => {
    const calculateMinutesUntilLunch = () => {
      const now = new Date();
      const lunchTime = new Date();
      lunchTime.setHours(12, 0, 0, 0); // Assuming lunch is at 12:00 PM

      const diff = lunchTime - now;
      const minutes = Math.floor(diff / 1000 / 60);

      setMinutesUntilLunch(minutes);
    };

    calculateMinutesUntilLunch();
    const interval = setInterval(calculateMinutesUntilLunch, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (period !== "4" && period !== "5" && period !== "6") {
    return null;
  }

  return (
    <div style={{ color: 'white', fontSize: '0.8rem' }}>
      {minutesUntilLunch !== null && `Minutes until lunch: ${minutesUntilLunch}`}
    </div>
  );
};

export default LunchCountdown;
