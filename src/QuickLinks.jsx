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
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative`}>
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-5 relative z-10">
        <h2 className={`text-xl font-bold ${currentTheme.text} mb-4 text-center`}>Quick Links</h2>
        <div className="space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-opacity-100 ${currentTheme.main} ${currentTheme.text} brightness-125 font-semibold py-2 px-4 rounded transition-opacity duration-200 text-center block transform hover:scale-105 transition-transform duration-200 no-underline`}
              style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
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
