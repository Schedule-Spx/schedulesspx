import React, { useEffect, useState, memo, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

// Memoized Link component
const QuickLink = memo(({ href, children, fadeIn }) => {
  const { currentTheme } = useTheme();
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-opacity-100 ${currentTheme.main} ${currentTheme.text} brightness-125 font-semibold py-1 px-4 rounded text-center block transform hover:scale-105 transition-transform duration-300 no-underline`}
      style={{ transition: 'opacity 0.5s ease-in-out, box-shadow 0.3s, transform 0.3s' }}
    >
      {children}
    </a>
  );
});

// Memoized gradient overlay
const GradientOverlay = memo(() => (
  <div 
    className="absolute inset-0 rounded-lg"
    style={{
      background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
      zIndex: 0
    }}
  />
));

// Main component
const QuickLinks = memo(() => {
  const { currentTheme } = useTheme();
  const [visibleLinks, setVisibleLinks] = useState([]);
  
  // Common links - memoized to prevent recreation on every render
  const links = useMemo(() => [
    { id: 1, name: 'Canvas', url: 'https://stpius.instructure.com/' },
    { id: 2, name: 'PowerSchool', url: 'https://powerschool.spx.org/public/' },
    { id: 3, name: 'x2VOL', url: 'https://x2vol.com/' },
    { id: 4, name: 'SPX Website', url: 'https://www.spx.org/' },
    { id: 5, name: 'Sage Dining', url: 'https://www.sagedining.com/sites/stpiusxcatholichighschool/menu' }
  ], []);
  
  // Staggered fade-in animation
  useEffect(() => {
    // Clear any existing timeouts
    const timeouts = [];
    
    // Create new animation with faster delays
    links.forEach((link, index) => {
      const timeout = setTimeout(() => {
        setVisibleLinks(prev => [...prev, link.id]);
      }, index * 100); // Faster delay (100ms between each)
      
      timeouts.push(timeout);
    });
    
    // Cleanup timeouts on unmount
    return () => timeouts.forEach(clearTimeout);
  }, [links]);
  
  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full`}>
      <GradientOverlay />
      
      <div className="p-4 relative z-10 h-full flex flex-col">
        <h2 className={`text-xl font-bold ${currentTheme.text} mb-3 text-center`}>Quick Links</h2>
        <div className="space-y-2 flex-grow flex flex-col justify-center">
          {links.map(link => (
            <QuickLink
              key={link.id}
              href={link.url}
              fadeIn={visibleLinks.includes(link.id)}
            >
              {link.name}
            </QuickLink>
          ))}
        </div>
      </div>
    </div>
  );
});

export default QuickLinks;
