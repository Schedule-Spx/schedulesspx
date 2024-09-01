import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './LandingPage.css';

const LandingPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Handle the login and store the user token
      onLoginSuccess(tokenResponse);
      navigate('/main');
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    }
  });

  return (
    <div className="landing-page-container">
      <h1 className="landing-title">Welcome to ScheduleSPX</h1>
      <button onClick={login} className="google-sign-in-btn">Sign in with Google</button>
      <p className="learn-more-link">Learn More</p>
    </div>
  );
};

export default LandingPage;
