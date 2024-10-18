import React, { useEffect, useState } from 'react';

const SnakeGame = () => {
  // Define a set color scheme
  const colorScheme = {
    snake: '#248ec2',        // Color for the snake
    food: '#eb5e28',         // Color for the food
    background: '#ebebeb',   // Background color
    gameOverText: 'red',     // Game over text color
  };

  // Game settings
  const initialSnake = [{ x: 0, y: 0 }];
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Game controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        // Check for collisions with food
        if (head.x === food.x && head.y === food.y) {
          newSnake.unshift(head);
          setFood(generateFood());
        } else {
          newSnake.unshift(head);
          newSnake.pop();
        }

        // Check for collisions with walls or self
        if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20 || newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver]);

  // Generate random food position
  function generateFood() {
    return {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  }

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px', backgroundColor: colorScheme.background }}>
      {snake.map((segment, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: `${segment.x * 20}px`,
          top: `${segment.y * 20}px`,
          width: '20px',
          height: '20px',
          backgroundColor: colorScheme.snake,
        }} />
      ))}
      <div style={{
        position: 'absolute',
        left: `${food.x * 20}px`,
        top: `${food.y * 20}px`,
        width: '20px',
        height: '20px',
        backgroundColor: colorScheme.food,
      }} />
      {gameOver && <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: colorScheme.gameOverText,
        fontSize: '24px',
      }}>Game Over</div>}
    </div>
  );
};

export default SnakeGame;
