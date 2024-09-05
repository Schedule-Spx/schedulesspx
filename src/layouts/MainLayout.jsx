import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
  const { currentTheme } = useTheme();

  return (
    <div className={`App flex flex-col min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <NavBar />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
