// src/GoogleSuiteLinks.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';

const GoogleSuiteLinks = () => {
  const { currentTheme } = useTheme();

  const links = [
    { name: 'Google Docs', url: 'https://docs.new', icon: '/src/assets/googledocsicon.svg' },
    { name: 'Google Sheets', url: 'https://sheets.new', icon: '/src/assets/googlesheetsicon.svg' },
    { name: 'Google Slides', url: 'https://slides.new', icon: '/src/assets/googleslidesicon.svg' },
    { name: 'Google Drive', url: 'https://drive.google.com', icon: '/src/assets/googledriveicon.svg' },
  ];

  const apps = [
    { name: 'Docs', app_url: 'https://docs.new', app_logo: '/src/assets/googledocsicon.svg' },
    { name: 'Sheets', app_url: 'https://sheets.new', app_logo: '/src/assets/googlesheetsicon.svg' },
    { name: 'Slides', app_url: 'https://slides.new', app_logo: '/src/assets/googleslidesicon.svg' },
    { name: 'Drive', app_url: 'https://drive.new', app_logo: '/src/assets/googledriveicon.svg' },
  ];

  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border}`}>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>Google Suite Links</h2>
        <div className="space-y-3">
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              <div
                className="flex items-center space-x-4 p-3 rounded hover:opacity-80 transition-opacity duration-200 text-center block text-sm"
                style={{
                  backgroundColor: currentTheme.accent,
                  color: currentTheme.text,
                  borderColor: currentTheme.accent,
                }}
              >
                <img src={link.icon} alt={link.name} className="inline-block w-6 h-6" />
                <span>{link.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} mt-5`}>
        <div className="p-5">
          <h2 className="text-xl font-bold ${currentTheme.text} opacity-80 mb-4">Document Creator</h2>
          <p className="text-sm ${currentTheme.text} opacity-80 mb-4">Click to create a new document</p>
          <div className="flex justify-between items-center">
            {apps.map((app) => (
              <a
                key={app.name}
                href={app.app_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme.accent} hover:opacity-80 transition-opacity duration-200 px-3 py-2 rounded-md flex flex-col items-center justify-center`}
                style={{
                  borderColor: currentTheme.accent,
                }}
              >
                <img src={app.app_logo} alt={app.name} className="w-6 h-6 object-contain" />
                <span className="mt-2 ${currentTheme.text} font-semibold text-sm">{app.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
