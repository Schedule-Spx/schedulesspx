import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import DayHeader from './components/DayHeader';
import QuickLinks from './QuickLinks';
import PeriodProgress from './PeriodProgress';
import Schedule from './Schedule';
import GoogleSuiteLinks from './GoogleSuiteLinks';
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import TutorialModal from './components/TutorialModal';
import Announcement from './Announcement';
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper';

const preloadComponent = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

// Lazy-loaded components
const Admin = preloadComponent(() => import('./Admin'));
const Account = preloadComponent(() => import('./Account'));
const About = preloadComponent(() => import('./pages/About'));
const PrivacyPolicy = preloadComponent(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = preloadComponent(() => import('./pages/TermsAndConditions'));
const GoogleCalendar = preloadComponent(() => import('./components/GoogleCalendar'));

function ThemedApp() {
  const { currentTheme, changeTheme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [showTutorial, setShowTutorial] = useState(false);
  const contentRef = useRef(null);

  // Original heights
  const originalHeights = {
    scheduleHeight: 390,
    googleCalendarHeight: 300,
    dayHeaderHeight: 165,
    quickLinksHeight: 300,
    googleSuiteLinksHeight: 165,
    periodProgressHeight: 156,
  };

  useEffect(() => {
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

    const handleResize = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight - 64;
        if (contentHeight > windowHeight) {
          const scale = windowHeight / contentHeight;
          contentRef.current.style.transform = `scale(${scale})`;
          contentRef.current.style.transformOrigin = 'top center';
          contentRef.current.style.height = `${contentHeight}px`;
        } else {
          contentRef.current.style.transform = 'none';
          contentRef.current.style.height = 'auto';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Preload components
    Admin.preload();
    Account.preload();
    About.preload();
    PrivacyPolicy.preload();
    TermsAndConditions.preload();
    GoogleCalendar.preload();

    // Use Intersection Observer for lazy loading components
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('.lazy-load').forEach(el => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
          <div ref={contentRef} className="flex-grow overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route 
                  path="/admin" 
                  element={<Admin user={user} weekSchedule={weekSchedule} setWeekSchedule={setWeekSchedule} fetchSchedule={fetchSchedule} />} 
                />
                <Route 
                  path="/account" 
                  element={<Account user={user} weekSchedule={weekSchedule} />} 
                />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route
                  path="/main"
                  element={
                    user ? (
                      <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-4">
                          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left`} style={{ height: `${originalHeights.dayHeaderHeight}px` }}>
                            <DayHeader />
                          </div>
                          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left`} style={{ height: `${originalHeights.quickLinksHeight}px`, animationDuration: '2.5s' }}>
                            <QuickLinks />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col slide-down`} style={{ height: `${originalHeights.scheduleHeight}px` }}>
                            <Schedule weekSchedule={weekSchedule} />
                          </div>
                          <div className="slide-in-bottom">
                            <Announcement />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: `${originalHeights.googleCalendarHeight}px`, animationDuration: '2.5s' }}>
                            <Suspense fallback={<div>Loading Calendar...</div>}>
                              <GoogleCalendar />
                            </Suspense>
                          </div>
                          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right`} style={{ height: `${originalHeights.googleSuiteLinksHeight}px` }}>
                            <GoogleSuiteLinks />
                          </div>
                        </div>
                        <div className={`col-span-full ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container slide-up`} style={{ height: `${originalHeights.periodProgressHeight}px` }}>
                          <PeriodProgress weekSchedule={weekSchedule} />
                        </div>
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
            </Suspense>
          </div>
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
          <ServiceWorkerWrapper />
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
