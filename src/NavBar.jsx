// src/NavBar.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import GoogleLogin from './components/GoogleLogin';
import logo from './assets/logo.svg';

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const adminEmails = ['kagenmjensen@me.com', 'dcamick25@spxstudent.org'];

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const isAdmin = user && adminEmails.includes(user.email.toLowerCase());

  return (
    <nav className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Schedule-SPX Logo" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold hover:text-gray-300">Schedule-SPX</span>
        </Link>
        <Link to="/about" className="text-sm hover:text-gray-300">About</Link>
        <Link to="/privacy" className="text-sm hover:text-gray-300">Privacy Policy</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-sm hover:text-gray-300"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        {user ? (
          <>
            <Link to="/account" className="text-sm hover:text-gray-300">{user.name}</Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
              >
                Admin Console
              </Link>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
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
