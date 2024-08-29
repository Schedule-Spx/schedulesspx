// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, useTheme } from './ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Root = () => {
  const { currentTheme } = useTheme();

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: currentTheme.main }} // Apply the theme's main background color
    >
      <App />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
