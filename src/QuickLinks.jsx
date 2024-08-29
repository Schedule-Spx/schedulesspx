// src/QuickLinks.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';

const QuickLinks = () => {
  const { currentTheme } = useTheme();

  const links = [
    { name: 'Canvas', url: 'https://stpius.instructure.com/' },
    { name: 'PowerSchool', url: 'http://powerschool.spx.org/public/' },
    { name: 'SPX Website', url: 'https://www.spx.org/' },
    { name: 'Naviance', url: 'http://www.naviance.com/' },
    { name: 'SAGE Dining', url: 'https://www.sagedining.com/sites/stpiusxatholichighschool/menu' }
  ];

  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border}`}>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>Quick Links</h2>
        <div className="space-y-3">
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              <div
                className={`${currentTheme.accent} font-semibold py-1 px-4 rounded hover:opacity-80 transition-opacity duration-200 text-center block text-sm`}
                style={{
                  backgroundColor: currentTheme.accent,
                  color: currentTheme.text,
                  borderColor: currentTheme.accent,
                }}
              >
                {link.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
