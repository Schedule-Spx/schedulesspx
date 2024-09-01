import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './carousel.css';  // Importing the carousel CSS for animations

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [filteredThemes, setFilteredThemes] = useState('all');

  const themeCategories = {
    'General Themes': ['Default', 'Dark', 'Light', 'Forest', 'Ocean', 'Sunset', 'Lavender', 'Mint', 'Cherry', 'Coffee'],
    'Holiday Themes': ['Christmas', 'Halloween', 'Valentine\'s Day', 'St. Patrick\'s Day', 'Easter', 'Independence', 'Thanksgiving'],
    'Saint Themes': ['St. Pius X', 'Vatican', 'Papal', 'Franciscan', 'Jesuit', 'Benedictine', 'Carmelite', 'Dominican', 'Augustinian', 'Marian'],
  };

  const handleThemeChange = (themeName) => {
    if (themes[themeName.toLowerCase()]) {
      changeTheme(themeName.toLowerCase());
    } else {
      console.error(`Attempted to change to undefined theme: ${themeName}`);
    }
  };

  const handleFilterChange = (filter) => {
    setFilteredThemes(filter);
  };

  const renderThemes = () => {
    const themesToRender = filteredThemes === 'all' ? Object.keys(themes) : themeCategories[filteredThemes] || [];
    return themesToRender.map((themeName) => {
      const theme = themes[themeName.toLowerCase()];
      if (!theme) {
        console.error(`Theme not found: ${themeName}`);
        return null;
      }
      return (
        <CSSTransition key={themeName} timeout={500} classNames="fade">
          <ThemePreview key={themeName} themeName={themeName} theme={theme} />
        </CSSTransition>
      );
    });
  };

  const ThemePreview = ({ themeName, theme }) => {
    if (!theme) {
      console.error(`Attempted to render undefined theme: ${themeName}`);
      return null;
    }
    return (
      <div
        className={`w-full h-24 rounded-lg overflow-hidden shadow-md border-2 ${theme.accent} cursor-pointer transition-transform duration-200 hover:scale-105 relative flex items-center justify-center`}
        onClick={() => handleThemeChange(themeName)}
      >
        <div className={`absolute inset-x-0 top-0 h-1/2 ${theme.main}`}></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex">
          <div className={`w-1/2 ${theme.accent}`}></div>
          <div className={`w-1/2 ${theme.main}`}></div>
        </div>
        <div className="absolute px-2 py-1 text-white text-center font-bold bg-opacity-70 bg-black rounded">
          {theme.name}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className={`container mx-auto mt-8 p-4 ${currentTheme.main} ${currentTheme.text}`}>
        <p className="text-center text-xl drop-shadow-md">Please log in to view your account information.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-4`} style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
      <div className="max-w-4xl mx-auto pb-16">
        {/* Account Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h1 className="text-2xl font-bold mb-6 text-center drop-shadow-md">Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <p className={`p-2 rounded ${currentTheme.main}`}>{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <p className={`p-2 rounded ${currentTheme.main}`}>{user.email}</p>
            </div>
          </div>
        </div>
        
        {/* Theme Customization section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className="text-xl font-bold mb-4 text-center">Theme Customization</h2>
          <div className="flex justify-center mb-4">
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded mx-2`}
              onClick={() => handleFilterChange('all')}
            >
              Show All
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded mx-2`}
              onClick={() => handleFilterChange('General Themes')}
            >
              General Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded mx-2`}
              onClick={() => handleFilterChange('Holiday Themes')}
            >
              Holiday Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded mx-2`}
              onClick={() => handleFilterChange('Saint Themes')}
            >
              Saint Themes
            </button>
          </div>
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderThemes()}
          </TransitionGroup>
        </div>

        {/* Legal Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-4 text-center">Legal Information</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/privacy" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
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
