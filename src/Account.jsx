import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import './carousel.css'; // Ensure you have this file in the correct directory
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Account = ({ user }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [filteredThemes, setFilteredThemes] = useState([]);
  const featuredThemes = ['default', 'dark', 'light', 'laborday']; // Updated with Labor Day

  useEffect(() => {
    switch (selectedCategory) {
      case 'featured':
        setFilteredThemes(featuredThemes.map((theme) => themes[theme]));
        break;
      case 'general':
        setFilteredThemes(Object.values(themes).filter((theme) => !featuredThemes.includes(theme.name.toLowerCase())));
        break;
      case 'holiday':
        setFilteredThemes(Object.values(themes).filter((theme) => theme.name.toLowerCase().includes('day') || theme.name.toLowerCase().includes('holiday')));
        break;
      case 'saint':
        setFilteredThemes(Object.values(themes).filter((theme) => theme.name.toLowerCase().includes('saint')));
        break;
      default:
        setFilteredThemes(Object.values(themes));
    }
  }, [selectedCategory, themes]);

  return (
    <div className={`min-h-screen p-4 ${currentTheme.main} ${currentTheme.text}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Theme Customization</h2>
          <div className="flex justify-center space-x-4 mb-4">
            <button onClick={() => setSelectedCategory('featured')} className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text}`}>Featured</button>
            <button onClick={() => setSelectedCategory('general')} className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text}`}>General Themes</button>
            <button onClick={() => setSelectedCategory('holiday')} className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text}`}>Holiday Themes</button>
            <button onClick={() => setSelectedCategory('saint')} className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text}`}>Saint Themes</button>
            <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text}`}>Show All</button>
          </div>
          <TransitionGroup className="carousel">
            {filteredThemes.map((theme, index) => (
              <CSSTransition key={index} timeout={500} classNames="carousel">
                <div
                  onClick={() => changeTheme(theme.name)}
                  className="w-full h-32 rounded-lg overflow-hidden shadow-md mb-4 cursor-pointer relative"
                  style={{ borderColor: theme.accent }}
                >
                  <div className={`h-full ${theme.main} flex justify-center items-center`}>
                    <span className={`${theme.text} text-xl font-bold`}>{theme.name}</span>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Account;
