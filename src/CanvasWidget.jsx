// src/CanvasWidget.jsx
import React, { useRef, useEffect } from 'react';

const CanvasWidget = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Example: Draw a simple shape
    ctx.fillStyle = '#b98827'; // St. Pius gold
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
    ctx.fill();

    // You can add more drawing logic here
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full bg-stpius-blue border border-stpius-gold rounded-lg"
    />
  );
};

export default CanvasWidget;
