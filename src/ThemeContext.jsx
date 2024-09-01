// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    main: 'bg-stpius-blue',
    accent: 'bg-stpius-gold',
    text: 'text-stpius-white',
    border: 'border-stpius-gold'
  },
  // ... (rest of the themes remain the same)
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

  const adjustBrightness = (hex, percent) => {
    // ... (function remains the same)
  };

  useEffect(() => {
    const root = document.documentElement;
    const mainColor = getComputedStyle(root)
      .getPropertyValue(`--${currentTheme.main.slice(3)}`)
      .trim();
    const darkerColor = adjustBrightness(mainColor, -20);
    document.body.style.background = `linear-gradient(to bottom left, ${mainColor}, ${darkerColor})`;
  }, [currentTheme]);

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
    <ThemeContext.Provider value={{ currentTheme, changeTheme, setCustomTheme, themes }}>
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
