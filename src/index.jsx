// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, useTheme } from './ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Root = () => {
  const { currentTheme } = useTheme();

  const getThemeClass = () => {
    switch (currentTheme.name.toLowerCase()) {
      case 'dark':
        return 'bg-theme-dark';
      case 'light':
        return 'bg-theme-light';
      case 'forest':
        return 'bg-theme-forest';
      case 'ocean':
        return 'bg-theme-ocean';
      case 'christmas':
        return 'bg-theme-christmas';
      case 'halloween':
        return 'bg-theme-halloween';
      case 'valentine\'s day':
        return 'bg-theme-valentines';
      case 'st. patrick\'s day':
        return 'bg-theme-stpatricks';
      case 'easter':
        return 'bg-theme-easter';
      case 'independence day':
        return 'bg-theme-independence';
      case 'thanksgiving':
        return 'bg-theme-thanksgiving';
      default:
        return 'bg-theme-default';
    }
  };

  return (
    <div className={`${getThemeClass()} min-h-screen`}>
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
