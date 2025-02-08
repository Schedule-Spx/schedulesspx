import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    main: 'bg-stpius-blue',
    accent: 'bg-stpius-gold',
    text: 'text-stpius-white',
    border: 'border-stpius-gold',
  },
  dark: {
    name: 'Dark',
    main: 'bg-gray-900',
    accent: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-600',
  },
  light: {
    name: 'Light',
    main: 'bg-gray-100',
    accent: 'bg-gray-300',
    text: 'text-gray-900',
    border: 'border-gray-300',
  },
  forest: {
    name: 'Forest',
    main: 'bg-green-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
  },
  ocean: {
    name: 'Ocean',
    main: 'bg-blue-800',
    accent: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-500',
  },
  sunset: {
    name: 'Sunset',
    main: 'bg-orange-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-red-400',
  },
  lavender: {
    name: 'Lavender',
    main: 'bg-purple-400',
    accent: 'bg-purple-200',
    text: 'text-gray-800',
    border: 'border-purple-300',
  },
  mint: {
    name: 'Mint',
    main: 'bg-green-400',
    accent: 'bg-green-200',
    text: 'text-gray-800',
    border: 'border-green-300',
  },
  cherry: {
    name: 'Cherry',
    main: 'bg-red-600',
    accent: 'bg-pink-300',
    text: 'text-white',
    border: 'border-red-400',
  },
  coffee: {
    name: 'Coffee',
    main: 'bg-yellow-900',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-yellow-700',
  },
  retro: {
    name: 'Retro',
    main: 'bg-[#403D39]', 
    accent: 'bg-[#EB5E28]', 
    text: 'text-[#FFFCF2]', 
    border: 'border-[#CCC5B9]', 
  },
  skyblue: {
    name: 'Sky Blue',
    main: 'bg-blue-400',
    accent: 'bg-blue-200',
    text: 'text-gray-800',
    border: 'border-blue-300',
  },
  coral: {
    name: 'Coral',
    main: 'bg-red-400',
    accent: 'bg-orange-300',
    text: 'text-white',
    border: 'border-red-300',
  },
  emerald: {
    name: 'Emerald',
    main: 'bg-green-600',
    accent: 'bg-green-400',
    text: 'text-white',
    border: 'border-green-500',
  },
  amethyst: {
    name: 'Amethyst',
    main: 'bg-purple-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-purple-500',
  },
  golden: {
    name: 'Golden',
    main: 'bg-yellow-600',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500',
  },
  silver: {
    name: 'Silver',
    main: 'bg-gray-300',
    accent: 'bg-gray-200',
    text: 'text-gray-800',
    border: 'border-gray-400',
  },
  bronze: {
    name: 'Bronze',
    main: 'bg-yellow-800',
    accent: 'bg-yellow-700',
    text: 'text-white',
    border: 'border-yellow-600',
  },
  candycane: {
  name: 'Candy Cane',
  main: 'bg-[#FFFAF0]', 
  accent: 'bg-[#FF3B3F]', 
  text: 'text-[#2C2C2C]', 
  border: 'border-[#FF3B3F]', 
},
  halloween: {
    name: 'Halloween',
    main: 'bg-orange-600',
    accent: 'bg-purple-700',
    text: 'text-white',
    border: 'border-black',
  },
  valentinesday: {
    name: "Valentine's Day",
    main: 'bg-pink-500',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-300',
  },
  stpatricksday: {
    name: "St. Patrick's Day",
    main: 'bg-green-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-green-300',
  },
  easter: {
    name: 'Easter',
    main: 'bg-purple-400',
    accent: 'bg-yellow-300',
    text: 'text-gray-800',
    border: 'border-pink-300',
  },
  independenceday: {
    name: 'Independence Day',
    main: 'bg-blue-700',
    accent: 'bg-red-600',
    text: 'text-white',
    border: 'border-white',
  },
  thanksgiving: {
    name: 'Thanksgiving',
    main: 'bg-orange-700',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-brown-400',
  },
  laborday: {
    name: 'Labor Day',
    main: 'bg-blue-500',
    accent: 'bg-red-500',
    text: 'text-white',
    border: 'border-white',
  },
  stpiusx: {
    name: 'St. Pius X',
    main: 'bg-[#001F3F]', // Navy Blue
    accent: 'bg-[#B98827]', // Gold
    text: 'text-white',
    border: 'border-[#B98827]',
  },
  popefrancis: {
    name: 'Pope Francis',
    main: 'bg-white',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500',
  },
  popejohnpaulii: {
    name: 'Pope John Paul II',
    main: 'bg-red-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-yellow-400',
  },
  popebenedictxvi: {
    name: 'Pope Benedict XVI',
    main: 'bg-red-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500',
  },
  popeleoxiii: {
    name: 'Pope Leo XIII',
    main: 'bg-blue-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500',
  },
  poepiusx: {
    name: 'Pope Pius X',
    main: 'bg-white',
    accent: 'bg-red-600',
    text: 'text-gray-900',
    border: 'border-red-500',
  },
  allsaints: {
    name: 'All Saints',
    main: 'bg-yellow-300',
    accent: 'bg-white',
    text: 'text-gray-900',
    border: 'border-yellow-400',
  },
  immaculateconception: {
    name: 'Immaculate Conception',
    main: 'bg-blue-500',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-300',
  },
  sacredheart: {
    name: 'Sacred Heart',
    main: 'bg-red-700',
    accent: 'bg-yellow-300',
    text: 'text-white',
    border: 'border-yellow-400',
  },
  stjoseph: {
    name: 'St. Joseph',
    main: 'bg-teal-700',
    accent: 'bg-yellow-500',
    text: 'text-white',
    border: 'border-yellow-600',
  },
  stpeter: {
    name: 'St. Peter',
    main: 'bg-red-700',
    accent: 'bg-gold-400',
    text: 'text-white',
    border: 'border-red-600',
  },
  stpaul: {
    name: 'St. Paul',
    main: 'bg-purple-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-purple-600',
  },
  stmichael: {
    name: 'St. Michael',
    main: 'bg-blue-600',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-blue-700',
  },
  sttherese: {
    name: 'St. Thérèse',
    main: 'bg-pink-600',
    accent: 'bg-red-300',
    text: 'text-white',
    border: 'border-pink-500',
  },
  stfrancisassisi: {
    name: 'St. Francis of Assisi',
    main: 'bg-brown-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-400',
  },
  stmary: {
    name: 'St. Mary',
    main: 'bg-blue-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-500',
  },
  staugustine: {
    name: 'St. Augustine',
    main: 'bg-yellow-800',
    accent: 'bg-black',
    text: 'text-white',
    border: 'border-yellow-600',
  },
  stbenedict: {
    name: 'St. Benedict',
    main: 'bg-black',
    accent: 'bg-red-700',
    text: 'text-white',
    border: 'border-red-600',
  },
  stjohn: {
    name: 'St. John the Apostle',
    main: 'bg-blue-800',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-blue-600',
  },
  stclare: {
    name: 'St. Clare',
    main: 'bg-purple-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-purple-500',
  },
  stignatius: {
    name: 'St. Ignatius of Loyola',
    main: 'bg-red-800',
    accent: 'bg-gold-600',
    text: 'text-white',
    border: 'border-red-700',
  },
  stcatherine: {
    name: 'St. Catherine of Siena',
    main: 'bg-purple-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-purple-600',
  },
  stthereseavilla: {
    name: 'St. Thérèse of Ávila',
    main: 'bg-teal-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-teal-500',
  },
  stsimon: {
    name: 'St. Simon',
    main: 'bg-green-700',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-green-600',
  },
  stvincent: {
    name: 'St. Vincent de Paul',
    main: 'bg-blue-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-500',
  },
  stlucy: {
    name: 'St. Lucy',
    main: 'bg-pink-700',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-500',
  },
  stpatrick: {
    name: 'St. Patrick',
    main: 'bg-green-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-green-500',
  },
  stanthony: {
    name: 'St. Anthony of Padua',
    main: 'bg-brown-700',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-brown-600',
  },
  stjames: {
    name: 'St. James',
    main: 'bg-red-600',
    accent: 'bg-blue-400',
    text: 'text-white',
    border: 'border-red-500',
  },
  legoat: {
    name: 'Le 🐐',
    main: 'bg-[#552583]', 
    accent: 'bg-[#FDB927]', 
    text: 'text-white', 
    border: "border-[#552583]" 
    },
  //Sports Teams
   bills: {
    name: 'Buffalo Bills',
    main: 'bg-[#00338D]', 
    accent: 'bg-[#C60C30]', 
    text: 'text-white', 
    border: 'border-[#C60C30]'
    },
   braves: {
    name: 'Atlanta Braves',
    main: 'bg-[#13274F]',
    accent: 'bg-[#CE1141]',
    text: 'text-white',
    border: 'border-[#EAAA00]',
    },
   uga: {
    name: 'Georgia Bulldogs',
    main: 'bg-black',
    accent: 'bg-[#BA0C2F]',
    border: 'border-[#BA0C2F]',
    text: 'text-white',
    },
   gatech: {
    name: 'Georgia Tech Yellow Jackets',
    main: 'bg-[#003057]',
    accent: 'bg-[#B3A369]',
    text: 'text-white',
    border: 'border-[#C99700]',
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

    const mainColor = getComputedStyle(root)
      .getPropertyValue(`--${currentTheme.main.slice(3)}`)
      .trim();

    const darkerColor = adjustBrightness(mainColor, -20);

    document.body.style.background = `linear-gradient(to bottom left, ${mainColor}, ${darkerColor})`;
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    const normalizedThemeName = themeName.toLowerCase().replace(/\s+/g, '');
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

