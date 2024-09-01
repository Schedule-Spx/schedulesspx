import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin'; // Adjust the import path if necessary
import './LandingPage.css';

const LandingPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate('/main'); // Redirect after successful sign-in
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundPosition: `center ${scrollY * 0.5}px`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: -100 }}
        transition={{ duration: 2 }}
        className="landing-title"
      >
        Welcome to Schedule SPX
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="landing-subtitle"
      >
        Built by Kagen Jensen and David Camick
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="landing-body"
      >
        Please sign in to use, or scroll down to learn more.
      </motion.p>
      <motion.div
        className="landing-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <GoogleLogin onLoginSuccess={handleLoginSuccess} />
      </motion.div>
    </div>
  );
};

export default LandingPage;
