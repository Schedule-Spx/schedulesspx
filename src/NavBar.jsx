import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import logo from './assets/logo.svg';
import { useTheme } from './ThemeContext';

const NavBar = ({ user, setUser }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

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
    <nav className={`${currentTheme.secondary} ${currentTheme.text} py-2 px-4 flex justify-between items-center`}>
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Schedule-SPX Logo" className="h-8 w-auto mr-2" />
          <span className={`text-xl font-bold hover:${currentTheme.primary}`}>Schedule-SPX</span>
        </Link>
        <Link to="/about" className={`text-sm hover:${currentTheme.primary}`}>About</Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/account" className={`text-sm hover:${currentTheme.primary}`}>{user.name}</Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`${currentTheme.primary} hover:opacity-80 ${currentTheme.text} text-sm py-1 px-3 rounded`}
              >
                Admin Console
              </Link>
            )}
            <button
              className={`${currentTheme.primary} hover:opacity-80 ${currentTheme.text} text-sm py-1 px-3 rounded`}
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
