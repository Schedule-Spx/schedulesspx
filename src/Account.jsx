import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, themes } from './ThemeContext';

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, setCustomTheme } = useTheme();
  const [customMain, setCustomMain] = useState('');
  const [customAccent, setCustomAccent] = useState('');
  const [customText, setCustomText] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto mt-8 p-4">
        <p className={`text-center text-xl ${currentTheme.text}`}>Please log in to view your account information.</p>
      </div>
    );
  }

  const handleThemeChange = async (themeName) => {
    changeTheme(themeName.toLowerCase());
    await saveUserTheme(user.email, themes[themeName.toLowerCase()]);
  };

  const handleCustomTheme = async () => {
    if (customMain && customAccent && customText) {
      const customTheme = {
        name: 'Custom',
        main: customMain,
        accent: customAccent,
        text: customText,
        border: customAccent
      };
      setCustomTheme(customTheme);
      await saveUserTheme(user.email, customTheme);
    }
  };

  const saveUserTheme = async (email, theme) => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/user-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, theme }),
      });
      if (!response.ok) {
        throw new Error('Failed to save theme');
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <div className={`container mx-auto p-4 flex flex-col h-full ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-grow overflow-y-auto">
        <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h1 className={`text-2xl font-bold mb-6 text-center ${currentTheme.text}`}>Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Name</label>
              <p className={`${currentTheme.main} ${currentTheme.text} p-2 rounded`}>{user.name}</p>
            </div>
            <div className="mb-4">
              <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Email</label>
              <p className={`${currentTheme.main} ${currentTheme.text} p-2 rounded`}>{user.email}</p>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className={`text-xl font-bold mb-4 ${currentTheme.text}`}>Theme Customization</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {Object.entries(themes).map(([themeName, theme]) => (
              <button
                key={themeName}
                onClick={() => handleThemeChange(themeName)}
                className={`${theme.main} ${theme.accent} ${theme.text} font-bold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 flex flex-col items-center justify-center h-24`}
              >
                <div className={`w-8 h-8 rounded-full ${theme.accent} mb-2`}></div>
                {theme.name}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <h3 className={`text-lg font-bold mb-4 ${currentTheme.text}`}>Custom Theme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Main Color</label>
                <input
                  type="text"
                  placeholder="e.g., bg-red-500"
                  value={customMain}
                  onChange={(e) => setCustomMain(e.target.value)}
                  className="border rounded p-2 w-full text-gray-900"
                />
              </div>
              <div>
                <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Accent Color</label>
                <input
                  type="text"
                  placeholder="e.g., bg-blue-300"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="border rounded p-2 w-full text-gray-900"
                />
              </div>
              <div>
                <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Text Color</label>
                <input
                  type="text"
                  placeholder="e.g., text-white"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="border rounded p-2 w-full text-gray-900"
                />
              </div>
            </div>
            <button
              onClick={handleCustomTheme}
              className={`${currentTheme.main} ${currentTheme.text} font-bold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 w-full sm:w-auto`}
            >
              Apply Custom Theme
            </button>
          </div>
        </div>
      </div>

      <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-lg p-6 mt-8`}>
        <h2 className={`text-xl font-bold mb-4 ${currentTheme.text}`}>Legal Information</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link 
            to="/privacy" 
            className={`${currentTheme.main} ${currentTheme.text} font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className={`${currentTheme.main} ${currentTheme.text} font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
