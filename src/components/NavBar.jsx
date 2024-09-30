import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import logo from '../assets/logo.svg';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { currentTheme } = useTheme();
  const { user, login, logout, isAuthorized, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const adminEmails = ['kagenmjensen@me.com', 'dcamick25@spxstudent.org', 'davidpaulcamick@gmail.com'];

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/announcement');
        if (response.ok) {
          const data = await response.json();
          setAnnouncement(data);
        }
      } catch (error) {
        console.error('Error fetching announcement:', error);
      }
    };

    fetchAnnouncement();
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log("NavBar - Login success, userData:", userData);
    login(userData);
  };

  const handleLogout = () => {
    console.log("NavBar - Logout clicked");
    logout();
    navigate('/');
  };

  const canAccessTeacherTools = () => {
    return user && (user.email.endsWith('@spx.org') || isAdmin());
  };

  return (
    <nav className={`${currentTheme.main} ${currentTheme.text} py-3 px-6 flex flex-wrap justify-between items-center shadow-md relative`}>
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Schedule-SPX Logo" className="h-10 w-auto mr-3" />
          <span className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200">Schedule-SPX</span>
        </Link>
        <Link to="/about" className="text-sm font-medium hover:opacity-80 transition-opacity duration-200">About</Link>
        <Link to="/contributors" className="text-sm font-medium hover:opacity-80 transition-opacity duration-200">Contributors</Link>
      </div>
      
      {announcement && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className={`${currentTheme.accent} px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg whitespace-nowrap`}>
            <span className={`text-sm font-medium ${currentTheme.text}`}>
              <span className="font-bold mr-2">{announcement.title}:</span>
              {announcement.message}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/account" className="text-sm font-medium hover:opacity-80 transition-opacity duration-200">{user.name}</Link>
            {canAccessTeacherTools() && (
              <Link
                to="/teacher-tools"
                className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200`}
              >
                Teacher Tools
              </Link>
            )}
            {isAdmin() && (
              <Link
                to="/admin"
                className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200`}
              >
                Admin Console
              </Link>
            )}
            <button
              className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-2 px-4 rounded hover:opacity-80 transition-opacity duration-200`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <GoogleLogin onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
