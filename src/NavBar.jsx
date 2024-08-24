// src/NavBar.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import GoogleLogin from './components/GoogleLogin';

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.email === 'your-admin-email@example.com') {  // Replace with actual admin email
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold hover:text-gray-300">Schedule-SPX</Link>
        <button className="text-sm hover:text-gray-300">About</button>
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
            <span>{user.name}</span>
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
