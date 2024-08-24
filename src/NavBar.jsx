// src/NavBar.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import GoogleLogin from './components/GoogleLogin';
import logo from '../assets/logo.svg'; // Import the SVG

const NavBar = ({ user, setUser }) => {
  // ... (previous code remains the same)

  return (
    <nav className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Schedule-SPX Logo" className="h-8 w-auto mr-2" /> {/* Add the logo */}
          <span className="text-xl font-bold hover:text-gray-300">Schedule-SPX</span>
        </Link>
        <button className="text-sm hover:text-gray-300">About</button>
      </div>
      {/* ... (rest of the NavBar code remains the same) */}
    </nav>
  );
};

export default NavBar;
