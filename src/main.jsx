// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'
import logger from './utils/logger'

// Initialize the updateSW function immediately with optimized handler
window.updateSW = registerSW({
  onNeedRefresh() {
    // Only log if in development to save resources
    if (import.meta.env.MODE !== 'production') {
      logger.info('New content available')
    }
    // Signal to the ServiceWorkerWrapper that an update is available
    window.dispatchEvent(new CustomEvent('swUpdateAvailable'))
  },
  onOfflineReady() {
    if (import.meta.env.MODE !== 'production') {
      logger.info('App is ready for offline use')
    }
  },
  // Immediate registration
  immediate: true
})

// Create root once
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
