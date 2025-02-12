import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SeniorRetreatPopup = ({ onClose }) => {
  const { currentTheme } = useTheme();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10 ${currentTheme.main} ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>SENIORS</h2>
        <p className={`mb-6 whitespace-pre-wrap ${currentTheme.text}`}>
          After Homeroom a Ton of people have signed up for the retreat, so spots are running low. Please make sure you sign up ASAP to secure your spot!
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfp0J7TV2ujb2i6MjroEumxpfm2oK8vizWe2k5gpdFvY9K0Nw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded transition duration-300 inline-block mb-4`}
        >
          Sign Up Now
        </a>
        <button
          onClick={onClose}
          className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded transition duration-300`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SeniorRetreatPopup;
