// src/AdComponent.jsx
import React, { useEffect, useRef } from 'react';

const AdComponent = ({ adSlot, adFormat = "auto", fullWidthResponsive = "true" }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="ad-component bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center" style={{ minHeight: '250px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: '100%', height: '250px' }}
        data-ad-client="ca-pub-9365788286872902"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        ref={adRef}
      />
    </div>
  );
};

export default AdComponent;
