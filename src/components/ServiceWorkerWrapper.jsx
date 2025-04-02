import React, { useEffect, useState, useCallback, memo } from 'react';
import logger from '../utils/logger';

// Toast notification component - memoized for performance
const UpdateNotification = memo(({ onDismiss, onUpdate }) => (
  <div className="update-notification fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg z-50 animate-slide-up">
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <p className="font-medium">A new version is available with improved features and bug fixes!</p>
    </div>
    <div className="flex gap-2">
      <button 
        onClick={onDismiss}
        className="px-3 py-1 text-sm border border-white rounded hover:bg-blue-700 transition-colors"
      >
        Later
      </button>
      <button 
        onClick={onUpdate}
        className="px-3 py-1 text-sm bg-white text-blue-600 rounded font-medium hover:bg-gray-100 transition-colors"
      >
        Update Now
      </button>
    </div>
  </div>
));

const ServiceWorkerWrapper = () => {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  
  // Handler to check for and apply service worker updates
  const checkForUpdates = useCallback(() => {
    try {
      if (typeof window.updateSW === 'function') {
        // Safely call updateSW without breaking if it returns undefined
        const updatePromise = window.updateSW(false);
        if (updatePromise && typeof updatePromise.then === 'function') {
          updatePromise.then(needRefresh => {
            if (needRefresh) {
              setShowUpdateNotification(true);
            }
          }).catch(err => {
            logger.warn('Error checking for updates', { error: err.message });
          });
        }
      }
    } catch (error) {
      logger.warn('Error in update check', { error: error.message });
    }
  }, []);
  
  // Apply update and reload the page
  const handleUpdate = useCallback(() => {
    try {
      if (typeof window.updateSW === 'function') {
        window.updateSW(true);
      }
    } catch (error) {
      logger.warn('Error applying update', { error: error.message });
      // Force reload as fallback
      window.location.reload();
    }
    setShowUpdateNotification(false);
  }, []);
  
  // Dismiss update notification
  const dismissUpdate = useCallback(() => {
    setShowUpdateNotification(false);
  }, []);
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Listen for the controlling service worker changing
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // The controlling service worker has changed, reload the page
        window.location.reload();
      });
      
      // Listen for custom event signaling update availability
      const handleUpdateAvailable = () => {
        setShowUpdateNotification(true);
      };
      
      window.addEventListener('swUpdateAvailable', handleUpdateAvailable);
      
      // Allow some time for main.jsx to initialize updateSW
      const initialCheckTimeout = setTimeout(checkForUpdates, 3000);
      
      // Also check periodically
      const intervalId = setInterval(checkForUpdates, 60 * 60 * 1000); // Check hourly
      
      return () => {
        clearTimeout(initialCheckTimeout);
        clearInterval(intervalId);
        window.removeEventListener('swUpdateAvailable', handleUpdateAvailable);
      };
    }
  }, [checkForUpdates]);
  
  // Don't render anything if no update is available
  if (!showUpdateNotification) return null;
  
  return <UpdateNotification onDismiss={dismissUpdate} onUpdate={handleUpdate} />;
};

export default memo(ServiceWorkerWrapper);
