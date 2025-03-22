import React, { useState, memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

// Memoized link button component to reduce re-renders
const LinkButton = memo(({ onClick, children, theme }) => (
  <button 
    onClick={onClick}
    className={`${theme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
  >
    {children}
  </button>
));

// Main component memoized to prevent unnecessary re-renders
const AgreementPopup = memo(({ onAgree }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasViewedDocs, setHasViewedDocs] = useState(false);

  // Memoize handlers to prevent recreation on each render
  const handleLinkClick = useCallback((path) => {
    setHasViewedDocs(true);
    navigate(path);
  }, [navigate]);

  const handleAgree = useCallback(() => {
    onAgree();
    if (hasViewedDocs) {
      navigate('/');
    }
  }, [onAgree, hasViewedDocs, navigate]);

  // Early return for certain paths
  if (location.pathname === '/privacy' || location.pathname === '/terms') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${currentTheme.main} p-6 rounded-lg shadow-xl max-w-md w-full`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>Welcome to Schedule-SPX</h2>
        <p className={`mb-4 ${currentTheme.text}`}>
          Please read our{' '}
          <LinkButton onClick={() => handleLinkClick('/terms')} theme={currentTheme}>
            Terms and Conditions
          </LinkButton>{' '}
          and{' '}
          <LinkButton onClick={() => handleLinkClick('/privacy')} theme={currentTheme}>
            Privacy Policy
          </LinkButton>
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
});

export default AgreementPopup;
