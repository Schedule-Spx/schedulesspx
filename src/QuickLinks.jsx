import React from 'react';
import { useTheme } from './ThemeContext';

const QuickLinks = () => {
  const { currentTheme } = useTheme();

  const links = [
    { name: 'Canvas', url: 'https://stpius.instructure.com/' },
    { name: 'PowerSchool', url: 'https://powerschool.spx.org/public/' },
    { name: 'x2VOL', url: 'https://x2vol.com/' },
    { name: 'SPX Website', url: 'https://www.spx.org/' },
    { name: 'Sage Dining', url: 'https://www.sagedining.com/sites/stpiusxcatholichighschool/menu' }
  ];

  return (
    <div className={`h-full p-4 border-2 rounded ${currentTheme.accent} ${currentTheme.main}`}>
      <h2 className={`text-xl font-bold ${currentTheme.text} mb-2`}>Quick Links</h2>
      <div className="space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${currentTheme.accent} ${currentTheme.text} font-semibold py-1 px-3 rounded hover:opacity-80 transition-opacity duration-200 text-center block text-sm`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
