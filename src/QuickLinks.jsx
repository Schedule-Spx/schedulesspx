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
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border}`}>
      <div className="p-5">
        <h2 className={`text-xl font-bold ${currentTheme.text} mb-4`}>Quick Links</h2>
        <div className="space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${currentTheme.accent} ${currentTheme.text} font-semibold py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200 text-center block`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
