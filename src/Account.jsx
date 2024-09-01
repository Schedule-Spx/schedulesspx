// Account.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { ChromePicker } from 'react-color';

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, setCustomTheme, themes } = useTheme();
  const [customMain, setCustomMain] = useState('#001F3F');
  const [customAccent, setCustomAccent] = useState('#B98827');
  const [customText, setCustomText] = useState('#FFFFFF');
  const [showMainPicker, setShowMainPicker] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);
  const [showTextPicker, setShowTextPicker] = useState(false);

  useEffect(() => {
    if (currentTheme.name === 'Custom') {
      setCustomMain(currentTheme.main);
      setCustomAccent(currentTheme.accent);
      setCustomText(currentTheme.text);
    }
  }, [currentTheme]);

  if (!user) {
    return (
      <div className="container mx-auto mt-8 p-4 bg-[#001F3F] text-white">
        <p className="text-center text-xl">Please log in to view your account information.</p>
      </div>
    );
  }

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
  };

  const handleCustomTheme = () => {
    const customTheme = {
      name: 'Custom',
      main: customMain,
      accent: customAccent,
      text: customText,
      border: customAccent
    };
    setCustomTheme(customTheme);
  };

  const ThemePreview = ({ theme }) => (
    <div className="w-full h-24 rounded-lg overflow-hidden shadow-md">
      <div className={`h-1/2 ${theme.main}`}></div>
      <div className="h-1/2 flex">
        <div className={`w-1/2 ${theme.accent}`}></div>
        <div className={`w-1/2 ${theme.main}`}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#001F3F] text-white p-4" style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
      <div className="max-w-4xl mx-auto pb-16">
        {/* Account Information section */}
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
        
        {/* Theme Customization section */}
        <div className="bg-[#002855] border border-[#B98827] rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Theme Customization</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {Object.entries(themes).map(([themeName, theme]) => (
              <div key={themeName} className="flex flex-col items-center">
                <ThemePreview theme={theme} />
                <button
                  onClick={() => handleThemeChange(themeName)}
                  className={`mt-2 bg-[#001F3F] text-white font-bold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 w-full ${currentTheme.name === themeName ? 'ring-2 ring-[#B98827]' : ''}`}
                >
                  {theme.name}
                </button>
              </div>
            ))}
          </div>
          
          {/* Custom Theme section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Custom Theme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {/* Color pickers */}
              {/* ... (color picker code remains the same) */}
            </div>
            <div className="mt-4">
              <ThemePreview theme={{ main: `bg-[${customMain}]`, accent: `bg-[${customAccent}]`, text: `text-[${customText}]` }} />
            </div>
            <button
              onClick={handleCustomTheme}
              className={`mt-4 bg-[#B98827] text-white font-bold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 w-full sm:w-auto ${currentTheme.name === 'Custom' ? 'ring-2 ring-white' : ''}`}
            >
              Apply Custom Theme
            </button>
          </div>
        </div>

        {/* Legal Information section */}
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
