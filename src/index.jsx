import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin'; // Adjust the import path if necessary
import './LandingPage.css';

const LandingPage = ({ user, setUser }) => {
  const navigate = useNavigate();

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
      <h1 className="landing-title">Welcome to Schedule SPX</h1>
      <h2 className="landing-subtitle">Built by Kagen Jensen and David Camick</h2>
      <p className="landing-body">Please sign in to use, or scroll down to learn more.</p>
      <div className="landing-buttons">
        <GoogleLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LandingPage;
