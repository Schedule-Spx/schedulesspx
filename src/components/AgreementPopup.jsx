import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const AgreementPopup = ({ onAgree }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasViewedDocs, setHasViewedDocs] = useState(false);

  const handleLinkClick = (path) => {
    setHasViewedDocs(true);
    navigate(path);
  };

  const handleAgree = () => {
    onAgree();
    if (hasViewedDocs) {
      navigate('/');
    }
  };

  if (location.pathname === '/privacy' || location.pathname === '/terms') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${currentTheme.main} p-6 rounded-lg shadow-xl max-w-md w-full`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>Welcome to Schedule-SPX</h2>
        <p className={`mb-4 ${currentTheme.text}`}>
          Please read our{' '}
          <button 
            onClick={() => handleLinkClick('/terms')}
            className={`${currentTheme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Terms and Conditions
          </button>{' '}
          and{' '}
          <button 
            onClick={() => handleLinkClick('/privacy')}
            className={`${currentTheme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Privacy Policy
          </button>
          .
        </p>
        {hasViewedDocs && (
          <p className={`mb-4 ${currentTheme.text}`}>
            By using our service, you agree to our Terms and Conditions and Privacy Policy.
          </p>
        )}
        <button
          onClick={handleAgree}
          className={`${currentTheme.accent} hover:opacity-80 ${currentTheme.text} font-bold py-2 px-4 rounded transition-opacity duration-300`}
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default AgreementPopup;
