// src/components/TeacherTools/GameSelector.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const games = [
  { name: 'Kahoot!', url: 'https://kahoot.com/' },
  { name: 'Quizizz', url: 'https://quizizz.com/' },
  { name: 'Quizlet', url: 'https://quizlet.com/' },
  { name: 'Blooket', url: 'https://www.blooket.com/' },
  { name: 'Gimkit', url: 'https://www.gimkit.com/' },
];

const GameSelector = () => {
  const { currentTheme } = useTheme();
  const [selectedGame, setSelectedGame] = useState(null);

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGame(games[randomIndex]);
  };

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Random Game Selector</h2>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleRandomSelect}
          className={`${currentTheme.accent} ${currentTheme.text} px-6 py-3 text-lg font-semibold rounded-lg hover:opacity-80 transition-opacity duration-200 shadow-md`}
        >
          Choose Random Game
        </button>
      </div>
      {selectedGame && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4 transform transition-all duration-300 ease-in-out">
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Selected Game:</h3>
          <a 
            href={selectedGame.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 text-3xl font-bold block mb-4"
          >
            {selectedGame.name}
          </a>
          <p className="text-gray-700 text-lg">
            Click the game name above to visit its website and start playing!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameSelector;
