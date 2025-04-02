import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';

// Create context
const ThemeContext = createContext();

// Optimize theme definitions with enhanced properties
export const themes = {
  default: {
    name: 'Default',
    main: 'bg-stpius-blue',
    accent: 'bg-stpius-gold',
    text: 'text-stpius-white',
    border: 'border-stpius-gold',
    // New properties for enhanced customization
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  dark: {
    name: 'Dark',
    main: 'bg-gray-900',
    accent: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  // Add a new cat theme as an example
  cat: {
    name: 'Cat Theme',
    main: 'bg-amber-100',
    accent: 'bg-amber-500',
    text: 'text-gray-800',
    border: 'border-amber-400',
    fontFamily: 'font-comic',
    buttonStyle: 'rounded-full',
    cardStyle: 'shadow-lg rounded-2xl border-2',
    animation: 'hover:animate-bounce',
    backgroundPattern: 'bg-[url("/src/assets/cat-pattern.png")] bg-repeat bg-opacity-10',
    customCursor: 'cursor-[url("/src/assets/cat-cursor.png"),auto]',
  },
  // ...existing themes with updated properties
  // For brevity, I'm not showing all themes but you would update each one
  forest: {
    name: 'Forest',
    main: 'bg-green-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  ocean: {
    name: 'Ocean',
    main: 'bg-blue-800',
    accent: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  sunset: {
    name: 'Sunset',
    main: 'bg-orange-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-red-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  lavender: {
    name: 'Lavender',
    main: 'bg-purple-400',
    accent: 'bg-purple-200',
    text: 'text-gray-800',
    border: 'border-purple-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  mint: {
    name: 'Mint',
    main: 'bg-green-400',
    accent: 'bg-green-200',
    text: 'text-gray-800',
    border: 'border-green-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  cherry: {
    name: 'Cherry',
    main: 'bg-red-600',
    accent: 'bg-pink-300',
    text: 'text-white',
    border: 'border-red-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  coffee: {
    name: 'Coffee',
    main: 'bg-yellow-900',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-yellow-700',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  retro: {
    name: 'Retro',
    main: 'bg-[#403D39]', 
    accent: 'bg-[#EB5E28]', 
    text: 'text-[#FFFCF2]', 
    border: 'border-[#CCC5B9]', 
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  skyblue: {
    name: 'Sky Blue',
    main: 'bg-blue-400',
    accent: 'bg-blue-200',
    text: 'text-gray-800',
    border: 'border-blue-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  coral: {
    name: 'Coral',
    main: 'bg-red-400',
    accent: 'bg-orange-300',
    text: 'text-white',
    border: 'border-red-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  emerald: {
    name: 'Emerald',
    main: 'bg-green-600',
    accent: 'bg-green-400',
    text: 'text-white',
    border: 'border-green-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  amethyst: {
    name: 'Amethyst',
    main: 'bg-purple-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-purple-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  golden: {
    name: 'Golden',
    main: 'bg-yellow-600',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  silver: {
    name: 'Silver',
    main: 'bg-gray-300',
    accent: 'bg-gray-200',
    text: 'text-gray-800',
    border: 'border-gray-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  bronze: {
    name: 'Bronze',
    main: 'bg-yellow-800',
    accent: 'bg-yellow-700',
    text: 'text-white',
    border: 'border-yellow-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  candycane: {
  name: 'Candy Cane',
  main: 'bg-[#FFFAF0]', 
  accent: 'bg-[#FF3B3F]', 
  text: 'text-[#2C2C2C]', 
  border: 'border-[#FF3B3F]', 
  fontFamily: 'font-sans',
  buttonStyle: 'rounded',
  cardStyle: 'shadow-lg rounded-lg',
  animation: '',
  backgroundPattern: '',
  customCursor: '',
},
  halloween: {
    name: 'Halloween',
    main: 'bg-orange-600',
    accent: 'bg-purple-700',
    text: 'text-white',
    border: 'border-black',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  valentinesday: {
    name: "Valentine's Day",
    main: 'bg-pink-500',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stpatricksday: {
    name: "St. Patrick's Day",
    main: 'bg-green-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-green-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  easter: {
    name: 'Easter',
    main: 'bg-purple-400',
    accent: 'bg-yellow-300',
    text: 'text-gray-800',
    border: 'border-pink-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  independenceday: {
    name: 'Independence Day',
    main: 'bg-blue-700',
    accent: 'bg-red-600',
    text: 'text-white',
    border: 'border-white',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  thanksgiving: {
    name: 'Thanksgiving',
    main: 'bg-orange-700',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-brown-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  laborday: {
    name: 'Labor Day',
    main: 'bg-blue-500',
    accent: 'bg-red-500',
    text: 'text-white',
    border: 'border-white',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stpiusx: {
    name: 'St. Pius X',
    main: 'bg-[#001F3F]', // Navy Blue
    accent: 'bg-[#B98827]', // Gold
    text: 'text-white',
    border: 'border-[#B98827]',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  popefrancis: {
    name: 'Pope Francis',
    main: 'bg-white',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  popejohnpaulii: {
    name: 'Pope John Paul II',
    main: 'bg-red-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-yellow-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  popebenedictxvi: {
    name: 'Pope Benedict XVI',
    main: 'bg-red-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  popeleoxiii: {
    name: 'Pope Leo XIII',
    main: 'bg-blue-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  poepiusx: {
    name: 'Pope Pius X',
    main: 'bg-white',
    accent: 'bg-red-600',
    text: 'text-gray-900',
    border: 'border-red-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  allsaints: {
    name: 'All Saints',
    main: 'bg-yellow-300',
    accent: 'bg-white',
    text: 'text-gray-900',
    border: 'border-yellow-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  immaculateconception: {
    name: 'Immaculate Conception',
    main: 'bg-blue-500',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  sacredheart: {
    name: 'Sacred Heart',
    main: 'bg-red-700',
    accent: 'bg-yellow-300',
    text: 'text-white',
    border: 'border-yellow-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stjoseph: {
    name: 'St. Joseph',
    main: 'bg-teal-700',
    accent: 'bg-yellow-500',
    text: 'text-white',
    border: 'border-yellow-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stpeter: {
    name: 'St. Peter',
    main: 'bg-red-700',
    accent: 'bg-gold-400',
    text: 'text-white',
    border: 'border-red-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stpaul: {
    name: 'St. Paul',
    main: 'bg-purple-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-purple-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stmichael: {
    name: 'St. Michael',
    main: 'bg-blue-600',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-blue-700',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  sttherese: {
    name: 'St. Thérèse',
    main: 'bg-pink-600',
    accent: 'bg-red-300',
    text: 'text-white',
    border: 'border-pink-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stfrancisassisi: {
    name: 'St. Francis of Assisi',
    main: 'bg-brown-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-400',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stmary: {
    name: 'St. Mary',
    main: 'bg-blue-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  staugustine: {
    name: 'St. Augustine',
    main: 'bg-yellow-800',
    accent: 'bg-black',
    text: 'text-white',
    border: 'border-yellow-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stbenedict: {
    name: 'St. Benedict',
    main: 'bg-black',
    accent: 'bg-red-700',
    text: 'text-white',
    border: 'border-red-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stjohn: {
    name: 'St. John the Apostle',
    main: 'bg-blue-800',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-blue-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stclare: {
    name: 'St. Clare',
    main: 'bg-purple-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-purple-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stignatius: {
    name: 'St. Ignatius of Loyola',
    main: 'bg-red-800',
    accent: 'bg-gold-600',
    text: 'text-white',
    border: 'border-red-700',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stcatherine: {
    name: 'St. Catherine of Siena',
    main: 'bg-purple-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-purple-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stthereseavilla: {
    name: 'St. Thérèse of Ávila',
    main: 'bg-teal-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-teal-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stsimon: {
    name: 'St. Simon',
    main: 'bg-green-700',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-green-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stvincent: {
    name: 'St. Vincent de Paul',
    main: 'bg-blue-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stlucy: {
    name: 'St. Lucy',
    main: 'bg-pink-700',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stpatrick: {
    name: 'St. Patrick',
    main: 'bg-green-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-green-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stanthony: {
    name: 'St. Anthony of Padua',
    main: 'bg-brown-700',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-brown-600',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  stjames: {
    name: 'St. James',
    main: 'bg-red-600',
    accent: 'bg-blue-400',
    text: 'text-white',
    border: 'border-red-500',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  marybrewster: {
    name: 'Mary Brewster',
    main: 'bg-pink-200',
    accent: 'bg-blue-200',
    text: 'text-gray-800',
    border: 'border-pink-300',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
  legoat: {
    name: 'Le 🐐',
    main: 'bg-[#552583]', 
    accent: 'bg-[#FDB927]', 
    text: 'text-white', 
    border: "border-[#552583]",
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
    },
  //Sports Teams
   bills: {
    name: 'Buffalo Bills',
    main: 'bg-[#00338D]', 
    accent: 'bg-[#C60C30]', 
    text: 'text-white', 
    border: 'border-[#C60C30]',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
    },
   braves: {
    name: 'Atlanta Braves',
    main: 'bg-[#13274F]',
    accent: 'bg-[#CE1141]',
    text: 'text-white',
    border: 'border-[#EAAA00]',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
    },
   uga: {
    name: 'Georgia Bulldogs',
    main: 'bg-black',
    accent: 'bg-[#BA0C2F]',
    border: 'border-[#BA0C2F]',
    text: 'text-white',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
    },
   gatech: {
    name: 'Georgia Tech Yellow Jackets',
    main: 'bg-[#003057]',
    accent: 'bg-[#B3A369]',
    text: 'text-white',
    border: 'border-[#C99700]',
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
    },
  ashleytwiner: {
    name: 'Ashley Twiner',
    main: 'bg-[#FF1493]', // Deep Pink
    accent: 'bg-[#FF69B4]', // Hot Pink
    text: 'text-white',
    border: 'border-[#FF00FF]', // Fuchsia
    fontFamily: 'font-sans',
    buttonStyle: 'rounded',
    cardStyle: 'shadow-lg rounded-lg',
    animation: '',
    backgroundPattern: '',
    customCursor: '',
  },
};

// Update other existing themes with default values for the new properties
Object.keys(themes).forEach(themeName => {
  if (themeName !== 'default' && themeName !== 'dark' && themeName !== 'cat') {
    themes[themeName] = {
      ...themes[themeName],
      fontFamily: themes[themeName].fontFamily || 'font-sans',
      buttonStyle: themes[themeName].buttonStyle || 'rounded',
      cardStyle: themes[themeName].cardStyle || 'shadow-lg rounded-lg',
      animation: themes[themeName].animation || '',
      backgroundPattern: themes[themeName].backgroundPattern || '',
      customCursor: themes[themeName].customCursor || '',
    };
  }
});

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);
  
  // Load theme from localStorage only once on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to default theme if there's an error
      setCurrentTheme(themes.default);
    }
  }, []);
  
  // Memoize the color adjustment helper function
  const adjustBrightness = useCallback((hex, percent) => {
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
      return hex;
    }
    
    try {
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
    } catch (e) {
      console.error('Error adjusting brightness:', e);
      return hex;
    }
  }, []);
  
  // Apply background gradient effect when theme changes
  useEffect(() => {
    try {
      const root = document.documentElement;
      const mainColor = getComputedStyle(root)
        .getPropertyValue(`--${currentTheme.main.slice(3)}`)
        .trim();
      
      if (mainColor) {
        const darkerColor = adjustBrightness(mainColor, -20);
        document.body.style.background = `linear-gradient(to bottom left, ${mainColor}, ${darkerColor})`;
      }
    } catch (error) {
      console.error('Error applying theme gradient:', error);
    }
  }, [currentTheme, adjustBrightness]);
  
  // Enhanced theme change function with additional options
  const changeTheme = useCallback((themeName, customOptions = {}) => {
    try {
      const normalizedThemeName = typeof themeName === 'string' 
        ? themeName.toLowerCase().replace(/\s+/g, '')
        : 'default';
        
      if (!themes[normalizedThemeName]) {
        console.warn(`Theme "${themeName}" not found, using default instead`);
      }
      
      // Get base theme and apply any custom options
      const baseTheme = themes[normalizedThemeName] || themes.default;
      const newTheme = {
        ...baseTheme,
        ...customOptions
      };
      
      setCurrentTheme(newTheme);
      localStorage.setItem('theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error changing theme:', error);
      // Ensure we always have a fallback
      setCurrentTheme(themes.default);
    }
  }, []);
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentTheme,
    changeTheme,
    themes
  }), [currentTheme, changeTheme]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Add error boundary to useTheme hook for more robust error handling
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('useTheme was called outside of ThemeProvider');
    // Return a default context object instead of throwing
    // This makes components more resilient to context errors
    return {
      currentTheme: themes.default,
      changeTheme: () => console.warn('Theme cannot be changed outside ThemeProvider'),
      themes
    };
  }
  return context;
};

