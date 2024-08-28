// src/GoogleSuiteLinks.jsx
import React from 'react';

const GoogleSuiteLinks = () => {
  const apps = [
    { 
      name: 'Docs', 
      logo: 'https://www.gstatic.com/images/branding/product/1x/docs_48dp.png', 
      url: 'https://docs.google.com/document/create' 
    },
    { 
      name: 'Sheets', 
      logo: 'https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png', 
      url: 'https://docs.google.com/spreadsheets/create' 
    },
    { 
      name: 'Slides', 
      logo: 'https://www.gstatic.com/images/branding/product/1x/slides_48dp.png', 
      url: 'https://docs.google.com/presentation/create' 
    },
    { 
      name: 'Drive', 
      logo: 'https://www.gstatic.com/images/branding/product/1x/drive_48dp.png', 
      url: 'https://drive.google.com' 
    },
  ];

  return (
    <div className="p-2">
      <h2 className="text-lg font-bold mb-2 text-stpius-white">Google Suite</h2>
      <div className="grid grid-cols-2 gap-2">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stpius-gold hover:bg-stpius-gold/80 transition-colors duration-200 p-2 rounded-lg flex flex-col items-center justify-center aspect-square"
          >
            <img src={app.logo} alt={`${app.name} logo`} className="w-8 h-8 mb-1" />
            <span className="text-stpius-blue font-semibold text-xs">{app.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GoogleSuiteLinks;
