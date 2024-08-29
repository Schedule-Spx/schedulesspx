// src/App.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import NavBar from './NavBar';
import QuickLinks from './QuickLinks';
import Schedule from './Schedule';

const App = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="App" style={{ backgroundColor: currentTheme.main }}>
      <NavBar />
      <main>
        <QuickLinks />
        <Schedule />
      </main>
    </div>
  );
};

export default App;
