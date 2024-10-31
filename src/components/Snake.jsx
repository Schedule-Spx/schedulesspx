import React, { useEffect, useState, useCallback, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('snakeHighScores');
    return saved ? JSON.parse(saved) : { classic: 0, speed: 0, walls: 0, maze: 0 };
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameMode, setGameMode] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('green');
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Game settings
  const GRID_SIZE = 20;
  const CELL_SIZE = 25;
  const INITIAL_SPEED = 150;
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Game state refs
  const snakeRef = useRef([
    { x: 10, y: 10 }, // head
    { x: 9, y: 10 },  // body
    { x: 8, y: 10 }   // tail
  ]);
  const foodRef = useRef(null);
  const specialFoodRef = useRef(null);
  const directionRef = useRef({ x: 1, y: 0 });
  const lastDirectionRef = useRef({ x: 1, y: 0 });
  const lastRenderTimeRef = useRef(0);
  const wallsRef = useRef([]);
  const gameLoopRef = useRef(null);

  const colorSchemes = {
    green: {
      body: '#4CAF50',
      head: '#388E3C',
    },
    blue: {
      body: '#2196F3',
      head: '#1976D2',
    },
    red: {
      body: '#F44336',
      head: '#D32F2F',
    },
    purple: {
      body: '#9C27B0',
      head: '#7B1FA2',
    },
    rainbow: {
      body: '#random',
      head: '#random',
    },
  };

  const colorScheme = {
    snake: colorSchemes[selectedColor],
    food: '#FF5252',
    specialFood: '#FFD700',
    background: '#FAFAFA',
    grid: '#E0E0E0',
    walls: '#795548',
    text: '#333333',
  };

  const checkCollision = (head) => {
    // Check wall collision
    if (gameMode === 'walls' || gameMode === 'maze') {
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
      }
    }

    // Check self collision (skip the last segment as it will move)
    for (let i = 1; i < snakeRef.current.length - 1; i++) {
      if (head.x === snakeRef.current[i].x && head.y === snakeRef.current[i].y) {
        return true;
      }
    }

    // Check maze walls
    if (gameMode === 'maze') {
      return wallsRef.current.some(wall => wall.x === head.x && wall.y === head.y);
    }

    return false;
  };
  const generateWalls = useCallback(() => {
    const walls = [];
    if (gameMode === 'maze') {
      for (let i = 0; i < GRID_SIZE; i++) {
        if (i % 4 === 0) {
          for (let j = 0; j < GRID_SIZE - 2; j++) {
            walls.push({ x: i, y: j });
          }
        }
        if (i % 4 === 2) {
          for (let j = 2; j < GRID_SIZE; j++) {
            walls.push({ x: i, y: j });
          }
        }
      }
    }
    return walls;
  }, [gameMode]);

  const generateFood = useCallback(() => {
    let food;
    let isValidPosition = false;

    while (!isValidPosition) {
      food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };

      // Check if food position overlaps with snake
      const onSnake = snakeRef.current.some(
        segment => segment.x === food.x && segment.y === food.y
      );

      // Check if food position overlaps with walls
      const onWall = wallsRef.current.some(
        wall => wall.x === food.x && wall.y === food.y
      );

      if (!onSnake && !onWall) {
        isValidPosition = true;
      }
    }

    return food;
  }, []);

  const resetGame = useCallback(() => {
    // Cancel existing game loop
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }

    // Reset snake to initial position with 3 segments
    snakeRef.current = [
      { x: 10, y: 10 }, // head
      { x: 9, y: 10 },  // body
      { x: 8, y: 10 }   // tail
    ];
    
    directionRef.current = { x: 1, y: 0 };
    lastDirectionRef.current = { x: 1, y: 0 };
    foodRef.current = generateFood();
    specialFoodRef.current = null;
    wallsRef.current = generateWalls();
    lastRenderTimeRef.current = 0;
    
    setScore(0);
    setLevel(1);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setIsPaused(false);
    setIsGameStarted(true);

    // Start new game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [generateFood, generateWalls, gameLoop]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === ' ') {
      event.preventDefault();
      setIsPaused(prev => !prev);
      return;
    }

    if (event.key === 'r' && gameOver) {
      resetGame();
      return;
    }

    if (isPaused) return;

    const currentDirection = lastDirectionRef.current;
    let newDirection = { ...currentDirection };

    switch (event.key) {
      case 'ArrowUp':
        if (currentDirection.y === 0) {
          newDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (currentDirection.y === 0) {
          newDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (currentDirection.x === 0) {
          newDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (currentDirection.x === 0) {
          newDirection = { x: 1, y: 0 };
        }
        break;
      default:
        return;
    }

    // Only update direction if it's different
    if (newDirection.x !== currentDirection.x || 
        newDirection.y !== currentDirection.y) {
      directionRef.current = newDirection;
    }
  }, [gameOver, isPaused, resetGame]);

  const moveSnake = useCallback(() => {
    const newSnake = [...snakeRef.current];
    const head = { ...newSnake[0] };
    const direction = directionRef.current;

    // Update head position
    head.x += direction.x;
    head.y += direction.y;

    // Handle wrapping around the edges if not in walls mode
    if (gameMode !== 'walls' && gameMode !== 'maze') {
      if (head.x >= GRID_SIZE) head.x = 0;
      if (head.x < 0) head.x = GRID_SIZE - 1;
      if (head.y >= GRID_SIZE) head.y = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
    }

    // Check for collisions
    if (checkCollision(head)) {
      setGameOver(true);
      return false;
    }

    // Add new head
    newSnake.unshift(head);
    lastDirectionRef.current = direction;

    // Check for food collision
    let ate = false;
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      foodRef.current = generateFood();
      setScore(prev => prev + 1);
      ate = true;
      
      // Possibly spawn special food
      if (Math.random() < 0.2) {
        specialFoodRef.current = generateFood();
      }
    } else if (
      specialFoodRef.current &&
      head.x === specialFoodRef.current.x &&
      head.y === specialFoodRef.current.y
    ) {
      specialFoodRef.current = null;
      setScore(prev => prev + 5);
      ate = true;
    }

    // Remove tail if didn't eat
    if (!ate) {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    return true;
  }, [checkCollision, generateFood, gameMode]);
  const drawGame = useCallback((ctx) => {
    // Clear canvas
    ctx.fillStyle = colorScheme.background;
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE + 40);

    // Draw grid
    ctx.strokeStyle = colorScheme.grid;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Draw walls
    wallsRef.current.forEach(wall => {
      ctx.fillStyle = colorScheme.walls;
      ctx.fillRect(
        wall.x * CELL_SIZE,
        wall.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    // Draw snake with rounded corners and gradient
    snakeRef.current.forEach((segment, index) => {
      let fillStyle;
      if (selectedColor === 'rainbow') {
        const hue = (index * 15) % 360;
        fillStyle = `hsl(${hue}, 70%, 50%)`;
      } else {
        fillStyle = index === 0 ? colorScheme.snake.head : colorScheme.snake.body;
      }
      
      ctx.fillStyle = fillStyle;
      
      // Draw rounded rectangle for snake segments
      const radius = CELL_SIZE / 4;
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const width = CELL_SIZE - 2;
      const height = CELL_SIZE - 2;
      
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Add eyes if it's the head
      if (index === 0) {
        ctx.fillStyle = '#FFF';
        const eyeSize = CELL_SIZE / 6;
        const eyeOffset = CELL_SIZE / 3;
        
        // Left eye
        ctx.beginPath();
        ctx.arc(
          x + eyeOffset,
          y + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Right eye
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - eyeOffset,
          y + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    // Draw food with glow effect
    if (foodRef.current) {
      ctx.shadowColor = 'rgba(255, 82, 82, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = colorScheme.food;
      ctx.beginPath();
      ctx.arc(
        foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
        foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw special food with sparkle effect
    if (specialFoodRef.current) {
      ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
      ctx.shadowBlur = 15;
      ctx.fillStyle = colorScheme.specialFood;
      ctx.beginPath();
      ctx.arc(
        specialFoodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
        specialFoodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw score and level
    ctx.fillStyle = colorScheme.text;
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Score: ${score}`, 10, GRID_SIZE * CELL_SIZE + 25);
    ctx.fillText(`Level: ${level}`, GRID_SIZE * CELL_SIZE - 100, GRID_SIZE * CELL_SIZE + 25);
  }, [colorScheme, score, level, selectedColor]);

  const gameLoop = useCallback((timestamp) => {
    if (gameOver) {
      return;
    }

    if (isPaused) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!lastRenderTimeRef.current) {
      lastRenderTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastRenderTimeRef.current;

    if (elapsed > speed) {
      const continueGame = moveSnake();
      if (!continueGame) {
        // Update high score
        setHighScores(prev => ({
          ...prev,
          [gameMode]: Math.max(prev[gameMode], score)
        }));
        localStorage.setItem('snakeHighScores', JSON.stringify(highScores));
        return;
      }

      // Update level and speed
      if (score > 0 && score % 5 === 0) {
        setLevel(Math.floor(score / 5) + 1);
        setSpeed(prev => Math.max(prev * 0.95, 50));
      }

      lastRenderTimeRef.current = timestamp;
    }

    drawGame(ctx);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [drawGame, gameOver, isPaused, moveSnake, score, speed, gameMode, highScores]);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE + 40;

    resetGame();
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [handleKeyPress, resetGame]);

  return (
    <div style={{ 
      display: 'flex', 
      gap: '40px',
      padding: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      {/* Game Area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <canvas
          ref={canvasRef}
          style={{
            border: '3px solid #ccc',
            borderRadius: '10px',
            backgroundColor: colorScheme.background,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />

        {(gameOver || isPaused) && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}>
            <h2 style={{ margin: '0 0 20px 0' }}>{gameOver ? 'Game Over!' : 'Paused'}</h2>
            <p style={{ fontSize: '20px', margin: '10px 0' }}>Score: {score}</p>
            <p style={{ fontSize: '20px', margin: '10px 0' }}>Level: {level}</p>
            {gameOver && (
              <button
                onClick={resetGame}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                Play Again
              </button>
            )}
            <p style={{ marginTop: '20px', fontSize: '14px' }}>
              {gameOver ? 'Press R to restart' : 'Press SPACE to resume'}
            </p>
          </div>
        )}
      </div>

      {/* Controls Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '250px',
        marginTop: '40px', // Added margin to move controls down
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px',
        }}>
          <h2 style={{ margin: '0', color: '#333' }}>Game Settings</h2>
          <select 
            value={gameMode} 
            onChange={(e) => {
              setGameMode(e.target.value);
              resetGame();
            }}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <option value="classic">Classic Mode</option>
            <option value="speed">Speed Mode</option>
            <option value="walls">Wall Mode</option>
            <option value="maze">Maze Mode</option>
          </select>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <option value="green">Green Snake</option>
            <option value="blue">Blue Snake</option>
            <option value="red">Red Snake</option>
            <option value="purple">Purple Snake</option>
            <option value="rainbow">Rainbow Snake</option>
          </select>
        </div>

        <div style={{
          borderTop: '2px solid #eee',
          paddingTop: '20px',
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Controls</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '16px',
          }}>
            <p style={{ margin: 0 }}>↑ Up</p>
            <p style={{ margin: 0 }}>↓ Down</p>
            <p style={{ margin: 0 }}>← Left</p>
            <p style={{ margin: 0 }}>→ Right</p>
            <p style={{ margin: 0 }}>Space: Pause</p>
            <p style={{ margin: 0 }}>R: Restart</p>
          </div>
        </div>

        <div style={{
          borderTop: '2px solid #eee',
          paddingTop: '20px',
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Stats</h3>
          <p style={{ margin: '0 0 10px 0' }}><strong>Current Score:</strong> {score}</p>
          <p style={{ margin: '0 0 10px 0' }}><strong>Level:</strong> {level}</p>
          <p style={{ margin: '0 0 10px 0' }}><strong>High Score:</strong> {highScores[gameMode]}</p>
        </div>

        <div style={{
          backgroundColor: '#FFF9C4',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: 'auto',
        }}>
          <p style={{ 
            margin: 0, 
            color: '#FFA000',
            fontWeight: 'bold' 
          }}>
            Special gold food = 5 points!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
