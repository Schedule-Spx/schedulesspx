import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const PopupMessage = () => {
  const { currentTheme } = useTheme();
  const [popup, setPopup] = useState({ title: '', message: '', author: '', isActive: false });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup');
        if (response.ok) {
          const data = await response.json();
          setPopup(data);
          const lastDismissedPopup = localStorage.getItem('lastDismissedPopup');
          const currentPopup = JSON.stringify({ title: data.title, message: data.message, author: data.author });
          if (data.isActive && currentPopup !== lastDismissedPopup) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    };

    fetchPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    const currentPopup = JSON.stringify({ title: popup.title, message: popup.message, author: popup.author });
    localStorage.setItem('lastDismissedPopup', currentPopup);
  };

  if (!isVisible || !popup.message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className={`rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10 ${currentTheme.main} ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>{popup.title}</h2>
        <p className={`mb-6 whitespace-pre-wrap ${currentTheme.text}`}>{popup.message}</p>
        <p className={`text-sm mb-4 ${currentTheme.text}`}>- {popup.author}</p>
        <button 
          onClick={handleClose}
          className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded transition duration-300`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
