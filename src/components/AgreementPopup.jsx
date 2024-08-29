import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const AgreementPopup = ({ onAgree }) => {
  const { currentTheme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${currentTheme.main} p-6 rounded-lg shadow-xl max-w-md w-full`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>Welcome to Schedule-SPX</h2>
        <p className={`mb-4 ${currentTheme.text}`}>
          By using our service, you agree to our{' '}
          <Link 
            to="/terms" 
            className={`${currentTheme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`} 
            target="_blank"
          >
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link 
            to="/privacy" 
            className={`${currentTheme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`} 
            target="_blank"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={onAgree}
          className={`${currentTheme.accent} hover:opacity-80 ${currentTheme.text} font-bold py-2 px-4 rounded transition-opacity duration-300`}
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default AgreementPopup;
