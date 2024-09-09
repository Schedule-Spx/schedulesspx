// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/App.css';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary'; // You'll need to create this

const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

function AppContent() {
  const { user, isAuthorized, isAdmin } = useAuth();

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
                      <Admin />
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
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
