import React, { lazy, Suspense, useState, useEffect, memo, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

// Ban checker component to handle redirects smoothly
function BanChecker({ children }) {
  const { getBanStatus, shouldCheckBan } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!shouldCheckBan) return;
    
    const { isBanned, type } = getBanStatus();
    if (!isBanned) return;
    
    // If already on the correct ban page, don't redirect
    if (type === 'student' && location.pathname === '/banned') {
      return;
    }
    
    // Redirect to appropriate ban page
    navigate('/banned', { replace: true });
  }, [shouldCheckBan, getBanStatus, navigate, location.pathname]);
  
  return children;
}

function AppContent() {
  const { user, getBanStatus } = useAuth();
  const { weekSchedule, setWeekSchedule, fetchSchedule } = useWeekSchedule();
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  // Using keys state directly in the handler without storing them separately
  const [reminderPreference, setReminderPreference] = useState(user?.reminderPreference);
  const location = useLocation();
  
  // Create memoized handler for the key event
  const handleKeyDown = useCallback((event) => {
    // Track keys directly in the handler
    const keys = [];
    keys.push(event.key);
    
    // Check for Konami code
    if (keys.join().includes(KONAMI_CODE.join())) {
      setShowSnakeGame(true);
    }
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

  // Get ban status
  const { isBanned, type } = getBanStatus();
  
  // Only show nav bar if user is not banned
  const showNavBar = !isBanned || 
    (location.pathname === '/banned' && type === 'student');

  return (
    <>
      {showNavBar && <NavBar />}
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
                <PrivateRoute requireAuth={user?.isStudent || user?.isAdmin}>
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
          </Routes>
        </Suspense>
      </ErrorBoundary>
      
      {/* Conditionally render popups */}
      {showSnakeGame && <SnakeGamePopup />}
      {reminderPreference && <AttendanceReminderPopup onClose={() => setReminderPreference(false)} />}
    </>
  );
}

// Memoize the App component to prevent unnecessary re-renders
const App = memo(() => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ErrorBoundary>
        <AuthProvider>
          <ThemeProvider>
            <WeekScheduleProvider>
              <Router>
                <BanChecker>
                  <AppContent />
                </BanChecker>
              </Router>
            </WeekScheduleProvider>
          </ThemeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
});

export default App;
