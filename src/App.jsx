import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import { ThemeProvider, useTheme } from './ThemeContext';
import DayHeader from './DayHeader';
import Events from './Events';
import PeriodProgress from './PeriodProgress';
import PeriodTitleUpdater from './PeriodTitleUpdater';
import Schedule from './Schedule';
import NavBar from './NavBar';
import Admin from './Admin';
import Account from './Account';
import About from './About';
import AdComponent from './AdComponent';

function AppContent() {
  const { theme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [periodNames, setPeriodNames] = useState([
    "Period 1", "Period 2", "Period 3", "Period 4",
    "Period 5", "Period 6", "Period 7", "Period 8"
  ]);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      setUser(JSON.parse(savedUser));
    } else {
      // Clear expired session
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }

    // Load saved period names
    const savedPeriodNames = localStorage.getItem('periodNames');
    if (savedPeriodNames) {
      setPeriodNames(JSON.parse(savedPeriodNames));
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
      // Set expiry to 1 month from now
      const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('sessionExpiry', expiry.toString());
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }
  };

  const updatePeriodNames = (newNames) => {
    setPeriodNames(newNames);
    localStorage.setItem('periodNames', JSON.stringify(newNames));
  };

  const isAdminPage = location.pathname === '/admin';

  return (
    <div className={`App ${theme} flex flex-col min-h-screen ${isAdminPage ? 'overflow-auto' : 'overflow-hidden'}`}>
      <NavBar user={user} setUser={updateUser} />
      <PeriodTitleUpdater periodNames={periodNames} />
      <Routes>
        <Route path="/admin" element={<Admin user={user} />} />
        <Route path="/account" element={<Account user={user} periodNames={periodNames} setPeriodNames={updatePeriodNames} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/"
          element={
            <main className="flex-grow flex flex-col p-4 space-y-4 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                <DayHeader />
                <Schedule periodNames={periodNames} />
                <Events user={user} />
              </div>
              <PeriodProgress user={user} periodNames={periodNames} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                <AdComponent adSlot="1234567890" />
                <AdComponent adSlot="1234567891" />
                <AdComponent adSlot="1234567892" />
              </div>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
