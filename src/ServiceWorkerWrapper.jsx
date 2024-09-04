import React, { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = useState(false);
  const [wb, setWb] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const workboxInstance = new Workbox('/service-worker.js');
      setWb(workboxInstance);

      workboxInstance.addEventListener('waiting', () => {
        setShowReload(true);
      });

      workboxInstance.register();
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
    </>
  );
};

export default ServiceWorkerWrapper;
