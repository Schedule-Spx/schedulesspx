import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';
import LandingPage from './LandingPage';
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

function ThemedApp() {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
      const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('sessionExpiry', expiry.toString());
      navigate('/main');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }
  };

  return (
    <div className={`App flex flex-col min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <NavBar user={user} setUser={updateUser} />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/main" /> : <LandingPage setUser={updateUser} />} 
        />
        <Route 
          path="/main" 
          element={user ? (
            <main className="p-4 flex flex-col space-y-4 content-wrapper">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-4">
                  <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left`} style={{ height: '165px' }}>
                    <DayHeader />
                  </div>
                  <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left`} style={{ animationDuration: '2.5s' }}>
                    <QuickLinks />
                  </div>
                </div>
                <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col slide-down`} style={{ height: '400px' }}>
                  <Schedule weekSchedule={{}} />
                </div>
                <div className="flex flex-col space-y-4">
                  <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: '300px', animationDuration: '2.5s' }}>
                    <GoogleCalendar />
                  </div>
                  <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: '165px' }}>
                    <GoogleSuiteLinks />
                  </div>
                </div>
              </div>
              <div className={`w-full ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container slide-up`} style={{ height: '128px' }}>
                <PeriodProgress weekSchedule={{}} />
              </div>
            </main>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <p className="text-xl">Please sign in with Google to view this page.</p>
            </div>
          )}
        />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={user ? <Admin user={user} /> : <Navigate to="/" />} />
        <Route path="/account" element={user ? <Account user={user} /> : <Navigate to="/" />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </div>
  );
}

function AppContent() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
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
