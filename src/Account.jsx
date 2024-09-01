import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './carousel.css';  // Importing the carousel CSS for animations

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [filteredThemes, setFilteredThemes] = useState('all');

  const themeCategories = {
    'General Themes': ['Forest', 'Ocean', 'Sunset', 'Lavender', 'Mint', 'Cherry', 'Coffee'],
    'Holiday Themes': ['Christmas', 'Halloween', 'Valentine\'s Day', 'St. Patrick\'s Day', 'Easter', 'Independence Day', 'Thanksgiving'],
    'Saint Themes': ['St. Pius X', 'Vatican', 'Papal', 'Franciscan', 'Jesuit', 'Benedictine', 'Carmelite', 'Dominican', 'Augustinian', 'Marian'],
  };

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
  };

  const handleFilterChange = (filter) => {
    setFilteredThemes(filter);
  };

  const renderThemes = () => {
    const themesToRender = filteredThemes === 'all' ? Object.keys(themes) : themeCategories[filteredThemes] || [];
    return themesToRender.map((themeName, index) => {
      const theme = themes[themeName];
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
              <label className="block text-sm font-bold mb-2 drop-shadow-md">Name</label>
              <p className={`${currentTheme.main} p-2 rounded drop-shadow-md`}>{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 drop-shadow-md">Email</label>
              <p className={`${currentTheme.main} p-2 rounded drop-shadow-md`}>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Featured Themes */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-4 drop-shadow-md">Featured Themes</h2>
          <div className="flex justify-center space-x-4">
            <ThemePreview themeName="Default" theme={themes.Default} />
            <ThemePreview themeName="Dark" theme={themes.Dark} />
            <ThemePreview themeName="Light" theme={themes.Light} />
          </div>
        </div>

        {/* Theme Filters */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-4 drop-shadow-md">Theme Customization</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text} hover:bg-opacity-80 transition`}
            >
              Show All
            </button>
            <button
              onClick={() => handleFilterChange('General Themes')}
              className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text} hover:bg-opacity-80 transition`}
            >
              General Themes
            </button>
            <button
              onClick={() => handleFilterChange('Holiday Themes')}
              className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text} hover:bg-opacity-80 transition`}
            >
              Holiday Themes
            </button>
            <button
              onClick={() => handleFilterChange('Saint Themes')}
              className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text} hover:bg-opacity-80 transition`}
            >
              Saint Themes
            </button>
          </div>
        </div>

        {/* Carousel of Themes */}
        <div className="theme-carousel">
          <TransitionGroup className="carousel-items">
            {renderThemes()}
          </TransitionGroup>
          {/* Carousel Navigation Arrows */}
          <div className="carousel-controls">
            <button className="carousel-prev">&lt;</button>
            <button className="carousel-next">&gt;</button>
          </div>
        </div>

        {/* Legal Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-4 drop-shadow-md">Legal Information</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/privacy" 
              className={`${currentTheme.accent} ${currentTheme.text} font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200 drop-shadow-md`}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className={`${currentTheme.accent} ${currentTheme.text} font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200 drop-shadow-md`}
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
