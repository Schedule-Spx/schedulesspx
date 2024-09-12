// src/components/TeacherTools/Timer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Timer = () => {
  const { currentTheme } = useTheme();
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState('05:00');
  const inputRef = useRef(null);

  const presets = [
    { name: '1 min', seconds: 60 },
    { name: '5 min', seconds: 300 },
    { name: '10 min', seconds: 600 },
    { name: '15 min', seconds: 900 },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => {
          const newTime = time - 1;
          setInputTime(formatTime(newTime));
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(300);
    setInputTime('05:00');
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleInputBlur = () => {
    const [mins, secs] = inputTime.split(':').map(Number);
    if (!isNaN(mins) && !isNaN(secs)) {
      const totalSeconds = mins * 60 + secs;
      setTime(totalSeconds);
      setInputTime(formatTime(totalSeconds));
    } else {
      setInputTime(formatTime(time));
    }
  };

  const handlePresetClick = (seconds) => {
    setTime(seconds);
    setInputTime(formatTime(seconds));
    setIsActive(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Timer</h2>
      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={inputTime}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`text-4xl w-32 text-center ${currentTheme.input} rounded`}
          style={{ color: 'black' }}
        />
      </div>
      <div className="mb-4">
        <button
          className={`${currentTheme.button} ${currentTheme.buttonText} px-4 py-2 rounded mr-2`}
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className={`${currentTheme.button} ${currentTheme.buttonText} px-4 py-2 rounded`}
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        {presets.map((preset) => (
          <button
            key={preset.name}
            className={`${currentTheme.button} ${currentTheme.buttonText} px-3 py-1 rounded text-sm`}
            onClick={() => handlePresetClick(preset.seconds)}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;
