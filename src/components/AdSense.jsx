// src/components/AdSense.jsx
import React, { useEffect } from 'react';

const AdSense = ({ adSlot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block', width: '100%', height: '100%' }}
         data-ad-client="ca-pub-9365788286872902"
         data-ad-slot={adSlot}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default AdSense;
