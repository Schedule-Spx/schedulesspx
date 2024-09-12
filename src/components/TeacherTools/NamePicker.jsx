// src/components/TeacherTools/NamePicker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const tailwindColors = {
  'red-500': '#ef4444',
  'pink-500': '#ec4899',
  'purple-500': '#a855f7',
  'indigo-500': '#6366f1',
  'blue-500': '#3b82f6',
  'cyan-500': '#06b6d4',
  'teal-500': '#14b8a6',
  'green-500': '#22c55e',
  'lime-500': '#84cc16',
  'yellow-500': '#eab308',
  'amber-500': '#f59e0b',
  'orange-500': '#f97316'
};

const NamePicker = () => {
  const { currentTheme } = useTheme();
  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const wheelRef = useRef(null);
  const canvasRef = useRef(null);

  const tailwindGradients = [
    ['from-red-500 to-pink-500', 'from-pink-500 to-purple-500'],
    ['from-purple-500 to-indigo-500', 'from-indigo-500 to-blue-500'],
    ['from-blue-500 to-cyan-500', 'from-cyan-500 to-teal-500'],
    ['from-teal-500 to-green-500', 'from-green-500 to-lime-500'],
    ['from-lime-500 to-yellow-500', 'from-yellow-500 to-amber-500'],
    ['from-amber-500 to-orange-500', 'from-orange-500 to-red-500'],
  ];

  const getRandomGradients = (count) => {
    const shuffled = tailwindGradients.flat().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    drawWheel();
  }, [names]);

  useEffect(() => {
    if (isSpinning) {
      const spinDuration = 5000;
      const spinRevolutions = 5;
      const randomStopAngle = Math.random() * 360;
      const totalRotation = spinRevolutions * 360 + randomStopAngle;
      
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

      setTimeout(() => {
        setIsSpinning(false);
        const selectedIndex = Math.floor(randomStopAngle / (360 / names.length));
        setSelectedName(names[selectedIndex]);
        setShowNotification(true);
      }, spinDuration);
    }
  }, [isSpinning, names]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (names.length === 0) {
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      return;
    }

    const sliceAngle = (2 * Math.PI) / names.length;
    const gradients = getRandomGradients(names.length);

    names.forEach((name, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;

      // Create gradient
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + radius * Math.cos((startAngle + endAngle) / 2),
        centerY + radius * Math.sin((startAngle + endAngle) / 2)
      );
      const [fromColor, toColor] = gradients[index].split(' ');
      gradient.addColorStop(0, tailwindColors[fromColor.split('-')[1] + '-500']);
      gradient.addColorStop(1, tailwindColors[toColor.split('-')[1] + '-500']);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px "Inter", "Roboto", "Helvetica", "Arial", sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(name, radius - 15, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const newNames = e.target.value.split('\n').filter(name => name.trim() !== '');
    setNames(newNames);
  };

  const handleSpin = () => {
    if (names.length > 1 && !isSpinning) {
      setIsSpinning(true);
      setSelectedName('');
    }
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleRemove = () => {
    setNames(names.filter(name => name !== selectedName));
    setInputValue(names.filter(name => name !== selectedName).join('\n'));
    setShowNotification(false);
  };

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Name Picker</h2>
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/3 pr-4 mb-4 md:mb-0">
          <div className="relative w-80 h-80 mx-auto mb-4" onClick={handleSpin}>
            <div
              ref={wheelRef}
              className="absolute w-full h-full cursor-pointer"
            >
              <canvas ref={canvasRef} width="400" height="400" className="w-full h-full" />
            </div>
            <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M0 10 L10 0 L10 20 Z" fill="red" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            className={`${currentTheme.input} rounded px-2 py-1 mb-2 flex-grow`}
            placeholder="Enter names (one per line)"
            style={{ resize: 'none', color: 'black' }}
          />
        </div>
      </div>
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${currentTheme.main} rounded-lg shadow-xl overflow-hidden max-w-sm w-full`}>
            <div className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2`}>
              <h3 className="text-lg font-semibold">Winner!</h3>
            </div>
            <div className="p-4">
              <p className={`text-xl font-bold mb-4 ${currentTheme.text}`}>{selectedName}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleClose}
                  className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80 transition-opacity duration-200`}
                >
                  Close
                </button>
                <button
                  onClick={handleRemove}
                  className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80 transition-opacity duration-200`}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NamePicker;
