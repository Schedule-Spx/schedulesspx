// src/GoogleSuiteLinks.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

const GoogleSuiteLinks = () => {
  const { currentTheme } = useTheme();

  const links = [
    { name: 'Google Docs', url: 'https://docs.new', icon: '/src/assets/GoogleDocsIcon.svg' },
    { name: 'Google Sheets', url: 'https://sheets.new', icon: '/src/assets/GoogleSheetsIcon.svg' },
    { name: 'Google Slides', url: 'https://slides.new', icon: '/src/assets/GoogleSlidesIcon.svg' },
    { name: 'Google Drive', url: 'https://drive.google.com', icon: '/src/assets/GoogleDriveIcon.svg' },
  ];

  return (
    <div 
      className="h-full p-4 border-2 rounded"
      style={{ 
        borderColor: currentTheme.accent, 
        backgroundColor: currentTheme.main,
        color: currentTheme.text 
      }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>Google Suite Links</h2>
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
              borderColor: currentTheme.accent,
            }}
            className="font-semibold py-1 px-3 rounded hover:opacity-80 transition-opacity duration-200 text-center block text-sm"
          >
            <img src={link.icon} alt={link.name} className="inline-block mr-2 w-6 h-6"/>
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default GoogleSuiteLinks;
