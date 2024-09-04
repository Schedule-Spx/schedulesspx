import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext'
import { registerSW } from 'virtual:pwa-register'

if ('serviceWorker' in navigator) {
  registerSW();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
