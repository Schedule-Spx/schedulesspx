import React, { lazy, Suspense, useState, useEffect, memo, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WeekScheduleProvider, useWeekSchedule } from './context/WeekScheduleContext';
import './styles/App.css';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import SnakeGamePopup from './components/SnakeGamePopup';
import ErrorBoundary from './components/ErrorBoundary';
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper';
import AttendanceReminderPopup from './components/AttendanceReminderPopup';
import { initGravityEffect } from './utils/aprilFools';

// Lazy load components to reduce initial bundle size
const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Banned = lazy(() => import('./pages/Banned'));
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const TeacherTools = lazy(() => import('./pages/TeacherTools'));
const News = lazy(() => import('./pages/News'));
const StudentTools = lazy(() => import('./pages/StudentTools'));
const ChangeLog = lazy(() => import('./pages/ChangeLog'));
const BoardMode = lazy(() => import('./pages/BoardMode'));
const MarchMadness = lazy(() => import('./pages/MarchMadness'));

// Loading fallback component
const LoadingFallback = memo(() => <div>Loading...</div>);

// Konami code sequence for easter egg
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

function AppContent() {
  const { user, isAuthorized, isAdmin, isStudent } = useAuth();
  const { weekSchedule, setWeekSchedule, fetchSchedule } = useWeekSchedule();
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [reminderPreference, setReminderPreference] = useState(user?.reminderPreference);

  // Create memoized handler for the key event
  const handleKeyDown = useCallback((event) => {
    setPressedKeys(prev => {
      const updated = [...prev, event.key];
      // Check for Konami code
      if (updated.join().includes(KONAMI_CODE.join())) {
        setShowSnakeGame(true);
      }
      // Keep only the last N keys where N is the length of the Konami code
      return updated.slice(-KONAMI_CODE.length);
    });
  }, []);

  // Setup key event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Teacher reminder timer
  useEffect(() => {
    if (!user?.isTeacher || !reminderPreference) return;
    
    const timer = setInterval(() => {
      setShowSnakeGame(true);
    }, 8 * 60 * 1000); // 8 minutes
    
    return () => clearInterval(timer);
  }, [user, reminderPreference]);

  // Handle banned users
  if (user?.isBanned) {
    return (
      <Router>
        <Routes>
          <Route path="/banned" element={<Banned />} />
          <Route path="*" element={<Navigate to="/banned" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <NavBar />
      <ServiceWorkerWrapper />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/banned" element={<Banned />} />
            <Route 
              path="/main" 
              element={
                <PrivateRoute>
                  <MainDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/board" 
              element={
                <PrivateRoute teacherToolsAccess>
                  <BoardMode />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute requireAuth adminOnly>
                  <ErrorBoundary>
                    <Suspense fallback={<div>Loading Admin...</div>}>
                      <Admin 
                        weekSchedule={weekSchedule} 
                        setWeekSchedule={setWeekSchedule} 
                        fetchSchedule={fetchSchedule}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/account" 
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/teacher-tools" 
              element={
                <PrivateRoute teacherToolsAccess>
                  <ErrorBoundary>
                    <Suspense fallback={<div>Loading Teacher Tools...</div>}>
                      <TeacherTools />
                    </Suspense>
                  </ErrorBoundary>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/student-tools" 
              element={
                <PrivateRoute requireAuth={isStudent() || isAdmin()}>
                  <ErrorBoundary>
                    <Suspense fallback={<div>Loading Student Tools...</div>}>
                      <StudentTools />
                    </Suspense>
                  </ErrorBoundary>
                </PrivateRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/news" element={<News />} />
            <Route path="/changelog" element={<ChangeLog />} />
            <Route path="/march-madness" element={<MarchMadness />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      
      {/* Conditionally render popups */}
      {showSnakeGame && <SnakeGamePopup />}
      {reminderPreference && <AttendanceReminderPopup onClose={() => setReminderPreference(false)} />}
    </Router>
  );
}

// Memoize the App component to prevent unnecessary re-renders
const App = memo(() => {
  const [rotation, setRotation] = useState(180); // Start upside down
  const [mouseMovement, setMouseMovement] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [buttonTimer, setButtonTimer] = useState(10);
  const [buttonsLocked, setButtonsLocked] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(Math.random() < 0.5 ? 'shimmy' : 'letitgrow');
  const videoRef = useRef(null);
  const [currentLang, setCurrentLang] = useState('en');
  const [isInverted, setIsInverted] = useState(true);
  const [showAprilFools, setShowAprilFools] = useState(false);

  const isMainPage = window.location.pathname === '/main';

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => prev + 67);
    }, 2000);

    const timerInterval = setInterval(() => {
      setButtonTimer(prev => {
        if (prev <= 1) {
          setButtonsLocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // All other intervals remain the same
    const videoSwitchInterval = setInterval(() => {
      setCurrentVideo(prev => prev === 'shimmy' ? 'letitgrow' : 'shimmy');
    }, 120000); // 2 minutes

    // Add language rotation interval
    const languageInterval = setInterval(() => {
      const languages = ['ar', 'zh', 'ja', 'ko', 'ru', 'hi', 'he', 'th'];
      const randomLang = languages[Math.floor(Math.random() * languages.length)];
      document.documentElement.lang = randomLang;
      document.documentElement.dir = ['ar', 'he'].includes(randomLang) ? 'rtl' : 'ltr';
      setCurrentLang(randomLang);
    }, 4000);

    const handleMouseMove = (e) => {
      if (showContent) { // Only handle mouse movement after initial message
        const speed = Math.abs(e.movementX);
        const multiplier = Math.min(5, 1 + (speed / 20));
        const newRotation = rotation + (-67 * multiplier * Math.sign(e.movementX));
        setRotation(newRotation);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(timerInterval);
      clearInterval(videoSwitchInterval);
      clearInterval(languageInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotation, showContent]); // Add dependencies

  // Fix invert toggle interval - separated from other effects for clarity
  useEffect(() => {
    const invertInterval = setInterval(() => {
      setIsInverted(prev => !prev);
    }, 4000); // Changed from 5000 to 4000 ms

    return () => {
      clearInterval(invertInterval);
    };
  }, []); // Remove rotation and showContent dependencies for invert effect

  const handleClick = (e) => {
    e.preventDefault();
    window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ErrorBoundary>
        <AuthProvider>
          <ThemeProvider>
            <WeekScheduleProvider>
              <>
                {/* Question mark icon - only when showContent is true and on main page */}
                {showContent && isMainPage && (
                  <div 
                    onClick={() => setShowAprilFools(true)}
                    style={{
                      position: 'fixed',
                      bottom: '10px',
                      right: '10px',
                      fontSize: '400px',
                      transform: 'scale(0.1)',
                      opacity: 0.15,
                      cursor: 'pointer',
                      zIndex: 10001,
                      color: 'white',
                      userSelect: 'none'
                    }}
                  >
                    ?
                  </div>
                )}

                {/* April Fools popup */}
                {showAprilFools && (
                  <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(45deg, #000000 0%, #0066cc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10002
                  }}>
                    <div style={{
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '10px',
                      maxWidth: '600px',
                      textAlign: 'center',
                      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                    }}>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'black' }}>
                        Happy April Fools!
                      </h2>
                      <p style={{ color: 'black', marginBottom: '2rem', lineHeight: '1.6' }}>
                        We're not actually shutting down. We just wanted to have some fun! Thanks for being a part of our community. Also, if you were wondering, no we didn't make money off targeted ads. Schedule SPX will remain ad free and functions off of donations!
                        <br /><br />
                        The website will return to normal later. Check back next period!
                      </p>
                      <button
                        onClick={() => setShowAprilFools(false)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#0066cc',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {!showContent ? (
                  // Initial message without invert
                  <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(45deg, #000000 0%, #0066cc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000
                  }}>
                    <div 
                      style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '10px',
                        maxWidth: '600px',
                        textAlign: 'center',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                      }}
                    >
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'black' }}>
                        Hello, SPX.
                      </h2>
                      <p style={{ color: 'black', marginBottom: '2rem', lineHeight: '1.6' }}>
                        The team at ScheduleSPX wanted to reach out and thank you for your time. we wanted to thank you for all the hours, periods, and days you had our site up for,{' '}
                        <span style={{ fontWeight: 'bold' }}>and the $100,000,000+ you made us through targeted ad revenue.</span>{' '}
                        Our monetary goal has been reached, and{' '}
                        <span style={{ color: '#0066cc', fontWeight: 'bold' }}>starting today we are shutting down this service</span>
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => !buttonsLocked && setShowContent(true)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: buttonsLocked ? '#999999' : '#0066cc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: buttonsLocked ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          {buttonsLocked ? `Wait ${buttonTimer}s...` : 'Donate'}
                        </button>
                        <button
                          onClick={() => !buttonsLocked && setShowContent(true)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: buttonsLocked ? '#999999' : '#000000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: buttonsLocked ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          {buttonsLocked ? `Wait ${buttonTimer}s...` : 'Use Schedule SPX one more time'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Main content with invert
                  <div style={{ filter: isInverted ? 'invert(1)' : 'none' }}>
                    {/* Existing video and content */}
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                        zIndex: -1,
                        pointerEvents: 'none'
                      }}
                    >
                      <source 
                        src={currentVideo === 'shimmy' 
                          ? "/shimmy shimmy ay shimmy ay shimmy ya.mp4" 
                          : "/Let it grow But it's deep fried.mp4"} 
                        type="video/mp4" 
                      />
                    </video>

                    <img
                      src="/Matthew_Lawson-Large.jpg"
                      alt="Sliding"
                      style={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '300px',
                        zIndex: 9999,
                        opacity: 0,
                        animation: 'slideAcross 10s linear 2s infinite'
                      }}
                    />

                    <img
                      src="/lebron.jpg"
                      alt="Sliding LeBron"
                      style={{
                        position: 'fixed',
                        height: '300px',
                        zIndex: 9999,
                        opacity: 0,
                        animation: 'slideDiagonal 10s linear 4s infinite'
                      }}
                    />

                    <img
                      src="/67.png"
                      alt="Sliding 67"
                      style={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '80vh',
                        zIndex: 9999,
                        opacity: 0,
                        animation: 'slideHuge 10s linear 10s infinite'
                      }}
                    />

                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        position: 'fixed',
                        width: '600px',  // Increased from 300px
                        height: '400px',  // Increased from 200px
                        zIndex: 9999,
                        opacity: 0,
                        animation: 'slideSpinningDiagonal 10s linear 6s infinite'
                      }}
                    >
                      <source src="/Frobbie Shoe Edit - Made with Clipchamp (1).mp4" type="video/mp4" />
                    </video>

                    <style>
                      {`
                        @keyframes slideAcross {
                          0% { right: -300px; opacity: 1; }
                          100% { right: 100vw; opacity: 1; }
                        }
                        @keyframes slideDiagonal {
                          0% { left: -300px; top: -300px; opacity: 1; }
                          100% { left: 100vw; top: 100vh; opacity: 1; }
                        }
                        @keyframes slideHuge {
                          0% { left: -80vh; opacity: 1; }
                          100% { left: 100vw; opacity: 1; }
                        }
                        @keyframes slideSpinningDiagonal {
                          0% { 
                            right: -600px; 
                            top: -400px; 
                            opacity: 1;
                            transform: rotate(0deg);
                          }
                          100% { 
                            right: 100vw; 
                            top: 100vh;
                            opacity: 1;
                            transform: rotate(720deg);
                          }
                        }
                      `}
                    </style>

                    <div 
                      onClick={handleClick}
                      style={{ 
                        transform: `rotate(${rotation}deg)`, 
                        minHeight: '100vh',
                        transition: 'transform 2s ease-in-out',
                        cursor: 'pointer'
                      }}
                    >
                      <div lang={currentLang}>
                        <AppContent />
                      </div>
                    </div>
                  </div>
                )}
              </>
            </WeekScheduleProvider>
          </ThemeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
});

export default App;
