import React, { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import Announcement from './Announcement';

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = useState(false);
  const [wb, setWb] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const workboxInstance = new Workbox('/service-worker.js', { type: 'module' });
      setWb(workboxInstance);

      workboxInstance.addEventListener('waiting', (event) => {
        setShowReload(true);
      });

      workboxInstance.register()
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const reloadPage = () => {
    wb.addEventListener('controlling', () => {
      window.location.reload();
    });
    wb.messageSkipWaiting();
  };

  return (
    <>
      {showReload && (
        <div className="update-banner">
          <p>A new version is available!</p>
          <button onClick={reloadPage}>Reload</button>
        </div>
      )}
      <Announcement />
    </>
  );
};

export default ServiceWorkerWrapper;
