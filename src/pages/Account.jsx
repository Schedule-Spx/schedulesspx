import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PeriodRenamer from '../components/PeriodRenamer';
import logger from '../utils/logger';
import '../styles/carousel.css';

// Faculty ban emails (keep in sync with AuthContext)
const FACULTY_BAN_EMAILS = new Set([
  'kagenmjensen@me.com'
]);

// Faculty emails that are exempt from the ban (keep in sync with AuthContext)
const FACULTY_EXEMPT_EMAILS = new Set([
  'lfarrell@spx.org',
  'mlawson@spx.org'
]);

const Account = ({ weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const { user, isLoggedIn, reminderPreference, updateReminderPreference, getBanStatus } = useAuth();
  const [filteredThemes, setFilteredThemes] = useState('Featured Themes');
  const [reminderEnabled, setReminderEnabled] = useState(reminderPreference || false); // Add default value to prevent undefined
  const [showThemeFormModal, setShowThemeFormModal] = useState(false);
  const navigate = useNavigate();
  
  // Remove excessive console logs
  logger.debug("Account - Component initialized", { isLoggedIn: isLoggedIn() });
  
  const themeCategories = {
    'Featured Themes': ['Default', 'Dark', 'Light', 'ValentinesDay', 'Cat'],
    'General Themes': ['Forest', 'Ocean', 'Sunset', 'Lavender', 'Mint', 'Cherry', 'Coffee', 'Retro'],
    'Holiday Themes': ['candycane', 'Halloween', 'ValentinesDay', 'StPatricksDay', 'Easter', 'IndependenceDay', 'Thanksgiving'],
    'People Themes': ['legoat', 'ashleytwiner', 'mary brewster', 'StJoseph', 'StPeter', /*'StPaul', */ 'StMichael', 'StTherese', 'StFrancisAssisi', 'StMary', 'StAugustine', 'StBenedict', 'StJohn', 'StClare', 'StIgnatius', /* 'StCatherine',*/ 'StThereseAvila', 'StSimon', 'StVincent', 'StLucy', 'StPatrick', 'StAnthony', 'StJames'],
    'Sports Themes': ['bills', 'braves', 'uga', 'gatech'],
    'Premium Themes': ['Cat'] // Section for purchased/premium themes
  };
  
  useEffect(() => {
    setFilteredThemes('Featured Themes');
    logger.debug("Account - Component mounted");
    
    // Check if user is banned and redirect if needed - using navigate for smoother transitions
    const { isBanned, type } = getBanStatus();
    
    if (isBanned) {
      if (type === 'faculty') {
        navigate('/facultyban', { replace: true });
      } else {
        navigate('/banned', { replace: true });
      }
    }
  }, [user, navigate, getBanStatus]);
  
  const handleThemeChange = (themeName) => {
    if (themes[themeName.toLowerCase()]) {
      changeTheme(themeName.toLowerCase());
    } else {
      logger.error(new Error(`Theme not found: ${themeName}`), { availableThemes: Object.keys(themes) });
      changeTheme('Default');
    }
  };
  
  const handleFilterChange = (filter) => {
    setFilteredThemes(filter);
  };
  
  const handleReminderToggle = () => {
    const newPreference = !reminderEnabled;
    setReminderEnabled(newPreference);
    if (typeof updateReminderPreference === 'function') {
      updateReminderPreference(newPreference);
    }
  };
  
  const renderThemes = () => {
    const themesToRender = filteredThemes === 'Show All' ? Object.keys(themes) : themeCategories[filteredThemes] || [];
    return themesToRender.map((themeName) => {
      const theme = themes[themeName.toLowerCase()];
      if (!theme) {
        logger.error(new Error(`Theme not found: ${themeName}`), { availableThemes: Object.keys(themes) });
        return null;
      }
      return (
        <CSSTransition key={themeName} timeout={500} classNames="fade">
          <ThemePreview themeName={themeName} theme={theme} />
        </CSSTransition>
      );
    });
  };
  
  // Enhanced ThemePreview component to display new theme properties
  const ThemePreview = ({ themeName, theme }) => {
    if (!theme) {
      logger.error(new Error(`Attempted to render undefined theme`), { themeName });
      return null;
    }
    
    // Safely check if currentTheme has a name property
    const isSelected = currentTheme && currentTheme.name && 
      currentTheme.name.toLowerCase().replace(/\s+/g, '') === themeName.toLowerCase();
    const isPremium = themeCategories['Premium Themes'].includes(themeName);
    
    return (
      <div
        className={`w-full h-32 ${theme.cardStyle} overflow-hidden border-2 ${theme.accent} cursor-pointer 
                   transition-transform duration-200 hover:scale-105 relative flex items-center justify-center 
                   ${theme.animation}`}
        onClick={() => handleThemeChange(themeName)}
      >
        <div className={`absolute inset-x-0 top-0 h-1/2 ${theme.main} ${theme.backgroundPattern}`}></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex">
          <div className={`w-1/2 ${theme.accent}`}></div>
          <div className={`w-1/2 ${theme.main}`}></div>
        </div>
        <div className={`absolute px-2 py-1 text-center font-bold ${theme.fontFamily} bg-opacity-80 ${theme.buttonStyle} 
                        ${isSelected ? 'bg-green-500' : 'bg-black'} text-white flex flex-col items-center`}>
          <span>{theme.name}</span>
          {isPremium && (
            <span className="text-xs bg-yellow-500 px-1 rounded-full text-black mt-1">Premium</span>
          )}
        </div>
      </div>
    );
  };
  
  // Replace Google Form iframe with a direct link since iframes are blocked by CSP
  const ThemeFormModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${currentTheme.main} ${currentTheme.text} p-6 ${currentTheme.cardStyle} max-w-2xl w-full max-h-[90vh] overflow-auto`}>
        <h2 className={`text-2xl font-bold mb-4 text-center ${currentTheme.fontFamily}`}>Custom Theme Request</h2>
        <p className="mb-4">
          Want a personalized theme on Schedule SPX? Good news! You can purchase a theme tailored to your preferences:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>A theme for general use costs $10</li>
          <li>A theme for your exclusive use is $15</li>
        </ul>
        <p className="mb-4">
          Funds raised from these themes will help cover the website's operating costs to date.
          Please note that all payments must be made in cash only.
        </p>
        
        {/* Replace iframe with a direct link to avoid CSP issues */}
        <div className="mb-6 text-center">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScuxBD9LYMWMr-AuBfT6ENPvCYn3AmgF-nkOVWIc9BzjfyQzA/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${currentTheme.accent} text-white font-bold py-3 px-6 ${currentTheme.buttonStyle} block w-full sm:w-auto mx-auto ${currentTheme.animation}`}
          >
            Open Theme Request Form
          </a>
          <p className="mt-2 text-sm">
            The form will open in a new tab
          </p>
        </div>
        
        <div className="flex justify-end">
          <button 
            className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} hover:opacity-80 ${currentTheme.animation}`}
            onClick={() => setShowThemeFormModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
  
  if (!isLoggedIn()) {
    logger.debug("Account - User not logged in");
    return (
      <div className={`container mx-auto mt-8 p-4 ${currentTheme.main} ${currentTheme.text} ${currentTheme.backgroundPattern}`}>
        <p className={`text-center text-xl drop-shadow-md ${currentTheme.fontFamily}`}>Please log in to view your account information.</p>
      </div>
    );
  }
  
  // Additional ban check before rendering content
  const { isBanned } = getBanStatus();
  if (isBanned) {
    return null; // Return nothing as we're handling the redirect in useEffect
  }
  
  // Change Log section - fixing the syntax errors in the JSX
  const renderChangeLogSection = () => (
    <div className={`${currentTheme.main} border ${currentTheme.border} ${currentTheme.cardStyle} p-6`}>
      <h2 className={`text-xl font-bold mb-4 text-center ${currentTheme.fontFamily}`}>Change Log</h2>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <Link 
          to="/changelog" 
          className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200 ${currentTheme.animation}`}
        >
          View Change Log
        </Link>
      </div>
    </div>
  );
  
  logger.debug("Account - Rendering account information");
  return (
    <div 
      className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-4 ${currentTheme.backgroundPattern}`} 
      style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}
    >
      {showThemeFormModal && <ThemeFormModal />}
      
      <div className="max-w-4xl mx-auto pb-16">
        {/* Account Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} ${currentTheme.cardStyle} p-6 mb-8`}>
          <h1 className={`text-2xl font-bold mb-6 text-center drop-shadow-md ${currentTheme.fontFamily}`}>Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className={`block text-sm font-bold mb-2 ${currentTheme.fontFamily}`}>Name</label>
              <p className={`p-2 rounded ${currentTheme.main}`}>{user?.name || 'Not available'}</p>
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-bold mb-2 ${currentTheme.fontFamily}`}>Email</label>
              <p className={`p-2 rounded ${currentTheme.main}`}>{user?.email || 'Not available'}</p>
            </div>
            {(user?.isTeacher || user?.isAdmin) && (
              <div className="mb-4">
                <label className={`block text-sm font-bold mb-2 ${currentTheme.fontFamily}`}>Attendance Reminder</label>
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
        <div className={`${currentTheme.main} border ${currentTheme.border} ${currentTheme.cardStyle} p-6 mb-8`}>
          <h2 className={`text-xl font-bold mb-4 text-center ${currentTheme.fontFamily}`}>Theme Customization</h2>
          
          {/* Request Custom Theme button */}
          <div className="mb-6 text-center">
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-6 ${currentTheme.buttonStyle} ${currentTheme.animation} hover:opacity-90 transition-opacity`}
              onClick={() => setShowThemeFormModal(true)}
            >
              Request Custom Theme 🎨
            </button>
            <p className="mt-2 text-sm opacity-80">
              Support the site! Get your own custom theme for $10-$15
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-4 gap-2">
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('Featured Themes')}
            >
              Featured Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('Premium Themes')}
            >
              Premium Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('General Themes')}
            >
              General Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('Holiday Themes')}
            >
              Holiday Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('People Themes')}
            >
              People Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('Sports Themes')}
            >
              Sports Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} ${currentTheme.animation}`}
              onClick={() => handleFilterChange('Show All')}
            >
              Show All
            </button>
          </div>
          
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderThemes()}
          </TransitionGroup>
        </div>
        
        {/* Legal Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} ${currentTheme.cardStyle} p-6 mb-8`}>
          <h2 className={`text-xl font-bold mb-4 text-center ${currentTheme.fontFamily}`}>Legal Information</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/privacy" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} mb-2 sm:mb-0 w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200 ${currentTheme.animation}`}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 ${currentTheme.buttonStyle} w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200 ${currentTheme.animation}`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
        
        {/* Change Log section - Fixed version */}
        {renderChangeLogSection()}
      </div>
    </div>
  );
};

export default Account;
