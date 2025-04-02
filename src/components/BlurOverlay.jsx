// src/components/BlurOverlay.jsx
import React, { memo } from 'react';
import './BlurOverlay.css';

// Memoize the component to prevent unnecessary re-renders
const BlurOverlay = memo(() => (
  <div className="blur-overlay">
    <div className="overlay-message">
      You must log in to view this page
    </div>
  </div>
));

export default BlurOverlay;
