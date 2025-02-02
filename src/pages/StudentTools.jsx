import React from 'react';
import FinalGradeCalculator from '../components/StudentTools/FinalGradeCalculator';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const StudentTools = () => {
  const { currentTheme } = useTheme();

  const tools = [
    { 
      name: 'Final Grade Calculator', 
      component: FinalGradeCalculator,
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
              Student Tools
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
                {React.createElement(tools[0].component)}
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

export default StudentTools;
