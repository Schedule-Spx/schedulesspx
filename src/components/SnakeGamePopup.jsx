import React, { useEffect, useState } from 'react';
import SnakeGame from './Snake';

const GamePopup = () => {
  const [showGames, setShowGames] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [codePosition, setCodePosition] = useState(0);
  
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight'
  ];

  const games = [
    {
      id: 'snake',
      title: 'Snake',
      description: 'Classic Snake Game',
      component: SnakeGame,
      props: {
        color1: "#248ec2",
        color2: "#1d355e",
        backgroundColor: "#ff0000"
      }
    },
    // Add more games here following the same structure
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === konamiCode[codePosition]) {
        const nextPosition = codePosition + 1;
        if (nextPosition === konamiCode.length) {
          setShowGames(true);
          setCodePosition(0);
        } else {
          setCodePosition(nextPosition);
        }
      } else {
        setCodePosition(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [codePosition, konamiCode]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  const handleClose = () => {
    setShowGames(false);
    setSelectedGame(null);
  };

  if (!showGames) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
    }}>
      {!selectedGame ? (
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '15px',
          padding: '2rem',
          width: '80%',
          maxWidth: '1200px',
          color: 'white',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h1 style={{ margin: 0 }}>Arcade Games</h1>
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => handleGameSelect(game)}
                style={{
                  backgroundColor: '#2a2a2a',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  ':hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <h3>{game.title}</h3>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ width: '90vw', height: '90vh', position: 'relative' }}>
          <button
            onClick={handleBack}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              zIndex: 1,
              padding: '0.5rem 1rem',
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Back to Games
          </button>
          <selectedGame.component {...selectedGame.props} />
        </div>
      )}
    </div>
  );
};

export default GamePopup;
