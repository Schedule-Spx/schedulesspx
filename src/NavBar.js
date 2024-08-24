// src/NavBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ toggleTheme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    navigate('/admin');
  };

  return (
    <>
      <div className="navbar glass-tile">
        <div className="button-container">
          <button
            className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded p-2"
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg z-50">
            <h2 className="text-2xl mb-4">Login</h2>
            <LoginForm onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for login credentials
    if (username === 'kagen' && password === 'Katahdin') {
      alert('Login successful');
      onLoginSuccess();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="mr-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded p-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Login
        </button>
      </div>
    </form>
  );
};

export default NavBar;
