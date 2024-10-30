import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PeriodCustomization = ({ initialPeriods, handleSave }) => {
  const { currentTheme } = useTheme();
  const [periods, setPeriods] = useState(initialPeriods || {});
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Update periods when initialPeriods changes
  useEffect(() => {
    if (initialPeriods) {
      setPeriods(initialPeriods);
    }
  }, [initialPeriods]);

  const handleInputChange = (periodKey, value) => {
    setPeriods(prev => ({
      ...prev,
      [periodKey]: value
    }));
  };

  const handleSaveClick = () => {
    try {
      setSaveStatus('saving');
      handleSave(periods);
      setSaveStatus('saved');
      setIsEditing(false);
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('Error saving period names:', error);
      setSaveStatus('error');
    }
  };

  const handleReset = () => {
    setPeriods({
      period1: 'Period 1',
      period2: 'Period 2',
      period3: 'Period 3',
      period4: 'Period 4',
      period5: 'Period 5',
      period6: 'Period 6',
      period7: 'Period 7',
      period8: 'Period 8'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-xl p-6 
        ${currentTheme.accent} bg-opacity-10
        border-2 ${currentTheme.border}
        relative overflow-hidden
      `}
    >
      {/* Shine Effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              45deg,
              transparent 25%,
              ${currentTheme.accent}15 45%,
              ${currentTheme.accent}30 50%,
              ${currentTheme.accent}15 55%,
              transparent 75%
            )
          `,
          backgroundSize: '200% 200%',
          animation: 'shine 8s linear infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
            Customize Period Names
          </h2>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className={`
                px-4 py-2 rounded-lg
                ${currentTheme.accent} ${currentTheme.text}
                hover:opacity-80 transition-opacity
              `}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </motion.button>
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className={`
                  px-4 py-2 rounded-lg
                  bg-red-500 text-white
                  hover:opacity-80 transition-opacity
                `}
              >
                Reset
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(periods).map(([periodKey, periodName]) => (
            <div key={periodKey} className="relative">
              <label
                className={`block text-sm font-medium mb-1 ${currentTheme.text}`}
                htmlFor={periodKey}
              >
                {periodKey.charAt(0).toUpperCase() + periodKey.slice(1)}
              </label>
              <input
                type="text"
                id={periodKey}
                value={periodName}
                onChange={(e) => handleInputChange(periodKey, e.target.value)}
                disabled={!isEditing}
                placeholder={`Enter ${periodKey} name`}
                className={`
                  w-full px-3 py-2 rounded-lg
                  ${currentTheme.main} ${currentTheme.text}
                  border ${currentTheme.border}
                  focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                `}
                maxLength={20}
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveClick}
              className={`
                px-6 py-2 rounded-lg
                bg-green-500 text-white
                hover:opacity-80 transition-opacity
                flex items-center space-x-2
              `}
            >
              <span>Save Changes</span>
              {saveStatus === 'saving' && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Status Messages */}
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-3 rounded-lg text-center
              ${saveStatus === 'saved' ? 'bg-green-500' : 'bg-red-500'}
              text-white
            `}
          >
            {saveStatus === 'saved' ? 'Changes saved successfully!' : 'Error saving changes'}
          </motion.div>
        )}
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default PeriodCustomization;
