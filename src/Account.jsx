import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();

  if (!user) {
    return (
      <div className={`container mx-auto mt-8 p-4 ${currentTheme.main} ${currentTheme.text}`}>
        <p className="text-center text-xl drop-shadow-md">Please log in to view your account information.</p>
      </div>
    );
  }

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
  };

  const ThemePreview = ({ themeName, theme }) => (
    <div 
      className={`w-full h-24 rounded-lg overflow-hidden shadow-md border-2 ${theme.accent} cursor-pointer transition-transform duration-200 hover:scale-105 relative`}
      onClick={() => handleThemeChange(themeName)}
    >
      <div className={`h-1/2 ${theme.main}`}></div>
      <div className="h-1/2 flex">
        <div className={`w-1/2 ${theme.accent}`}></div>
        <div className={`w-1/2 ${theme.main}`}></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-opacity-70 bg-black text-white text-center font-bold py-1">
        {theme.name}
      </div>
    </div>
  );

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
        
        {/* Theme Customization section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className="text-xl font-bold mb-4 drop-shadow-md">Theme Customization</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {Object.entries(themes).map(([themeName, theme]) => (
              <div key={themeName} className="flex flex-col items-center">
                <ThemePreview themeName={themeName} theme={theme} />
              </div>
            ))}
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
