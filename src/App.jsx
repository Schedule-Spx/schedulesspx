// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/App.css';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';

const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={user ? <MainDashboard /> : <Navigate to="/" />} />
          <Route path="/admin" element={user ? <Admin /> : <Navigate to="/" />} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </Suspense>
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
