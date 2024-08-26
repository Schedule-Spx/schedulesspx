// src/components/AgreementPopup.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AgreementPopup = ({ onAgree }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome to Schedule-SPX</h2>
        <p className="mb-4">
          By using our service, you agree to our{' '}
          <Link to="/terms" className="text-blue-500 hover:underline" target="_blank">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-500 hover:underline" target="_blank">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={onAgree}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default AgreementPopup;
