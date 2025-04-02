import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';

// Animation variants for the popup - adjusted for center positioning
const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    transition: { 
      duration: 0.2 
    } 
  }
};

// PopupContent as a separate memoized component - modified to center on screen
const PopupContent = memo(({ popup, theme, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div
        className={`max-w-lg p-6 m-4 ${theme.main} border-2 ${theme.border} rounded-lg shadow-lg`}
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold ${theme.text}`}>{popup.title || 'Announcement'}</h3>
          <button
            onClick={onClose}
            className={`${theme.accent} ${theme.text} p-1 rounded-full hover:opacity-80 transition-opacity duration-200`}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className={`${theme.text} mb-4 prose`}>
          <ReactMarkdown>{popup.message || ''}</ReactMarkdown>
        </div>
        
        {popup.author && (
          <p className={`text-sm ${theme.text} opacity-75 mt-4 text-right`}>
            - {popup.author}
          </p>
        )}
      </motion.div>
    </div>
  );
});

// Main component
const PopupMessage = () => {
  const { currentTheme } = useTheme();
  const [popup, setPopup] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  // Fetch popup information from the API
  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup');
        if (!response.ok) throw new Error('Failed to fetch popup');
        
        const data = await response.json();
        if (data && data.isActive) {
          // Check if user has already seen this popup
          const lastSeenPopupId = localStorage.getItem('lastSeenPopupId');
          const popupHasId = data.id || JSON.stringify(data); // Use ID or content hash
          
          if (lastSeenPopupId !== popupHasId) {
            setPopup(data);
            setIsVisible(true);
            setHasSeenPopup(false);
          } else {
            setHasSeenPopup(true);
          }
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    };
    
    fetchPopup();
    
    // Refresh popup every 30 minutes
    const refreshInterval = setInterval(fetchPopup, 30 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  // Close handler with useCallback to prevent unnecessary recreation
  const handleClose = useCallback(() => {
    setIsVisible(false);
    
    // Mark this popup as seen
    if (popup) {
      const popupId = popup.id || JSON.stringify(popup);
      localStorage.setItem('lastSeenPopupId', popupId);
      setHasSeenPopup(true);
    }
  }, [popup]);

  // Don't render anything if there's no popup or it's already been seen
  if (!popup || !isVisible || hasSeenPopup) return null;

  return (
    <AnimatePresence>
      {isVisible && <PopupContent popup={popup} theme={currentTheme} onClose={handleClose} />}
    </AnimatePresence>
  );
};

export default memo(PopupMessage);
