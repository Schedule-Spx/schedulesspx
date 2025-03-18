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
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper';
import AttendanceReminderPopup from './components/AttendanceReminderPopup';

const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Banned = lazy(() => import('./pages/Banned')); // Ensure Banned page is imported
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const TeacherTools = lazy(() => import('./pages/TeacherTools'));
const News = lazy(() => import('./pages/News'));
const StudentTools = lazy(() => import('./pages/StudentTools'));
const ChangeLog = lazy(() => import('./pages/ChangeLog'));
const BoardMode = lazy(() => import('./pages/BoardMode')); // Import the BoardMode page
const MarchMadness = lazy(() => import('./pages/MarchMadness'));

function AppContent() {
  const { user, isAuthorized, isAdmin, isStudent } = useAuth();
  const { weekSchedule, setWeekSchedule, fetchSchedule } = useWeekSchedule();

  // State to manage showing the Snake game
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
  let pressedKeys = [];

  // State to manage the reminder preference
  const [reminderPreference, setReminderPreference] = useState(user?.reminderPreference);

  // Listen for the Konami code input
  useEffect(() => {
    const handleKeyDown = (event) => {
      pressedKeys.push(event.key);
      if (pressedKeys.join().includes(konamiCode.join())) {
        setShowSnakeGame(true);
      }
      if (pressedKeys.length > konamiCode.length) {
        pressedKeys.shift();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Use useEffect to trigger the reminder 8 minutes into every period
  useEffect(() => {
    const timer = setInterval(() => {
      if (user?.isTeacher && reminderPreference) {
        setShowSnakeGame(true);
      }
    }, 8 * 60 * 1000); // 8 minutes

    return () => clearInterval(timer);
  }, [user, reminderPreference]);

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
        <Suspense fallback={<div>Loading...</div>}>
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
            {/* Add Board Mode route */}
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

      {/* Conditionally render the SnakeGamePopup */}
      {showSnakeGame && <SnakeGamePopup />}
      {/* Conditionally render the AttendanceReminderPopup */}
      {reminderPreference && <AttendanceReminderPopup onClose={() => setReminderPreference(false)} />}
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
