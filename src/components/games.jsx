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
    {
      id: 'tetris',
      title: 'Tetris',
      description: 'Classic Tetris Game',
      component: TetrisGame, // You'll need to import this
      props: {
        // Tetris-specific props
      }
    },
    // Add more games...
  ];
  