import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    // Store the user information as needed, then redirect to the main page
    navigate('/');
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => console.log('Login failed:', error),
  });

  return (
    <div className="landing-container">
      <div className="landing-title">
        <h1 className="gradient-text">Welcome to Schedule SPX</h1>
        <button onClick={() => login()} className="google-login-button">
          Sign in with Google
        </button>
        <button className="learn-more-button">Learn More</button>
      </div>
    </div>
  );
};

export default LandingPage;
