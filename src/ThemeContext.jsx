// src/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    main: '#012143',
    accent: '#b98827',
    text: '#ffffff',
    border: '#b98827'
  },
  dark: {
    name: 'Dark',
    main: '#1a1a1a',
    accent: '#4a5568',
    text: '#ffffff',
    border: '#4a5568'
  },
  light: {
    name: 'Light',
    main: '#f7fafc',
    accent: '#e2e8f0',
    text: '#1a202c',
    border: '#e2e8f0'
  },
  forest: {
    name: 'Forest',
    main: '#22543d',
    accent: '#48bb78',
    text: '#ffffff',
    border: '#48bb78'
  },
  ocean: {
    name: 'Ocean',
    main: '#2a4365',
    accent: '#63b3ed',
    text: '#ffffff',
    border: '#63b3ed'
  },
  // Holiday themes
  christmas: {
    name: 'Christmas',
    main: '#c53030',
    accent: '#2f855a',
    text: '#ffffff',
    border: '#fbd38d'
  },
  halloween: {
    name: 'Halloween',
    main: '#dd6b20',
    accent: '#6b46c1',
    text: '#ffffff',
    border: '#000000'
  },
  valentines: {
    name: "Valentine's Day",
    main: '#d53f8c',
    accent: '#e53e3e',
    text: '#ffffff',
    border: '#f687b3'
  },
  stpatricks: {
    name: "St. Patrick's Day",
    main: '#2f855a',
    accent: '#ecc94b',
    text: '#ffffff',
    border: '#68d391'
  },
  easter: {
    name: 'Easter',
    main: '#9f7aea',
    accent: '#faf089',
    text: '#2d3748',
    border: '#f687b3'
  },
  independence: {
    name: 'Independence Day',
    main: '#2c5282',
    accent: '#e53e3e',
    text: '#ffffff',
    border: '#ffffff'
  },
  thanksgiving: {
    name: 'Thanksgiving',
    main: '#c05621',
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
        setCurrentTheme(themes.default);
      }
    }
  }, []);

  const changeTheme = (themeName) => {
    const newTheme = themes[themeName.toLowerCase()] || themes.default;
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
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
