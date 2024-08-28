// src/QuickLinks.jsx
import React from 'react';

const QuickLinks = () => {
  const links = [
    { name: 'Canvas', url: 'https://stpius.instructure.com/' },
    { name: 'PowerSchool', url: 'https://powerschool.spx.org/public/' },
    { name: 'x2VOL', url: 'https://x2vol.com/' },
    { name: 'SPX Website', url: 'https://www.spx.org/' },
    { name: 'Sage Dining', url: 'https://www.sagedining.com/sites/stpiusxcatholichighschool/menu' }
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold text-stpius-white mb-4">Quick Links</h2>
      <div className="flex-grow overflow-y-auto space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stpius-gold text-stpius-blue font-semibold py-2 px-4 rounded hover:bg-stpius-gold/80 transition-colors duration-200 text-center block"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
