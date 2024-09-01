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
  },
  stpiusx: {
    name: 'St. Pius X',
    main: 'bg-[#001F3F]', // Navy Blue
    accent: 'bg-[#B98827]', // Gold
    text: 'text-white',
    border: 'border-[#B98827]'
  },
  vatican: {
    name: 'Vatican',
    main: 'bg-yellow-300',
    accent: 'bg-white',
    text: 'text-gray-900',
    border: 'border-yellow-400'
  },
  papal: {
    name: 'Papal',
    main: 'bg-white',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500'
  },
  franciscan: {
    name: 'Franciscan',
    main: 'bg-brown-600',
    accent: 'bg-gray-300',
    text: 'text-white',
    border: 'border-brown-400'
  },
  jesuit: {
    name: 'Jesuit',
    main: 'bg-black',
    accent: 'bg-gray-700',
    text: 'text-white',
    border: 'border-gray-600'
  },
  benedictine: {
    name: 'Benedictine',
    main: 'bg-black',
    accent: 'bg-red-700',
    text: 'text-white',
    border: 'border-red-600'
  },
  carmelite: {
    name: 'Carmelite',
    main: 'bg-brown-800',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-brown-600'
  },
  dominican: {
    name: 'Dominican',
    main: 'bg-white',
    accent: 'bg-black',
    text: 'text-gray-900',
    border: 'border-gray-400'
  },
  augustinian: {
    name: 'Augustinian',
    main: 'bg-black',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-gray-300'
  },
  marian: {
    name: 'Marian',
    main: 'bg-blue-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-300'
  },
  popefrancis: {
    name: 'Pope Francis',
    main: 'bg-white',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500'
  },
  popejohnpaul2: {
    name: 'Pope John Paul II',
    main: 'bg-red-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-yellow-400'
  },
  popebenedictxvi: {
    name: 'Pope Benedict XVI',
    main: 'bg-red-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500'
  },
  popeleoxiii: {
    name: 'Pope Leo XIII',
    main: 'bg-blue-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500'
  },
  popepius10: {
    name: 'Pope Pius X',
    main: 'bg-white',
    accent: 'bg-red-600',
    text: 'text-gray-900',
    border: 'border-red-500'
  },
  catholicchurch: {
    name: 'Catholic Church',
    main: 'bg-purple-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500'
  },
  holyspirit: {
    name: 'Holy Spirit',
    main: 'bg-red-500',
    accent: 'bg-yellow-300',
    text: 'text-white',
    border: 'border-yellow-400'
  },
  eucharist: {
    name: 'Eucharist',
    main: 'bg-white',
    accent: 'bg-yellow-500',
    text: 'text-gray-900',
    border: 'border-yellow-600'
  },
  rosary: {
    name: 'Rosary',
    main: 'bg-blue-600',
    accent: 'bg-pink-300',
    text: 'text-white',
    border: 'border-pink-400'
  },
  advent: {
    name: 'Advent',
    main: 'bg-purple-600',
    accent: 'bg-pink-400',
    text: 'text-white',
    border: 'border-pink-500'
  },
  lent: {
    name: 'Lent',
    main: 'bg-purple-800',
    accent: 'bg-gray-400',
    text: 'text-white',
    border: 'border-gray-500'
  },
  holyweek: {
    name: 'Holy Week',
    main: 'bg-red-800',
    accent: 'bg-purple-600',
    text: 'text-white',
    border: 'border-purple-500'
  },
  pentecost: {
    name: 'Pentecost',
    main: 'bg-red-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500'
  },
  allsaints: {
    name: 'All Saints',
    main: 'bg-yellow-300',
    accent: 'bg-white',
    text: 'text-gray-900',
    border: 'border-yellow-400'
  },
  immaculateconception: {
    name: 'Immaculate Conception',
    main: 'bg-blue-500',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-300'
  },
  sacredheart: {
    name: 'Sacred Heart',
    main: 'bg-red-700',
    accent: 'bg-yellow-300',
    text: 'text-white',
    border: 'border-yellow-400'
  },

  laborDay: {
    name: 'Labor Day',
    main: 'bg-blue-700',
    accent: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-600', // Make sure there's a comma here
  },
  
  
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
    const normalizedThemeName = themeName.toLowerCase();
    const newTheme = themes[normalizedThemeName] || themes.default;
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
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
