// ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { HexColorPicker } from "react-colorful";

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    main: 'bg-stpius-blue',
    accent: 'bg-stpius-gold',
    text: 'text-stpius-white',
    border: 'border-stpius-gold'
  },
  dark: {
    name: 'Dark',
    main: 'bg-gray-900',
    accent: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-600'
  },
  light: {
    name: 'Light',
    main: 'bg-gray-100',
    accent: 'bg-gray-300',
    text: 'text-gray-900',
    border: 'border-gray-300'
  },
  forest: {
    name: 'Forest',
    main: 'bg-green-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500'
  },
  ocean: {
    name: 'Ocean',
    main: 'bg-blue-800',
    accent: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-500'
  },
  sunset: {
    name: 'Sunset',
    main: 'bg-orange-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-red-400'
  },
  lavender: {
    name: 'Lavender',
    main: 'bg-purple-400',
    accent: 'bg-purple-200',
    text: 'text-gray-800',
    border: 'border-purple-300'
  },
  mint: {
    name: 'Mint',
    main: 'bg-green-400',
    accent: 'bg-green-200',
    text: 'text-gray-800',
    border: 'border-green-300'
  },
  cherry: {
    name: 'Cherry',
    main: 'bg-red-600',
    accent: 'bg-pink-300',
    text: 'text-white',
    border: 'border-red-400'
  },
  coffee: {
    name: 'Coffee',
    main: 'bg-yellow-900',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-yellow-700'
  },
  skyblue: {
    name: 'Sky Blue',
    main: 'bg-blue-400',
    accent: 'bg-blue-200',
    text: 'text-gray-800',
    border: 'border-blue-300'
  },
  coral: {
    name: 'Coral',
    main: 'bg-red-400',
    accent: 'bg-orange-300',
    text: 'text-white',
    border: 'border-red-300'
  },
  emerald: {
    name: 'Emerald',
    main: 'bg-green-600',
    accent: 'bg-green-400',
    text: 'text-white',
    border: 'border-green-500'
  },
  amethyst: {
    name: 'Amethyst',
    main: 'bg-purple-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-purple-500'
  },
  golden: {
    name: 'Golden',
    main: 'bg-yellow-600',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500'
  },
  silver: {
    name: 'Silver',
    main: 'bg-gray-300',
    accent: 'bg-gray-200',
    text: 'text-gray-800',
    border: 'border-gray-400'
  },
  bronze: {
    name: 'Bronze',
    main: 'bg-yellow-800',
    accent: 'bg-yellow-700',
    text: 'text-white',
    border: 'border-yellow-600'
  },
  // Holiday themes
  christmas: {
    name: 'Christmas',
    main: 'bg-red-700',
    accent: 'bg-green-600',
    text: 'text-white',
    border: 'border-yellow-300'
  },
  halloween: {
    name: 'Halloween',
    main: 'bg-orange-600',
    accent: 'bg-purple-700',
    text: 'text-white',
    border: 'border-black'
  },
  valentines: {
    name: "Valentine's Day",
    main: 'bg-pink-500',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-300'
  },
  stpatricks: {
    name: "St. Patrick's Day",
    main: 'bg-green-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-green-300'
  },
  easter: {
    name: 'Easter',
    main: 'bg-purple-400',
    accent: 'bg-yellow-300',
    text: 'text-gray-800',
    border: 'border-pink-300'
  },
  independence: {
    name: 'Independence Day',
    main: 'bg-blue-700',
    accent: 'bg-red-600',
    text: 'text-white',
    border: 'border-white'
  },
  thanksgiving: {
    name: 'Thanksgiving',
    main: 'bg-orange-700',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-brown-400'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");

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
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  useEffect(() => {
    const root = document.documentElement;

    // Assume main color is defined as a CSS variable based on the current theme
    const mainColor = getComputedStyle(root)
      .getPropertyValue(`--${currentTheme.main.slice(3)}`)
      .trim();

    const darkerColor = adjustBrightness(mainColor, -20); // Darken by 20%

    // Update the body background with a gradient
    document.body.style.background = `linear-gradient(to bottom left, ${mainColor}, ${darkerColor})`;
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themeName === 'custom') {
      setShowColorPicker(true);
    } else {
      const normalizedThemeName = themeName.toLowerCase();
      const newTheme = themes[normalizedThemeName] || themes.default;
      setCurrentTheme(newTheme);
      localStorage.setItem('theme', JSON.stringify(newTheme));
    }
  };

  const setCustomTheme = (color) => {
    const customTheme = {
      name: 'Custom',
      main: `bg-[${color}]`,
      accent: `bg-[${adjustBrightness(color, 20)}]`,
      text: 'text-white',
      border: `border-[${adjustBrightness(color, 40)}]`
    };
    setCurrentTheme(customTheme);
    localStorage.setItem('theme', JSON.stringify(customTheme));
    setShowColorPicker(false);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, setCustomTheme, themes, showColorPicker, setShowColorPicker, customColor, setCustomColor }}>
      {children}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <HexColorPicker color={customColor} onChange={setCustomColor} />
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setCustomTheme(customColor)}
            >
              Apply Custom Theme
            </button>
          </div>
        </div>
      )}
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
