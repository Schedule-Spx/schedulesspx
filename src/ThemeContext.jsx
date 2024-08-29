import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    main: '#012143',
    mainBackground: 'bg-stpius-blue', // Use Tailwind class for site background
    accent: '#b98827',
    text: '#ffffff',
    border: '#b98827'
  },
  dark: {
    name: 'Dark',
    main: '#1a1a1a',
    mainBackground: 'bg-gray-900',
    accent: '#4a5568',
    text: '#ffffff',
    border: '#4a5568'
  },
  light: {
    name: 'Light',
    main: '#f7fafc',
    mainBackground: 'bg-gray-100',
    accent: '#e2e8f0',
    text: '#1a202c',
    border: '#e2e8f0'
  },
  forest: {
    name: 'Forest',
    main: '#22543d',
    mainBackground: 'bg-green-800',
    accent: '#48bb78',
    text: '#ffffff',
    border: '#48bb78'
  },
  ocean: {
    name: 'Ocean',
    main: '#2a4365',
    mainBackground: 'bg-blue-800',
    accent: '#63b3ed',
    text: '#ffffff',
    border: '#63b3ed'
  },
  // Holiday themes with Tailwind class adjustments
  christmas: {
    name: 'Christmas',
    main: '#c53030',
    mainBackground: 'bg-red-700',
    accent: '#2f855a',
    text: '#ffffff',
    border: '#fbd38d'
  },
  halloween: {
    name: 'Halloween',
    main: '#dd6b20',
    mainBackground: 'bg-orange-600',
    accent: '#6b46c1',
    text: '#ffffff',
    border: '#000000'
  },
  valentines: {
    name: "Valentine's Day",
    main: '#d53f8c',
    mainBackground: 'bg-pink-500',
    accent: '#e53e3e',
    text: '#ffffff',
    border: '#f687b3'
  },
  stpatricks: {
    name: "St. Patrick's Day",
    main: '#2f855a',
    mainBackground: 'bg-green-600',
    accent: '#ecc94b',
    text: '#ffffff',
    border: '#68d391'
  },
  easter: {
    name: 'Easter',
    main: '#9f7aea',
    mainBackground: 'bg-purple-400',
    accent: '#faf089',
    text: '#2d3748',
    border: '#f687b3'
  },
  independence: {
    name: 'Independence Day',
    main: '#2c5282',
    mainBackground: 'bg-blue-700',
    accent: '#e53e3e',
    text: '#ffffff',
    border: '#ffffff'
  },
  thanksgiving: {
    name: 'Thanksgiving',
    main: '#c05621',
    mainBackground: 'bg-orange-700',
    accent: '#dd6b20',
    text: '#ffffff',
    border: '#744210'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      } catch (error) {
        const fallbackTheme = themes[savedTheme.toLowerCase()] || themes.default;
        setCurrentTheme(fallbackTheme);
      }
    }
  }, []);

  const changeTheme = (themeName) => {
    const normalizedThemeName = themeName.toLowerCase();
    const newTheme = themes[normalizedThemeName] || themes.default;
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const setCustomTheme = (customTheme) => {
    setCurrentTheme(customTheme);
    localStorage.setItem('theme', JSON.stringify(customTheme));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
