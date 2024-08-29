import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, themes } from './ThemeContext';
import { ChromePicker } from 'react-color';

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, setCustomTheme } = useTheme();
  const [customMain, setCustomMain] = useState('#000000');
  const [customAccent, setCustomAccent] = useState('#000000');
  const [customText, setCustomText] = useState('#ffffff');
  const [showMainPicker, setShowMainPicker] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);
  const [showTextPicker, setShowTextPicker] = useState(false);

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
    const customTheme = {
      name: 'Custom',
      main: `bg-[${customMain}]`,
      accent: `bg-[${customAccent}]`,
      text: `text-[${customText}]`,
      border: `border-[${customAccent}]`
    };
    setCustomTheme(customTheme);
    await saveUserTheme(user.email, customTheme);
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
        {/* Account Information section remains unchanged */}
        
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
                <div className="relative">
                  <button
                    onClick={() => setShowMainPicker(!showMainPicker)}
                    className="w-full h-10 rounded border"
                    style={{ backgroundColor: customMain }}
                  />
                  {showMainPicker && (
                    <div className="absolute z-10 mt-2">
                      <ChromePicker
                        color={customMain}
                        onChange={(color) => setCustomMain(color.hex)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Accent Color</label>
                <div className="relative">
                  <button
                    onClick={() => setShowAccentPicker(!showAccentPicker)}
                    className="w-full h-10 rounded border"
                    style={{ backgroundColor: customAccent }}
                  />
                  {showAccentPicker && (
                    <div className="absolute z-10 mt-2">
                      <ChromePicker
                        color={customAccent}
                        onChange={(color) => setCustomAccent(color.hex)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className={`block ${currentTheme.text} text-sm font-bold mb-2`}>Text Color</label>
                <div className="relative">
                  <button
                    onClick={() => setShowTextPicker(!showTextPicker)}
                    className="w-full h-10 rounded border"
                    style={{ backgroundColor: customText }}
                  />
                  {showTextPicker && (
                    <div className="absolute z-10 mt-2">
                      <ChromePicker
                        color={customText}
                        onChange={(color) => setCustomText(color.hex)}
                      />
                    </div>
                  )}
                </div>
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

      {/* Legal Information section remains unchanged */}
    </div>
  );
};

export default Account;
