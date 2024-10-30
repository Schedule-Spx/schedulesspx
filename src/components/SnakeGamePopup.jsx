import React, { useEffect, useState } from 'react';
import SnakeGame from './Snake';

const SnakeGamePopup = () => {
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [codePosition, setCodePosition] = useState(0);
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight'
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === konamiCode[codePosition]) {
        const nextPosition = codePosition + 1;
        if (nextPosition === konamiCode.length) {
          setShowSnakeGame(true);
          setCodePosition(0); // Reset for next time
        } else {
          setCodePosition(nextPosition); // Move to the next key
        }
      } else {
        setCodePosition(0); // Reset if the wrong key is pressed
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [codePosition, konamiCode]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999, // Ensure it's on top
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Dim background
      display: showSnakeGame ? 'flex' : 'none', // Show only when triggered
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto', // Allow overflow
    }}>
      {showSnakeGame && (
        <div style={{ position: 'absolute', width: '90vw', height: '90vh', }}>
          <SnakeGame 
            color1="#248ec2" 
            color2="#1d355e" 
            backgroundColor="#ff0000" // Change for visibility
          />
        </div>
      )}
    </div>
  );
};

export default SnakeGamePopup;
