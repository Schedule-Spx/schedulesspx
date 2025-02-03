import React, { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

const ServiceWorkerWrapper = () => {
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');

      const handleWaitingWorker = (worker) => {
        setWaitingWorker(worker);
      };

      wb.addEventListener('waiting', () => handleWaitingWorker(wb));
      wb.register();
    }
  }, []);

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setWaitingWorker(null);
    window.location.reload();
  };

  return (
    waitingWorker && (
      <div className="update-notification">
        <p>A new version is available!</p>
        <button onClick={handleUpdate}>Update</button>
      </div>
    )
  );
};

export default ServiceWorkerWrapper;
