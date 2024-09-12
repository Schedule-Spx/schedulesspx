// src/components/TeacherTools/DiceRoller.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const DiceRoller = () => {
  const { currentTheme } = useTheme();
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [diceType, setDiceType] = useState(6);
  const [results, setResults] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const diceTypes = [4, 6, 8, 10, 12, 20];

  const rollDice = () => {
    setIsRolling(true);
    setShowResults(false);
    
    setTimeout(() => {
      const newResults = Array.from({ length: numberOfDice }, () =>
        Math.floor(Math.random() * diceType) + 1
      );
      setResults(newResults);
      setIsRolling(false);
      setShowResults(true);
    }, 2000); // Increased spinning animation duration
  };

  const totalSum = results.reduce((sum, result) => sum + result, 0);

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Dice Roller</h2>
      <div className="mb-4">
        <label className="block mb-2">Number of Dice:</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setNumberOfDice(num)}
              className={`${
                numberOfDice === num ? currentTheme.accent : currentTheme.button
              } ${currentTheme.buttonText} px-3 py-1 rounded`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Dice Type:</label>
        <div className="flex flex-wrap gap-2">
          {diceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setDiceType(type)}
              className={`${
                diceType === type ? currentTheme.accent : currentTheme.button
              } ${currentTheme.buttonText} px-3 py-1 rounded`}
            >
              d{type}
            </button>
          ))}
        </div>
      </div>
      <button
        className={`${currentTheme.button} ${currentTheme.buttonText} px-4 py-2 rounded text-lg font-bold`}
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      {isRolling && (
        <div className="mt-8 flex justify-center items-center h-32">
          {Array.from({ length: numberOfDice }).map((_, index) => (
            <div key={index} className="animate-spin mx-4 text-6xl">
              🎲
            </div>
          ))}
        </div>
      )}

      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Results</h3>
            <div className="mb-4">
              {results.map((result, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {result}
                </span>
              ))}
            </div>
            <p className="text-xl font-bold text-gray-800">Total: {totalSum}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowResults(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  rollDice();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Roll Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
