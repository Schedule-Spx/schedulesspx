// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <div className="main-background min-h-screen">
          <App />
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
