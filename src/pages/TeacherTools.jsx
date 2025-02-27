import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/TeacherTools/Timer';
import NamePicker from '../components/TeacherTools/NamePicker';
import GameSelector from '../components/TeacherTools/GameSelector';
import DiceRoller from '../components/TeacherTools/DiceRoller';
import GroupDivider from '@/components/TeacherTools/GroupDivider';
import { motion } from 'framer-motion';

const TeacherTools = () => {
  const { currentTheme } = useTheme();
  const [activeTool, setActiveTool] = useState(null);
  const navigate = useNavigate();

  const tools = [
    { 
      name: 'Timer', 
      component: Timer,
      icon: '⏱️',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Name Picker', 
      component: NamePicker,
      icon: '👥',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Game Selector', 
      component: GameSelector,
      icon: '🎮',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Dice Roller', 
      component: DiceRoller,
      icon: '🎲',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Group Creator', 
      component: GroupDivider,
      icon: '👥',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Board Mode', 
      action: () => navigate('/board'),
      icon: '📊',
      gradient: `${currentTheme.accent}`
    },
  ];

  return (
    <div className={`flex flex-col h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-6 max-w-4xl">
          <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-6 rounded-lg shadow-lg`}>
            {/* Header */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-bold mb-8 ${currentTheme.text} text-center`}
            >
              Teacher Tools
            </motion.h1>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tools.map((tool) => (
                <motion.button
                  key={tool.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative group overflow-hidden rounded-xl p-4
                    ${currentTheme.accent} 
                    border-2 ${currentTheme.border}
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                  `}
                  onClick={() => tool.action ? tool.action() : setActiveTool(tool.name)}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="font-semibold">{tool.name}</span>
                  </div>
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(
                          45deg,
                          transparent 25%,
                          rgba(255,255,255,0.1) 45%,
                          rgba(255,255,255,0.2) 50%,
                          rgba(255,255,255,0.1) 55%,
                          transparent 75%
                        )
                      `,
                      backgroundSize: '200% 200%',
                      animation: 'shine 8s linear infinite',
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Active Tool Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative overflow-hidden rounded-xl shadow-2xl
                ${currentTheme.accent} bg-opacity-10
                border-2 ${currentTheme.border}
                p-8
                mb-24
              `}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
                  zIndex: 1
                }}
              />

              <div className="relative z-10">
                {activeTool ? (
                  React.createElement(tools.find(tool => tool.name === activeTool && tool.component)?.component || (() => null))
                ) : (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">✨</span>
                    <p className={`text-xl ${currentTheme.text}`}>Select a tool to get started</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shine Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default TeacherTools;
