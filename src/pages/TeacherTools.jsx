// src/pages/TeacherTools.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Timer from '../components/TeacherTools/Timer';
import NamePicker from '../components/TeacherTools/NamePicker';
import GameSelector from '../components/TeacherTools/GameSelector';
import DiceRoller from '../components/TeacherTools/DiceRoller';

const TeacherTools = () => {
  const { currentTheme } = useTheme();
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { name: 'Timer', component: Timer },
    { name: 'Name Picker', component: NamePicker },
    { name: 'Game Selector', component: GameSelector },
    { name: 'Dice Roller', component: DiceRoller },
  ];

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-6`}>
      <h1 className="text-3xl font-bold mb-6">Teacher Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tools.map((tool) => (
          <button
            key={tool.name}
            className={`${currentTheme.accent} ${currentTheme.text} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
            onClick={() => setActiveTool(tool.name)}
          >
            {tool.name}
          </button>
        ))}
      </div>
      <div className={`${currentTheme.accent} rounded-lg shadow-lg p-6`}>
        {activeTool ? (
          React.createElement(tools.find(tool => tool.name === activeTool).component)
        ) : (
          <p>Select a tool to get started</p>
        )}
      </div>
    </div>
  );
};

export default TeacherTools;
