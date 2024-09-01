import React from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import './LandingPage.css';
import { useTheme } from './ThemeContext';

const LandingPage = ({ setUser }) => {
  const { currentTheme } = useTheme();

  const handleLoginSuccess = (response) => {
    const user = {
      email: response.profileObj.email,
      name: response.profileObj.name,
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem('sessionExpiry', expiry.toString());
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div className={`landing-page-container ${currentTheme.main}`}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="landing-page-title"
      >
        Welcome to ScheduleSPX
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="landing-page-buttons"
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          buttonText="Sign in with Google"
          className={`google-sign-in-button ${currentTheme.text}`}
        />
        <button className={`learn-more-button ${currentTheme.text}`}>Learn More</button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
