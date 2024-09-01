import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1 className="landing-title">Welcome to ScheduleSPX</h1>
      <div className="landing-buttons">
        <button className="btn-signin">Sign in with Google</button>
        <Link to="/about" className="btn-learn-more">Learn More</Link>
      </div>
    </div>
  );
};

export default LandingPage;
