import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PeriodRenamer from '../components/PeriodRenamer';
import '../styles/carousel.css';

const Account = ({ weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const { user, isLoggedIn, reminderPreference, updateReminderPreference } = useAuth();
  const [filteredThemes, setFilteredThemes] = useState('Featured Themes');
  const [reminderEnabled, setReminderEnabled] = useState(reminderPreference);

  console.log("Account - user:", user);
  console.log("Account - isLoggedIn:", isLoggedIn());

  const themeCategories = {
    'Featured Themes': ['Default', 'Dark', 'Light', 'ValentinesDay'],
    'General Themes': ['Forest', 'Ocean', 'Sunset', 'Lavender', 'Mint', 'Cherry', 'Coffee', 'Retro',],
    'Holiday Themes': ['candycane', 'Halloween', 'ValentinesDay', 'StPatricksDay', 'Easter', 'IndependenceDay', 'Thanksgiving'],
    'People Themes': ['legoat','StJoseph', 'StPeter', /*'StPaul', */ 'StMichael', 'StTherese', 'StFrancisAssisi', 'StMary', 'StAugustine', 'StBenedict', 'StJohn', 'StClare', 'StIgnatius', /* 'StCatherine',*/ 'StThereseAvila', 'StSimon', 'StVincent', 'StLucy', 'StPatrick', 'StAnthony', 'StJames'],
     'Sports Themes': ['bills', 'braves', 'uga', 'gatech']
  };

  useEffect(() => {
    setFilteredThemes('Featured Themes');
    console.log("Account - Component mounted");
  }, []);

  const handleThemeChange = (themeName) => {
    if (themes[themeName.toLowerCase()]) {
      changeTheme(themeName.toLowerCase());
    } else {
      console.error(`Attempted to change to undefined theme: ${themeName}`);
      changeTheme('Default');
    }
  };

  const handleFilterChange = (filter) => {
    setFilteredThemes(filter);
  };

  const handleReminderToggle = () => {
    const newPreference = !reminderEnabled;
    setReminderEnabled(newPreference);
    updateReminderPreference(newPreference);
  };

  const renderThemes = () => {
    const themesToRender = filteredThemes === 'Show All' ? Object.keys(themes) : themeCategories[filteredThemes] || [];
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

    const isSelected = currentTheme.name.toLowerCase().replace(/\s+/g, '') === themeName.toLowerCase();

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
        <div className={`absolute px-2 py-1 text-center font-bold bg-opacity-70 rounded ${isSelected ? 'bg-green-500' : 'bg-black'} text-white`}>
          {theme.name}
        </div>
      </div>
    );
  };

  if (!isLoggedIn()) {
    console.log("Account - User not logged in");
    return (
      <div className={`container mx-auto mt-8 p-4 ${currentTheme.main} ${currentTheme.text}`}>
        <p className="text-center text-xl drop-shadow-md">Please log in to view your account information.</p>
      </div>
    );
  }

  console.log("Account - Rendering account information");
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
            {(user.isTeacher || user.isAdmin) && (
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Attendance Reminder</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminderEnabled}
                    onChange={handleReminderToggle}
                    className="mr-2"
                  />
                  <span>{reminderEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Period Customization section */}
        <div className="mb-8">
          <PeriodRenamer />
        </div>
        
        {/* Theme Customization section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className="text-xl font-bold mb-4 text-center">Theme Customization</h2>
          <div className="flex flex-wrap justify-center mb-4 gap-2">
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Featured Themes')}
            >
              Featured Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('General Themes')}
            >
              General Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Holiday Themes')}
            >
              Holiday Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('People Themes')}
            >
              People Themes
            </button>

             <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Sports Themes')}
            >
              Sports Themes
            </button>
             <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Show All')}
            >
              Show All
            </button>        </div>
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderThemes()}
          </TransitionGroup>
        </div>

        {/* Legal Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
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

        {/* Change Log section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-4 text-center">Change Log</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/changelog" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
            >
              View Change Log
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
