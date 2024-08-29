// src/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    primary: 'bg-stpius-blue',
    secondary: 'bg-stpius-gold',
    text: 'text-stpius-white',
    border: 'border-stpius-gold'
  },
  dark: {
    name: 'Dark',
    primary: 'bg-gray-900',
    secondary: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-600'
  },
  light: {
    name: 'Light',
    primary: 'bg-gray-100',
    secondary: 'bg-gray-300',
    text: 'text-gray-900',
    border: 'border-gray-300'
  },
  forest: {
    name: 'Forest',
    primary: 'bg-green-800',
    secondary: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500'
  },
  ocean: {
    name: 'Ocean',
    primary: 'bg-blue-800',
    secondary: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-500'
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
        console.error('Error parsing saved theme:', error);
        // If parsing fails, check if it's a valid theme name
        if (themes[savedTheme]) {
          setCurrentTheme(themes[savedTheme]);
        } else {
          console.error('Invalid theme name:', savedTheme);
          localStorage.removeItem('theme');
        }
      }
    }
  }, []);

  const changeTheme = (themeName) => {
    const newTheme = themes[themeName] || themes.default;
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
