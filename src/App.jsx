import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, useTheme } from './ThemeContext';
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
import LandingPage from './LandingPage';
import TutorialModal from './components/TutorialModal';
import Announcement from './Announcement'; // Importing the Announcement component

function ThemedApp() {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [showTutorial, setShowTutorial] = useState(false);

  const scheduleHeight = '400px';
  const googleCalendarHeight = '300px';

  useEffect(() => {
    console.log('Current Theme:', currentTheme); // Debug log
    console.log('Current Path:', location.pathname); // Debug log

    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchUserTheme(parsedUser.email);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }

    const tutorialShown = localStorage.getItem('tutorialShown');
    if (!tutorialShown && location.pathname === '/main') {
      setShowTutorial(true);
    }

    fetchSchedule();
  }, [location.pathname]);

  const fetchUserTheme = async (email) => {
    try {
      const response = await fetch(`https://schedule-api.devs4u.workers.dev/api/user-theme?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data.theme && data.theme.name) {
          changeTheme(data.theme.name.toLowerCase());
        }
      }
    } catch (error) {
      console.error('Error fetching user theme:', error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
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
      fetchUserTheme(newUser.email);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
      changeTheme('default');
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialShown', 'true');
  };

  return (
    <div className={`App flex flex-col min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      {showTutorial && <TutorialModal closeTutorial={closeTutorial} />} 
      {location.pathname === '/' ? (
        <LandingPage user={user} setUser={updateUser} />
      ) : (
        <>
          <NavBar user={user} setUser={updateUser} />
          <Routes>
            <Route 
              path="/admin" 
              element={
                <div className="flex flex-col">
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
                <div className="flex flex-col h-[calc(100vh-64px)]">
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
              path="/main"
              element={
                user ? (
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
                      <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col slide-down`} style={{ height: scheduleHeight }}>
                        <Schedule weekSchedule={weekSchedule} />
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: googleCalendarHeight, animationDuration: '2.5s' }}>
                          <GoogleCalendar />
                        </div>
                        <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: '165px' }}>
                          <GoogleSuiteLinks />
                        </div>
                      </div>
                    </div>
                    {/* Announcement Component */}
                    <div className="grid grid-cols-3 gap-4">
                      <div></div>
                      <Announcement />
                      <div></div>
                    </div>
                    <div className={`w-full ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container slide-up`} style={{ height: '128px' }}>
                      <PeriodProgress weekSchedule={weekSchedule} />
                    </div>
                    <div className="h-16"></div>
                  </main>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <h1 className="text-4xl font-bold">You must log in to view this page</h1>
                    <a href="/" className="mt-4 text-blue-500 underline">Go back to the landing page</a>
                  </div>
                )
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

function AppContent() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <ThemedApp />
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
