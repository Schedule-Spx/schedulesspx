import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, themes } from './ThemeContext';
import { ChromePicker } from 'react-color';

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, setCustomTheme } = useTheme();
  const [customMain, setCustomMain] = useState('#001F3F');
  const [customAccent, setCustomAccent] = useState('#B98827');
  const [customText, setCustomText] = useState('#FFFFFF');
  const [showMainPicker, setShowMainPicker] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);
  const [showTextPicker, setShowTextPicker] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto mt-8 p-4 bg-[#001F3F] text-white">
        <p className="text-center text-xl">Please log in to view your account information.</p>
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
      main: customMain,
      accent: customAccent,
      text: customText,
      border: customAccent
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

  const ThemePreview = ({ theme }) => (
    <div className="w-full h-24 rounded-lg overflow-hidden shadow-md">
      <div className="h-1/2" style={{ backgroundColor: theme.main }}></div>
      <div className="h-1/2 flex">
        <div className="w-1/2" style={{ backgroundColor: theme.accent }}></div>
        <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: theme.main, color: theme.text }}>
          <span className="text-xs">Text</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#001F3F] text-white p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#002855] border border-[#B98827] rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <p className="bg-[#001F3F] p-2 rounded">{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <p className="bg-[#001F3F] p-2 rounded">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#002855] border border-[#B98827] rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Theme Customization</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {Object.entries(themes).map(([themeName, theme]) => (
              <div key={themeName} className="flex flex-col items-center">
                <ThemePreview theme={theme} />
                <button
                  onClick={() => handleThemeChange(themeName)}
                  className="mt-2 bg-[#001F3F] text-white font-bold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 w-full"
                >
                  {theme.name}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Custom Theme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-2">Main Color</label>
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
                <label className="block text-sm font-bold mb-2">Accent Color</label>
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
                <label className="block text-sm font-bold mb-2">Text Color</label>
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
            <div className="mt-4">
              <ThemePreview theme={{ main: customMain, accent: customAccent, text: customText }} />
            </div>
            <button
              onClick={handleCustomTheme}
              className="mt-4 bg-[#B98827] text-white font-bold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 w-full sm:w-auto"
            >
              Apply Custom Theme
            </button>
          </div>
        </div>

        <div className="bg-[#002855] border border-[#B98827] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Legal Information</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/privacy" 
              className="bg-[#001F3F] text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="bg-[#001F3F] text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
