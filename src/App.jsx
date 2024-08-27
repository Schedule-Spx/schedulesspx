// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import { useTheme } from './ThemeContext';
import DayHeader from './DayHeader';
import GoogleCalendar from './components/GoogleCalendar';
import PeriodProgress from './PeriodProgress';
import Schedule from './Schedule';
import NavBar from './NavBar';
import Admin from './Admin';
import Account from './Account';
import About from './About';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import AdComponent from './AdComponent';
import AgreementPopup from './components/AgreementPopup';

function AppContent() {
  const { theme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [showAgreement, setShowAgreement] = useState(false);
  const [customPeriodNames, setCustomPeriodNames] = useState({});

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }

    const hasAgreed = localStorage.getItem('agreedToTerms');
    if (!hasAgreed) {
      setShowAgreement(true);
    }

    fetchSchedule();
    loadCustomPeriodNames();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      console.log('Fetched schedule:', data);
      setWeekSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const loadCustomPeriodNames = () => {
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomPeriodNames(JSON.parse(savedNames));
    }
  };

  const updateCustomPeriodName = (originalName, customName) => {
    setCustomPeriodNames(prev => {
      const updated = { ...prev, [originalName]: customName };
      localStorage.setItem('customPeriodNames', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
      const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('sessionExpiry', expiry.toString());
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }
  };

  const handleAgree = () => {
    localStorage.setItem('agreedToTerms', 'true');
    setShowAgreement(false);
  };

  return (
    <div className={`App ${theme} flex flex-col min-h-screen`}>
      <NavBar user={user} setUser={updateUser} />
      {showAgreement && <AgreementPopup onAgree={handleAgree} />}
      <Routes>
        <Route 
          path="/admin" 
          element={
            <div className="flex-grow flex flex-col">
              <Admin 
                user={user} 
                weekSchedule={weekSchedule} 
                setWeekSchedule={setWeekSchedule} 
                fetchSchedule={fetchSchedule} 
              />
            </div>
          } 
        />
        <Route 
          path="/account" 
          element={
            <div className="flex-grow flex flex-col h-[calc(100vh-64px)]">
              <Account 
                user={user} 
                weekSchedule={weekSchedule}
                customPeriodNames={customPeriodNames}
                updateCustomPeriodName={updateCustomPeriodName}
              />
            </div>
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route
          path="/"
          element={
            <main className="flex-grow p-4 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <DayHeader />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <Schedule weekSchedule={weekSchedule} customPeriodNames={customPeriodNames} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <GoogleCalendar />
                </div>
              </div>
              <div className="w-full mb-4">
                <PeriodProgress weekSchedule={weekSchedule} customPeriodNames={customPeriodNames} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdComponent adSlot="1234567890" />
                <AdComponent adSlot="2345678901" />
                <AdComponent adSlot="3456789012" />
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
      <Router>
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
