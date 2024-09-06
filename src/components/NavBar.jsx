import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import logo from '../assets/logo.svg';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { currentTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const adminEmails = ['kagenmjensen@me.com', 'dcamick25@spxstudent.org', 'davidpaulcamick@gmail.com'];

  const handleLoginSuccess = (userData) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user && adminEmails.includes(user.email.toLowerCase());

  return (
    <nav className={`${currentTheme.main} ${currentTheme.text} py-3 px-6 flex justify-between items-center shadow-md`}>
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Schedule-SPX Logo" className="h-10 w-auto mr-3" />
          <span className={`text-2xl font-bold hover:opacity-80 transition-opacity duration-200`}>Schedule-SPX</span>
        </Link>
        <Link to="/about" className={`text-sm font-medium hover:opacity-80 transition-opacity duration-200`}>About</Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/account" className={`text-sm font-medium hover:opacity-80 transition-opacity duration-200`}>{user.name}</Link>
            {isAdmin && (
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
