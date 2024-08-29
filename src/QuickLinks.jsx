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
    <div 
      className="h-full p-4 border-2 rounded"
      style={{ 
        borderColor: currentTheme.accent, 
        backgroundColor: currentTheme.mainBackground,  // Dynamically use the site's background color
        color: currentTheme.text 
      }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>Quick Links</h2>
      <div className="space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: currentTheme.accent,
              color: currentTheme.text,
              borderColor: currentTheme.accent
            }}
            className="font-semibold py-1 px-3 rounded hover:opacity-80 transition-opacity duration-200 text-center block text-sm"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
