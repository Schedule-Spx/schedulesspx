// Account.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Account = ({ user, weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();

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
