import React, { lazy, Suspense, useState, useEffect } from 'react';
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

const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const TeacherTools = lazy(() => import('./pages/TeacherTools'));

function AppContent() {
  const { user, isAuthorized, isAdmin } = useAuth();
  const { weekSchedule, setWeekSchedule, fetchSchedule } = useWeekSchedule();

  // State to manage showing the Snake game
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
  let pressedKeys = [];

  // Listen for the Konami code input
  useEffect(() => {
    const handleKeyDown = (event) => {
      pressedKeys.push(event.key);
      if (pressedKeys.join().includes(konamiCode.join())) {
        setShowSnakeGame(true); // Show the Snake game when Konami code is matched
      }
      if (pressedKeys.length > konamiCode.length) {
        pressedKeys.shift(); // Limit the pressedKeys array size
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <NavBar />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/main" 
              element={
                <PrivateRoute>
                  <MainDashboard />
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
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {/* Conditionally render the SnakeGamePopup */}
      {showSnakeGame && <SnakeGamePopup />}
    </Router>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <WeekScheduleProvider>
            <AppContent />
          </WeekScheduleProvider>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
