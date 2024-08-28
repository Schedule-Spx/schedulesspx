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
    <div className="p-1">
      <h2 className="text-xs font-bold mb-1 text-stpius-white">Google Suite</h2>
      <div className="grid grid-cols-2 gap-1">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stpius-gold hover:bg-stpius-gold/80 transition-colors duration-200 p-0.5 rounded-md flex items-center justify-center"
          >
            <img src={app.logo} alt={`${app.name} logo`} className="w-4 h-4 mr-1" />
            <span className="text-stpius-blue font-semibold text-[0.6rem]">{app.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GoogleSuiteLinks;
