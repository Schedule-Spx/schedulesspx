// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import DayHeader from './DayHeader';
import QuickLinks from './QuickLinks';
import GoogleCalendar from './components/GoogleCalendar';
import PeriodProgress from './PeriodProgress';
import Schedule from './Schedule';
import GoogleSuiteLinks from './GoogleSuiteLinks';
import NavBar from './NavBar';
import Admin from './Admin';
import Account from './Account';
import About from './About';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import AgreementPopup from './components/AgreementPopup';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [showAgreement, setShowAgreement] = useState(false);

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
    <div className="App flex flex-col min-h-screen bg-stpius-blue text-stpius-white">
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
                <div className="flex flex-col space-y-4">
                  <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md overflow-hidden">
                    <DayHeader />
                  </div>
                  <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md overflow-hidden">
                    <QuickLinks />
                  </div>
                  <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md overflow-hidden">
                    <GoogleSuiteLinks />
                  </div>
                </div>
                <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md overflow-hidden">
                  <Schedule weekSchedule={weekSchedule} />
                </div>
                <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md overflow-hidden">
                  <GoogleCalendar />
                </div>
              </div>
              <div className="w-full mb-4">
                <PeriodProgress weekSchedule={weekSchedule} />
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
