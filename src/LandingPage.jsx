import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for routing
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
    <div className="landing-page">
      <div className="background-image-container"></div> {/* Background image container */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="landing-title"
      >
        Welcome to Schedule SPX
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="landing-subtitle"
      >
        Built by Kagen Jensen and David Camick
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="landing-body"
      >
        Please sign in to use, or <Link to="/about" className="highlight-link">Click Here</Link> to learn more.
      </motion.p>
      <motion.div
        className="landing-buttons"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <GoogleLogin onLoginSuccess={handleLoginSuccess} />
        <p className="fine-print">
          By Signing in, you agree to the <Link to="/terms" className="highlight-link">Terms</Link> and the <Link to="/privacy" className="highlight-link">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
