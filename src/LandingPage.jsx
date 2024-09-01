import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import './LandingPage.css';

const LandingPage = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate('/main');
  };

  return (
    <div className="landing-page-container">
      <h1 className="landing-page-title">Welcome to Schedule SPX</h1>
      <div className="google-login-container">
        <GoogleLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LandingPage;
