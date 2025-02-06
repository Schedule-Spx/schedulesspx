this is my project, please read the contents and understand its functionality. once done, let me know and await my requests.

`.` (Root)
==============
- `.env`
- `.gitignore`
- `README.md`
- `index.html`
- `package.json`
- `postcss.config.js`
- `tailwind.config.js`
- `vite.config.js`

`src`
==============
  - `App.jsx`
  - `index.jsx`
  - `main.jsx`

  `assets`
  ==============
    - `Google Docs Icon.svg`
    - `Google Drive Icon.svg`
    - `Google Sheets Icon.svg`
    - `Google Slide Icon.svg`
    - `about section 1 img.png`
    - `about section 2 img.png`
    - `about section 3 img.png`
    - `about section 4 img.png`
    - `about section 5 img.png`
    - `about section 6 img.png`
    - `about section 7 img.png`
    - `logo.svg`
    - `splashscreengraphic.png`

    `CasinoSPX Assets`
    ==============
      - `background.jpg`
      - `blackjack.png`
      - `lion.png`
      - `poker.png`
      - `slots.png`

  `components`
  ==============
    - `AgreementPopup.jsx`
    - `BlurOverlay.jsx`
    - `DayHeader.jsx`
    - `ErrorBoundary.jsx`
    - `GoogleCalendar.jsx`
    - `GoogleLogin.jsx`
    - `LunchCountdown.jsx`
    - `NavBar.jsx`
    - `PeriodCustomization.jsx`
    - `PeriodProgress.jsx`
    - `PeriodRenamer.jsx`
    - `PopupMessage.jsx`
    - `PrivateRoute.jsx`
    - `QuickLinks.jsx`
    - `Schedule.jsx`
    - `ServiceWorkerWrapper.jsx`
    - `Snake.jsx`
    - `SnakeGamePopup.jsx`
    - `games.jsx`

    `StudentTools`
    ==============
      - `FinalGradeCalculator.jsx`

    `TeacherTools`
    ==============
      - `DiceRoller.jsx`
      - `GameSelector.jsx`
      - `GroupDivider.jsx`
      - `NamePicker.jsx`
      - `Timer.jsx`

  `context`
  ==============
    - `AuthContext.jsx`
    - `ThemeContext.jsx`
    - `WeekScheduleContext.jsx`

  `hooks`
  ==============
    - `useWeekSchedule.jsx`

  `layouts`
  ==============
    - `MainLayout.jsx`

  `pages`
  ==============
    - `About.jsx`
    - `Account.jsx`
    - `Admin.jsx`
    - `ChangeLog.jsx`
    - `Events.jsx`
    - `LandingPage.jsx`
    - `MainDashboard.jsx`
    - `News.jsx`
    - `PrivacyPolicy.jsx`
    - `StudentTools.jsx`
    - `TeacherTools.jsx`
    - `TermsAndConditions.jsx`

  `styles`
  ==============
    - `About.css`
    - `App.css`
    - `BlurOverlay.css`
    - `LandingPage.css`
    - `TutorialModal.css`
    - `carousel.css`
    - `index.css`

  `tests`
  ==============
    - `App.test.jsx`
    - `setupTests.jsx`

  `utils`
  ==============
    - `reportWebVitals.jsx`


## Included Files with Code

### index.html

``` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Schedule-SPX - Your school schedule management app" />
    <title>Schedule-SPX</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://apis.google.com">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### package.json

``` 
{
  "name": "scedule-spx",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "@jridgewell/sourcemap-codec": "^1.5.0",
    "@react-oauth/google": "*",
    "@tanstack/react-query": "*",
    "@tsparticles/engine": "^3.5.0",
    "@tsparticles/react": "^3.0.0",
    "axios": "^1.7.7",
    "framer-motion": "*",
    "glob": "^11.0.0",
    "jwt-decode": "*",
    "react": "*",
    "react-color": "*",
    "react-colorful": "*",
    "react-dom": "*",
    "react-router-dom": "*",
    "react-transition-group": "*",
    "rimraf": "^6.0.1",
    "rss-parser": "^3.13.0",
    "shadcn-ui": "^0.2.3",
    "socket.io-client": "*",
    "uuid": "^10.0.0",
    "web-vitals": "*"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "*",
    "@testing-library/react": "*",
    "@testing-library/user-event": "*",
    "@vitejs/plugin-react": "*",
    "@vitejs/plugin-react-swc": "*",
    "autoprefixer": "*",
    "postcss": "*",
    "tailwindcss": "*",
    "vite": "^5.4.10",
    "vite-plugin-aliases": "^0.0.1",
    "vite-plugin-compression": "*",
    "vite-plugin-image-optimizer": "^1.1.8",
    "vite-plugin-pwa": "*",
    "vitest": "*",
    "workbox-window": "*"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### postcss.config.js

``` 
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### src\App.jsx

``` 
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

const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const TeacherTools = lazy(() => import('./pages/TeacherTools'));
const News = lazy(() => import('./pages/News')); // Import the News component
const StudentTools = lazy(() => import('./pages/StudentTools')); // Import the StudentTools component
const ChangeLog = lazy(() => import('./pages/ChangeLog')); // Import the ChangeLog component

function AppContent() {
  const { user, isAuthorized, isAdmin, isStudent } = useAuth();
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
      <ServiceWorkerWrapper />
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
            <Route path="/news" element={<News />} /> {/* Add the News route */}
            <Route path="/changelog" element={<ChangeLog />} /> {/* Add the ChangeLog route */}
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
```

### src\components\AgreementPopup.jsx

``` 
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const AgreementPopup = ({ onAgree }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasViewedDocs, setHasViewedDocs] = useState(false);

  const handleLinkClick = (path) => {
    setHasViewedDocs(true);
    navigate(path);
  };

  const handleAgree = () => {
    onAgree();
    if (hasViewedDocs) {
      navigate('/');
    }
  };

  if (location.pathname === '/privacy' || location.pathname === '/terms') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${currentTheme.main} p-6 rounded-lg shadow-xl max-w-md w-full`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>Welcome to Schedule-SPX</h2>
        <p className={`mb-4 ${currentTheme.text}`}>
          Please read our{' '}
          <button 
            onClick={() => handleLinkClick('/terms')}
            className={`${currentTheme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Terms and Conditions
          </button>{' '}
          and{' '}
          <button 
            onClick={() => handleLinkClick('/privacy')}
            className={`${currentTheme.text} relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Privacy Policy
          </button>
          .
        </p>
        {hasViewedDocs && (
          <p className={`mb-4 ${currentTheme.text}`}>
            By using our service, you agree to our Terms and Conditions and Privacy Policy.
          </p>
        )}
        <button
          onClick={handleAgree}
          className={`${currentTheme.accent} hover:opacity-80 ${currentTheme.text} font-bold py-2 px-4 rounded transition-opacity duration-300`}
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default AgreementPopup;
```

### src\components\BlurOverlay.jsx

``` 
// src/components/BlurOverlay.jsx
import React from 'react';
import './BlurOverlay.css';

const BlurOverlay = () => {
  return (
    <div className="blur-overlay">
      <div className="overlay-message">
        You must log in to view this page
      </div>
    </div>
  );
};

export default BlurOverlay;
```

### src\components\DayHeader.jsx

``` 
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const DayHeader = () => {
  const { currentTheme } = useTheme();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dayName = daysOfWeek[currentDateTime.getDay()];
  const dateString = currentDateTime.toLocaleDateString();
  const timeString = currentDateTime.toLocaleTimeString();

  return (
    <div className={`rounded-lg shadow-md w-full border-2 ${currentTheme.border} ${currentTheme.main} relative`}>
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-5 flex flex-col items-center justify-center relative z-10">
        <div className={`text-2xl font-bold ${currentTheme.text} mb-2`}>{dayName}</div>
        <div className={`text-xl ${currentTheme.text} mb-2`}>{dateString}</div>
        <div className={`${currentTheme.accent} ${currentTheme.text} text-lg px-4 py-2 rounded`}>
          {timeString}
        </div>
      </div>
    </div>
  );
};

export default DayHeader;
```

### src\components\ErrorBoundary.jsx

``` 
// src/components/ErrorBoundary.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Caught an error:", error, errorInfo);
    // You can also log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`p-4 ${this.props.theme.main} ${this.props.theme.text}`}>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <details className="whitespace-pre-wrap">
            <summary className="cursor-pointer mb-2">Error details</summary>
            <p className="mb-2">{this.state.error && this.state.error.toString()}</p>
            <p className="text-sm">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks
const ErrorBoundary = (props) => {
  const { currentTheme } = useTheme();
  return <ErrorBoundaryClass {...props} theme={currentTheme} />;
};

export default ErrorBoundary;
```

### src\components\GoogleCalendar.jsx

``` 
// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const { currentTheme } = useTheme();
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
          {
            params: {
              key: API_KEY,
              timeMin: new Date().toISOString(),
              maxResults: 20,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        
        const groupedEvents = response.data.items.reduce((acc, event) => {
          const eventDate = new Date(event.start.dateTime || event.start.date);
          const localDate = new Date(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
          const dateString = localDate.toDateString();
          
          if (!acc[dateString]) {
            acc[dateString] = [];
          }
          acc[dateString].push(event);
          return acc;
        }, {});

        setEvents(groupedEvents);
      } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        setError(`Failed to fetch events: ${error.response?.data?.error?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleTimeString(undefined, options);
  };

  const filterEvents = (events) => {
    return events.filter(event => event.summary !== '8:00 am Start');
  };

  if (loading) return <div className={`p-4 ${currentTheme.text} text-center h-full flex items-center justify-center ${currentTheme.main} ${currentTheme.border} border-2 rounded-lg`}>Loading events...</div>;
  if (error) return <div className={`p-4 ${currentTheme.text} text-center h-full flex items-center justify-center ${currentTheme.main} ${currentTheme.border} border-2 rounded-lg`}>Error: {error}</div>;
  if (Object.keys(events).length === 0) return <div className={`p-4 ${currentTheme.text} text-center h-full flex items-center justify-center ${currentTheme.main} ${currentTheme.border} border-2 rounded-lg`}>No upcoming events</div>;

  return (
    <div 
      className={`${currentTheme.main} rounded-lg shadow-lg w-full h-full border-2 ${currentTheme.border} relative overflow-hidden`}
    >
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.2), transparent)`,
          zIndex: 0,
        }}
      ></div>
      <div className="p-4 overflow-y-auto relative z-10 h-full">
        {Object.entries(events).map(([date, dayEvents]) => {
          const filteredEvents = filterEvents(dayEvents);
          return (
            <div key={date} className="mb-4">
              {filteredEvents.length > 0 && (
                <>
                  <h3 className={`text-md font-semibold ${currentTheme.text} mb-2 text-center`} style={{ fontSize: '0.85rem', opacity: 0.8 }}>{formatDate(date)}</h3>
                  <ul className="space-y-2">
                    {filteredEvents.map((event) => (
                      <li 
                        key={event.id} 
                        className={`${currentTheme.accent} p-2 rounded shadow cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                        onClick={() => window.open(event.htmlLink, '_blank')}
                      >
                        <div className={`font-semibold ${currentTheme.text}`}>{event.summary}</div>
                        {event.start.dateTime && (
                          <div className={`text-sm ${currentTheme.text} opacity-80`}>
                            {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoogleCalendar;
```

### src\components\GoogleLogin.jsx

``` 
// GoogleLogin.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLogin = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login - Token Response:", tokenResponse);
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        console.log("Google Login - User Info:", userInfo);
        
        const userData = {
          name: userInfo.name,
          email: userInfo.email,
          profilePicture: userInfo.picture,
          accessToken: tokenResponse.access_token
        };
        console.log("Google Login - Passing user data to onLoginSuccess:", userData);
        onLoginSuccess(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <button onClick={() => login()} className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
```

### src\components\LunchCountdown.jsx

``` 
import React, { useState, useEffect } from 'react';

const LunchCountdown = ({ period }) => {
  const [timeUntilLunch, setTimeUntilLunch] = useState('');

  useEffect(() => {
    const calculateTimeUntilLunch = () => {
      const now = new Date();
      let lunchTime = new Date(now);

      if (period === '4') {
        lunchTime.setHours(11, 0, 0, 0); // Assuming lunch period 4 is at 11:00 AM
      } else if (period === '5') {
        lunchTime.setHours(12, 0, 0, 0); // Assuming lunch period 5 is at 12:00 PM
      } else if (period === '6') {
        lunchTime.setHours(13, 0, 0, 0); // Assuming lunch period 6 is at 1:00 PM
      }

      const diff = lunchTime - now;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      if (hours > 0) {
        setTimeUntilLunch(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilLunch(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeUntilLunch();
    const timer = setInterval(calculateTimeUntilLunch, 1000);

    return () => clearInterval(timer);
  }, [period]);

  return (
    <span className="relative z-10 text-center text-xs">
      {timeUntilLunch}
    </span>
  );
};

export default LunchCountdown;
```

### src\components\NavBar.jsx

``` 
"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleLogin from "./GoogleLogin";
import logo from "../assets/logo.svg";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

// Logout Icon Component
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// Account Icon Component
const AccountIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

const NavBar = () => {
  const { currentTheme } = useTheme();
  const { user, login, logout, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    console.log("NavBar - Login success, userData:", userData);
    login(userData);
  };

  const handleLogout = () => {
    console.log("NavBar - Logout clicked");
    logout();
    navigate("/");
  };

  const canAccessTeacherTools = () => {
    return user && (user.email.endsWith("@spx.org") || isAdmin());
  };

  const canAccessStudentTools = () => {
    return user && (isStudent() || isAdmin());
  };

  return (
    <div className={`${currentTheme.main} py-3`}>
      <div className="container mx-auto px-4">
        <div className={`
          relative rounded-lg border-2 ${currentTheme.border}
          overflow-hidden
        `}>
          {/* Shine Effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  45deg,
                  transparent 25%,
                  ${currentTheme.accent}15 45%,
                  ${currentTheme.accent}30 50%,
                  ${currentTheme.accent}15 55%,
                  transparent 75%
                )
              `,
              backgroundSize: '200% 200%',
              animation: 'shine 8s linear infinite',
            }}
          />

          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
              zIndex: 1
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex justify-between items-center h-[58px] px-8">
            {/* Left section */}
            <div className="flex items-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to="/" className="flex items-center whitespace-nowrap">
                  <img src={logo} alt="Schedule-SPX Logo" className="h-8 w-auto mr-2" />
                  <span className={`text-xl font-bold ${currentTheme.text}`}>Schedule-SPX</span>
                </Link>
              </motion.div>

              <div className="flex items-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/about" className={`text-sm font-medium ${currentTheme.text}`}>
                    About
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/news" className={`text-sm font-medium ${currentTheme.text}`}>
                    News
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  {canAccessTeacherTools() && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        to="/teacher-tools"
                        className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-1.5 px-3 rounded`}
                      >
                        Teacher Tools
                      </Link>
                    </motion.div>
                  )}

                  {canAccessStudentTools() && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        to="/student-tools"
                        className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-1.5 px-3 rounded`}
                      >
                        Student Tools
                      </Link>
                    </motion.div>
                  )}

                  {isAdmin() && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        to="/admin"
                        className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-1.5 px-3 rounded`}
                      >
                        Admin Console
                      </Link>
                    </motion.div>
                  )}

                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link to="/account">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center overflow-hidden ${currentTheme.accent} bg-opacity-20`}>
                          {user.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <AccountIcon />
                          )}
                        </div>
                      </Link>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`${currentTheme.accent} ${currentTheme.text} p-2 rounded-full hover:opacity-80 transition-opacity duration-200`}
                      onClick={handleLogout}
                      title="Logout"
                    >
                      <LogoutIcon />
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <GoogleLogin onLoginSuccess={handleLoginSuccess} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shine Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
```

### src\components\PeriodCustomization.jsx

``` 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PeriodCustomization = ({ initialPeriods, handleSave }) => {
  const { currentTheme } = useTheme();
  const [periods, setPeriods] = useState(initialPeriods || {});
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Update periods when initialPeriods changes
  useEffect(() => {
    if (initialPeriods) {
      setPeriods(initialPeriods);
    }
  }, [initialPeriods]);

  const handleInputChange = (periodKey, value) => {
    setPeriods(prev => ({
      ...prev,
      [periodKey]: value
    }));
  };

  const handleSaveClick = () => {
    try {
      setSaveStatus('saving');
      handleSave(periods);
      setSaveStatus('saved');
      setIsEditing(false);
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('Error saving period names:', error);
      setSaveStatus('error');
    }
  };

  const handleReset = () => {
    setPeriods({
      period1: 'Period 1',
      period2: 'Period 2',
      period3: 'Period 3',
      period4: 'Period 4',
      period5: 'Period 5',
      period6: 'Period 6',
      period7: 'Period 7',
      period8: 'Period 8'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-xl p-6 
        ${currentTheme.accent} bg-opacity-10
        border-2 ${currentTheme.border}
        relative overflow-hidden
      `}
    >
      {/* Shine Effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              45deg,
              transparent 25%,
              ${currentTheme.accent}15 45%,
              ${currentTheme.accent}30 50%,
              ${currentTheme.accent}15 55%,
              transparent 75%
            )
          `,
          backgroundSize: '200% 200%',
          animation: 'shine 8s linear infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
            Customize Period Names
          </h2>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className={`
                px-4 py-2 rounded-lg
                ${currentTheme.accent} ${currentTheme.text}
                hover:opacity-80 transition-opacity
              `}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </motion.button>
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className={`
                  px-4 py-2 rounded-lg
                  bg-red-500 text-white
                  hover:opacity-80 transition-opacity
                `}
              >
                Reset
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(periods).map(([periodKey, periodName]) => (
            <div key={periodKey} className="relative">
              <label
                className={`block text-sm font-medium mb-1 ${currentTheme.text}`}
                htmlFor={periodKey}
              >
                {periodKey.charAt(0).toUpperCase() + periodKey.slice(1)}
              </label>
              <input
                type="text"
                id={periodKey}
                value={periodName}
                onChange={(e) => handleInputChange(periodKey, e.target.value)}
                disabled={!isEditing}
                placeholder={`Enter ${periodKey} name`}
                className={`
                  w-full px-3 py-2 rounded-lg
                  ${currentTheme.main} ${currentTheme.text}
                  border ${currentTheme.border}
                  focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                `}
                maxLength={20}
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveClick}
              className={`
                px-6 py-2 rounded-lg
                bg-green-500 text-white
                hover:opacity-80 transition-opacity
                flex items-center space-x-2
              `}
            >
              <span>Save Changes</span>
              {saveStatus === 'saving' && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Status Messages */}
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-3 rounded-lg text-center
              ${saveStatus === 'saved' ? 'bg-green-500' : 'bg-red-500'}
              text-white
            `}
          >
            {saveStatus === 'saved' ? 'Changes saved successfully!' : 'Error saving changes'}
          </motion.div>
        )}
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default PeriodCustomization;
```

### src\components\PeriodProgress.jsx

``` 
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const PeriodProgress = ({ weekSchedule, lastSchoolDay }) => {
  const { currentTheme } = useTheme();
  const { user, isLoggedIn, isAuthorized } = useAuth();
  const [currentState, setCurrentState] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [customNames, setCustomNames] = useState({});

  useEffect(() => {
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomNames(JSON.parse(savedNames));
    }
  }, []);

  console.log("PeriodProgress - user:", user);
  console.log("PeriodProgress - isLoggedIn:", isLoggedIn());
  console.log("PeriodProgress - isAuthorized:", isAuthorized());
  console.log("PeriodProgress - user.isAuthorized:", user?.isAuthorized);

  const parseTime = useCallback((timeString) => {
    if (!timeString) return null;
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier?.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    else if (modifier?.toLowerCase() === 'am' && hours === 12) hours = 0;
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  }, []);

  const formatTimeRemaining = useCallback((ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }, []);

  const updateTitle = useCallback((status, time) => {
    document.title = time ? `${status} - ${time}` : 'Schedule-SPX';
  }, []);

  const getNextSchoolDay = useCallback((currentDay) => {
    let nextDay = DAYS[(DAYS.indexOf(currentDay) + 1) % 7];
    let count = 0;
    while (!weekSchedule[nextDay] && count < 7) {
      nextDay = DAYS[(DAYS.indexOf(nextDay) + 1) % 7];
      count++;
    }
    return count < 7 ? nextDay : null;
  }, [weekSchedule]);

  const getDayDifference = useCallback((day1, day2) => {
    return (DAYS.indexOf(day2) - DAYS.indexOf(day1) + 7) % 7;
  }, []);

  const calculateProgress = useCallback((startTime, endTime, now) => {
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    const progressPercentage = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(progressPercentage, 0), 100);
  }, []);

  const getLastSchoolDayEnd = useCallback(() => {
    if (!lastSchoolDay) return null;
    const endDate = new Date(lastSchoolDay);
    endDate.setHours(15, 0, 0, 0); // Set to 3 PM
    return endDate;
  }, [lastSchoolDay]);

  const handleSchoolDay = useCallback((schedule, now, currentDay) => {
    const lastSchoolDayEnd = getLastSchoolDayEnd();
    const schoolStartTime = parseTime(schedule[0].split(' - ')[1].split('-')[0].trim());
    
    const currentPeriodInfo = schedule.find(period => {
      const [, time] = period.split(' - ');
      const [start, end] = time.split('-').map(t => parseTime(t.trim()));
      return start && end && now >= start && now < end;
    });

    if (currentPeriodInfo) {
      const [name, time] = currentPeriodInfo.split(' - ');
      const [start, end] = time.split('-').map(t => parseTime(t.trim()));
      const progressPercentage = calculateProgress(start, end, now);
      const remaining = end - now;

      const customName = /^[1-8]$/.test(name) ? (customNames[`period${name}`] || name) : name;

      setCurrentState({ type: 'activePeriod', name: customName });
      setProgress(progressPercentage);
      setTimeRemaining(formatTimeRemaining(remaining));
      updateTitle(customName, formatTimeRemaining(remaining));
    } else {
      const nextPeriod = schedule.find(period => {
        const startTime = parseTime(period.split(' - ')[1].split('-')[0].trim());
        return startTime && now < startTime;
      });

      if (nextPeriod) {
        const [nextPeriodName, nextPeriodTime] = nextPeriod.split(' - ');
        const nextPeriodStart = parseTime(nextPeriodTime.split('-')[0].trim());
        const currentPeriodIndex = schedule.indexOf(nextPeriod) - 1;
        const previousPeriodEnd = currentPeriodIndex >= 0 
          ? parseTime(schedule[currentPeriodIndex].split(' - ')[1].split('-')[1].trim())
          : schoolStartTime;
        
        const progressPercentage = calculateProgress(previousPeriodEnd, nextPeriodStart, now);
        const timeUntilNext = nextPeriodStart - now;

        setCurrentState({ type: 'betweenPeriods', nextPeriod: nextPeriodName });
        setTimeRemaining(formatTimeRemaining(timeUntilNext));
        setProgress(progressPercentage);
        updateTitle(`Next: ${nextPeriodName}`, formatTimeRemaining(timeUntilNext));
      } else if (schedule[0] && now < parseTime(schedule[0].split(' - ')[1].split('-')[0].trim())) {
        const firstPeriodStart = parseTime(schedule[0].split(' - ')[1].split('-')[0].trim());
        const progressPercentage = calculateProgress(lastSchoolDayEnd, firstPeriodStart, now);
        const timeUntilStart = firstPeriodStart - now;

        setCurrentState({ type: 'beforeSchool', nextPeriod: schedule[0].split(' - ')[0] });
        setTimeRemaining(formatTimeRemaining(timeUntilStart));
        setProgress(progressPercentage);
        updateTitle('School starts in', formatTimeRemaining(timeUntilStart));
      } else {
        handleAfterSchool(now, currentDay);
      }
    }
  }, [parseTime, formatTimeRemaining, updateTitle, calculateProgress, getLastSchoolDayEnd, customNames]);

  const handleNonSchoolDay = useCallback((now, currentDay) => {
    const nextDay = getNextSchoolDay(currentDay);
    if (nextDay && weekSchedule[nextDay]?.[0]) {
      const nextDaySchedule = weekSchedule[nextDay];
      const nextSchoolStart = parseTime(nextDaySchedule[0].split(' - ')[1].split('-')[0].trim());
      const nextSchoolDay = new Date(now);
      nextSchoolDay.setDate(nextSchoolDay.getDate() + getDayDifference(currentDay, nextDay));
      nextSchoolDay.setHours(nextSchoolStart.getHours(), nextSchoolStart.getMinutes(), 0, 0);
      
      const lastSchoolDayEnd = getLastSchoolDayEnd();
      const timeUntilNextSchool = nextSchoolDay - now;
      const progressPercentage = calculateProgress(lastSchoolDayEnd, nextSchoolDay, now);

      setCurrentState({ type: 'nonSchoolDay', nextDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
      setProgress(progressPercentage);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
    } else {
      setCurrentState({ type: 'noSchool' });
      setTimeRemaining('');
      setProgress(100);
      updateTitle('No School', '');
    }
  }, [weekSchedule, getNextSchoolDay, getDayDifference, parseTime, formatTimeRemaining, updateTitle, calculateProgress, getLastSchoolDayEnd]);

  const handleAfterSchool = useCallback((now, currentDay) => {
    const nextDay = getNextSchoolDay(currentDay);
    if (nextDay && weekSchedule[nextDay]?.[0]) {
      const nextDaySchedule = weekSchedule[nextDay];
      const nextSchoolStart = parseTime(nextDaySchedule[0].split(' - ')[1].split('-')[0].trim());
      const nextSchoolDay = new Date(now);
      nextSchoolDay.setDate(nextSchoolDay.getDate() + getDayDifference(currentDay, nextDay));
      nextSchoolDay.setHours(nextSchoolStart.getHours(), nextSchoolStart.getMinutes(), 0, 0);
      
      const lastSchoolDayEnd = getLastSchoolDayEnd();
      const timeUntilNextSchool = nextSchoolDay - now;
      const progressPercentage = calculateProgress(lastSchoolDayEnd, nextSchoolDay, now);

      setCurrentState({ type: 'afterSchool', nextDay });
      setTimeRemaining(formatTimeRemaining(timeUntilNextSchool));
      setProgress(progressPercentage);
      updateTitle('Next school day', formatTimeRemaining(timeUntilNextSchool));
    } else {
      handleNonSchoolDay(now, currentDay);
    }
  }, [weekSchedule, getNextSchoolDay, parseTime, formatTimeRemaining, updateTitle, handleNonSchoolDay, calculateProgress, getDayDifference, getLastSchoolDayEnd]);

  useEffect(() => {
    const updateCurrentState = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const todaySchedule = weekSchedule[currentDay];

      if (Array.isArray(todaySchedule) && todaySchedule.length > 0) {
        handleSchoolDay(todaySchedule, now, currentDay);
      } else {
        handleNonSchoolDay(now, currentDay);
      }
    };

    const timer = setInterval(updateCurrentState, 1000);
    updateCurrentState(); // Initial update

    return () => clearInterval(timer);
  }, [weekSchedule, handleSchoolDay, handleNonSchoolDay]);

  const renderContent = useMemo(() => {
    if (!currentState) return null;

    const getStatusText = () => {
      switch (currentState.type) {
        case 'activePeriod':
          return `${currentState.name}`;
        case 'betweenPeriods':
          return `Next Period: ${currentState.nextPeriod}`;
        case 'beforeSchool':
          return `School starts in: ${timeRemaining}`;
        case 'afterSchool':
          return `School ended. Next school day: ${currentState.nextDay}`;
        case 'nonSchoolDay':
          return `No school today. Next school day: ${currentState.nextDay}`;
        case 'noSchool':
          return 'No school today';
        default:
          return '';
      }
    };

    return (
      <div className="flex flex-col items-center">
        <p className={`text-xl font-bold ${currentTheme.text} text-center mb-4`}>
          {getStatusText()}
        </p>
        <div className={`w-full bg-opacity-20 ${currentTheme.main} rounded-full h-6 mb-4 relative overflow-hidden`}>
          <div 
            className={`${currentTheme.accent} h-full rounded-full transition-all duration-1000 ease-in-out absolute top-0 left-0`} 
            style={{width: `${progress}%`}}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className={`text-sm font-semibold ${currentTheme.text} z-10`}>
              {progress.toFixed(1)}%
            </p>
          </div>
        </div>
        <p className={`text-lg font-medium ${currentTheme.text}`}>{timeRemaining}</p>
      </div>
    );
  }, [currentState, currentTheme, progress, timeRemaining]);

  if (!isLoggedIn()) {
    console.log("PeriodProgress - User not logged in");
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>Please log in to view the period progress.</p>
      </div>
    );
  }

  if (!isAuthorized()) {
    console.log("PeriodProgress - User not authorized");
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>You are not authorized to view the period progress.</p>
      </div>
    );
  }

  console.log("PeriodProgress - Rendering period progress");
  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative`}>
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0,
        }}
      ></div>
      <div className="p-5 relative z-10">
        {renderContent}
      </div>
    </div>
  );
};

export default PeriodProgress;
```

### src\components\PeriodRenamer.jsx

``` 
import React, { useState, useEffect } from 'react';
import PeriodCustomization from './PeriodCustomization';
import { useTheme } from '../context/ThemeContext';

const PeriodRenamer = () => {
  const { currentTheme } = useTheme();
  const [customNames, setCustomNames] = useState({
    period1: 'Period 1',
    period2: 'Period 2',
    period3: 'Period 3',
    period4: 'Period 4',
    period5: 'Period 5',
    period6: 'Period 6',
    period7: 'Period 7',
    period8: 'Period 8'
  });

  // Load saved names when component mounts
  useEffect(() => {
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomNames(JSON.parse(savedNames));
    }
  }, []);

  // Handler for saving period names
  const handleSaveNames = (updatedNames) => {
    setCustomNames(updatedNames);
    localStorage.setItem('customPeriodNames', JSON.stringify(updatedNames));
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${currentTheme.border} ${currentTheme.main}`}>
      <PeriodCustomization 
        initialPeriods={customNames} 
        handleSave={handleSaveNames}
      />
    </div>
  );
};

export default PeriodRenamer;
```

### src\components\PopupMessage.jsx

``` 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const PopupMessage = () => {
  const { currentTheme } = useTheme();
  const [popup, setPopup] = useState({ title: '', message: '', author: '', isActive: false });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup');
        if (response.ok) {
          const data = await response.json();
          setPopup(data);
          const lastDismissedPopup = localStorage.getItem('lastDismissedPopup');
          const currentPopup = JSON.stringify({ title: data.title, message: data.message, author: data.author });
          if (data.isActive && currentPopup !== lastDismissedPopup) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    };

    fetchPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    const currentPopup = JSON.stringify({ title: popup.title, message: popup.message, author: popup.author });
    localStorage.setItem('lastDismissedPopup', currentPopup);
  };

  if (!isVisible || !popup.message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className={`rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10 ${currentTheme.main} ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>{popup.title}</h2>
        <p className={`mb-6 whitespace-pre-wrap ${currentTheme.text}`}>{popup.message}</p>
        <p className={`text-sm mb-4 ${currentTheme.text}`}>- {popup.author}</p>
        <button 
          onClick={handleClose}
          className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded transition duration-300`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
```

### src\components\PrivateRoute.jsx

``` 
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requireAuth = false, adminOnly = false, teacherToolsAccess = false }) => {
  const { isLoggedIn, isAuthorized, isAdmin, user } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute - isLoggedIn:", isLoggedIn());
  console.log("PrivateRoute - isAuthorized:", isAuthorized());
  console.log("PrivateRoute - isAdmin:", isAdmin());
  console.log("PrivateRoute - requireAuth:", requireAuth);
  console.log("PrivateRoute - adminOnly:", adminOnly);
  console.log("PrivateRoute - teacherToolsAccess:", teacherToolsAccess);

  if (!isLoggedIn()) {
    console.log("PrivateRoute - Not logged in, redirecting to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAuth && !isAuthorized()) {
    console.log("PrivateRoute - User not authorized");
    return <Navigate to="/unauthorized" replace />;
  }

  if (adminOnly && !isAdmin()) {
    console.log("PrivateRoute - Admin access required but user is not admin");
    return <Navigate to="/unauthorized" replace />;
  }

  if (teacherToolsAccess && !(user.email.endsWith('@spx.org') || isAdmin())) {
    console.log("PrivateRoute - Teacher Tools access required but user is not eligible");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("PrivateRoute - User authorized, rendering children");
  return children;
};

export default PrivateRoute;
```

### src\components\QuickLinks.jsx

``` 
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const QuickLinks = () => {
  const { currentTheme } = useTheme();
  const [fadeIn, setFadeIn] = useState(Array(5).fill(false));

  useEffect(() => {
    const delays = [0, 0.1, 0.2, 0.3, 0.4]; // Faster delay times in seconds
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setFadeIn((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, delay * 1000);
    });
  }, []);

  const links = [
    { name: 'Canvas', url: 'https://stpius.instructure.com/' },
    { name: 'PowerSchool', url: 'https://powerschool.spx.org/public/' },
    { name: 'x2VOL', url: 'https://x2vol.com/' },
    { name: 'SPX Website', url: 'https://www.spx.org/' },
    { name: 'Sage Dining', url: 'https://www.sagedining.com/sites/stpiusxcatholichighschool/menu' }
  ];

  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative`}>
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-5 relative z-10">
        <h2 className={`text-xl font-bold ${currentTheme.text} mb-4 text-center`}>Quick Links</h2>
        <div className="space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${fadeIn[index] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 bg-opacity-100 ${currentTheme.main} ${currentTheme.text} brightness-125 font-semibold py-2 px-4 rounded transition-opacity duration-300 text-center block transform hover:scale-105 transition-transform duration-300 no-underline`}
              style={{ transition: 'opacity 1s ease-in-out, box-shadow 0.3s, transform 0.3s', transitionDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
```

### src\components\Schedule.jsx

``` 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Schedule = ({ weekSchedule }) => {
  const { currentTheme } = useTheme();
  const { user, isAuthorized } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const daySchedule = weekSchedule[currentDay] || [];
  const [customNames, setCustomNames] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setLoading(false);
    const savedNames = localStorage.getItem('customPeriodNames');
    if (savedNames) {
      setCustomNames(JSON.parse(savedNames));
    }
    return () => clearInterval(timer);
  }, []);

  console.log("Schedule - Current user:", user);
  console.log("Schedule - Is authorized:", isAuthorized());

  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours, 10);
    
    if (hours12 >= 12) {
      period = 'PM';
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }
    if (hours12 === 0) {
      hours12 = 12;
    }
    
    return `${hours12.toString().padStart(2, '0')}:${minutes} ${period}`;
  };

  const isActivePeriod = (start, end) => {
    if (!start || !end) return false;
    const now = currentTime;
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    return now >= startTime && now < endTime;
  };

  const parseTime = (timeString) => {
    if (!timeString) return null;
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours, 10), parseInt(minutes, 10));
  };

  if (!user || !isAuthorized()) {
    console.log("Schedule - User not authorized");
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>You are not authorized to view the schedule.</p>
      </div>
    );
  }

  console.log("Schedule - User authorized, rendering schedule");
  return (
    <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col`}>
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-4 flex flex-col h-full relative z-10">
        <h2 className={`text-xl font-bold ${currentTheme.text} mb-4 text-center`}>{currentDay}'s Schedule</h2>
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <div className={`${currentTheme.text} animate-pulse text-center`}>Loading schedule...</div>
          ) : daySchedule.length > 0 ? (
            <div className="space-y-2">
              {daySchedule.map((period, index) => {
                if (!period) return null; // Skip if period is undefined
                let name, start, end;
                if (typeof period === 'string') {
                  const parts = period.split(' - ');
                  name = parts[0];
                  if (parts[1]) {
                    [start, end] = parts[1].split('-');
                  }
                } else {
                  // Handle case where period might be an object
                  name = period.name;
                  start = period.start;
                  end = period.end;
                }
                if (!name || !start || !end) return null; // Skip if essential data is missing
                const active = isActivePeriod(start.trim(), end.trim());
                const customName = /^[1-8]$/.test(name) ? (customNames[`period${name}`] || name) : name;
                return (
                  <div 
                    key={index} 
                    className={`
                      relative flex justify-between items-center p-2 rounded-lg
                      ${active ? currentTheme.accent : `${currentTheme.main} bg-opacity-50`}
                      transition-all duration-300 ease-in-out
                      animate-fadeIn
                    `}
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div 
                      className={`
                        absolute inset-0 rounded-lg 
                        ${active ? 'animate-highlightFadeIn' : ''}
                      `}
                      style={{
                        animationDelay: `${(index * 50) + 300}ms`,
                        animationDuration: '1s',
                      }}
                    ></div>
                    <span className={`font-medium relative z-10 ${currentTheme.text} text-center`}>{customName}</span>
                    <span className={`relative z-10 ${currentTheme.text} ${active ? 'font-semibold' : 'opacity-80'} text-center`}>
                      {formatTime(start)} - {formatTime(end)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={`${currentTheme.text} animate-fadeIn text-center`}>No schedule available for today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
```

### src\components\ServiceWorkerWrapper.jsx

``` 
import React, { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

const ServiceWorkerWrapper = () => {
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');

      const handleWaitingWorker = (worker) => {
        setWaitingWorker(worker);
      };

      wb.addEventListener('waiting', () => handleWaitingWorker(wb));
      wb.register();
    }
  }, []);

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setWaitingWorker(null);
    window.location.reload();
  };

  return (
    waitingWorker && (
      <div className="update-notification">
        <p>A new version is available!</p>
        <button onClick={handleUpdate}>Update</button>
      </div>
    )
  );
};

export default ServiceWorkerWrapper;
```

### src\components\Snake.jsx

``` 
import React, { useEffect, useState, useCallback, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('snakeHighScores');
    return saved ? JSON.parse(saved) : { classic: 0, speed: 0, walls: 0, maze: 0 };
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameMode, setGameMode] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('green');
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Game settings
  const GRID_SIZE = 20;
  const CELL_SIZE = 25;
  const INITIAL_SPEED = 150;
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Game state refs
  const snakeRef = useRef([
    { x: 10, y: 10 }, // head
    { x: 9, y: 10 },  // body
    { x: 8, y: 10 }   // tail
  ]);
  const foodRef = useRef(null);
  const specialFoodRef = useRef(null);
  const directionRef = useRef({ x: 1, y: 0 });
  const lastDirectionRef = useRef({ x: 1, y: 0 });
  const lastRenderTimeRef = useRef(0);
  const wallsRef = useRef([]);
  const gameLoopRef = useRef(null);

  const colorSchemes = {
    green: {
      body: '#4CAF50',
      head: '#388E3C',
    },
    blue: {
      body: '#2196F3',
      head: '#1976D2',
    },
    red: {
      body: '#F44336',
      head: '#D32F2F',
    },
    purple: {
      body: '#9C27B0',
      head: '#7B1FA2',
    },
    rainbow: {
      body: '#random',
      head: '#random',
    },
  };

  const colorScheme = {
    snake: colorSchemes[selectedColor],
    food: '#FF5252',
    specialFood: '#FFD700',
    background: '#FAFAFA',
    grid: '#E0E0E0',
    walls: '#795548',
    text: '#333333',
  };

  const checkCollision = (head) => {
    // Check wall collision
    if (gameMode === 'walls' || gameMode === 'maze') {
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
      }
    }

    // Check self collision (skip the last segment as it will move)
    for (let i = 1; i < snakeRef.current.length - 1; i++) {
      if (head.x === snakeRef.current[i].x && head.y === snakeRef.current[i].y) {
        return true;
      }
    }

    // Check maze walls
    if (gameMode === 'maze') {
      return wallsRef.current.some(wall => wall.x === head.x && wall.y === head.y);
    }

    return false;
  };
  const generateWalls = useCallback(() => {
    const walls = [];
    if (gameMode === 'maze') {
      for (let i = 0; i < GRID_SIZE; i++) {
        if (i % 4 === 0) {
          for (let j = 0; j < GRID_SIZE - 2; j++) {
            walls.push({ x: i, y: j });
          }
        }
        if (i % 4 === 2) {
          for (let j = 2; j < GRID_SIZE; j++) {
            walls.push({ x: i, y: j });
          }
        }
      }
    }
    return walls;
  }, [gameMode]);

  const generateFood = useCallback(() => {
    let food;
    let isValidPosition = false;

    while (!isValidPosition) {
      food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };

      // Check if food position overlaps with snake
      const onSnake = snakeRef.current.some(
        segment => segment.x === food.x && segment.y === food.y
      );

      // Check if food position overlaps with walls
      const onWall = wallsRef.current.some(
        wall => wall.x === food.x && wall.y === food.y
      );

      if (!onSnake && !onWall) {
        isValidPosition = true;
      }
    }

    return food;
  }, []);

  const resetGame = useCallback(() => {
    // Cancel existing game loop
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }

    // Reset snake to initial position with 3 segments
    snakeRef.current = [
      { x: 10, y: 10 }, // head
      { x: 9, y: 10 },  // body
      { x: 8, y: 10 }   // tail
    ];
    
    directionRef.current = { x: 1, y: 0 };
    lastDirectionRef.current = { x: 1, y: 0 };
    foodRef.current = generateFood();
    specialFoodRef.current = null;
    wallsRef.current = generateWalls();
    lastRenderTimeRef.current = 0;
    
    setScore(0);
    setLevel(1);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setIsPaused(false);
    setIsGameStarted(true);

    // Start new game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [generateFood, generateWalls, gameLoop]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === ' ') {
      event.preventDefault();
      setIsPaused(prev => !prev);
      return;
    }

    if (event.key === 'r' && gameOver) {
      resetGame();
      return;
    }

    if (isPaused) return;

    const currentDirection = lastDirectionRef.current;
    let newDirection = { ...currentDirection };

    switch (event.key) {
      case 'ArrowUp':
        if (currentDirection.y === 0) {
          newDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (currentDirection.y === 0) {
          newDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (currentDirection.x === 0) {
          newDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (currentDirection.x === 0) {
          newDirection = { x: 1, y: 0 };
        }
        break;
      default:
        return;
    }

    // Only update direction if it's different
    if (newDirection.x !== currentDirection.x || 
        newDirection.y !== currentDirection.y) {
      directionRef.current = newDirection;
    }
  }, [gameOver, isPaused, resetGame]);

  const moveSnake = useCallback(() => {
    const newSnake = [...snakeRef.current];
    const head = { ...newSnake[0] };
    const direction = directionRef.current;

    // Update head position
    head.x += direction.x;
    head.y += direction.y;

    // Handle wrapping around the edges if not in walls mode
    if (gameMode !== 'walls' && gameMode !== 'maze') {
      if (head.x >= GRID_SIZE) head.x = 0;
      if (head.x < 0) head.x = GRID_SIZE - 1;
      if (head.y >= GRID_SIZE) head.y = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
    }

    // Check for collisions
    if (checkCollision(head)) {
      setGameOver(true);
      return false;
    }

    // Add new head
    newSnake.unshift(head);
    lastDirectionRef.current = direction;

    // Check for food collision
    let ate = false;
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      foodRef.current = generateFood();
      setScore(prev => prev + 1);
      ate = true;
      
      // Possibly spawn special food
      if (Math.random() < 0.2) {
        specialFoodRef.current = generateFood();
      }
    } else if (
      specialFoodRef.current &&
      head.x === specialFoodRef.current.x &&
      head.y === specialFoodRef.current.y
    ) {
      specialFoodRef.current = null;
      setScore(prev => prev + 5);
      ate = true;
    }

    // Remove tail if didn't eat
    if (!ate) {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    return true;
  }, [checkCollision, generateFood, gameMode]);
  const drawGame = useCallback((ctx) => {
    // Clear canvas
    ctx.fillStyle = colorScheme.background;
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE + 40);

    // Draw grid
    ctx.strokeStyle = colorScheme.grid;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Draw walls
    wallsRef.current.forEach(wall => {
      ctx.fillStyle = colorScheme.walls;
      ctx.fillRect(
        wall.x * CELL_SIZE,
        wall.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    // Draw snake with rounded corners and gradient
    snakeRef.current.forEach((segment, index) => {
      let fillStyle;
      if (selectedColor === 'rainbow') {
        const hue = (index * 15) % 360;
        fillStyle = `hsl(${hue}, 70%, 50%)`;
      } else {
        fillStyle = index === 0 ? colorScheme.snake.head : colorScheme.snake.body;
      }
      
      ctx.fillStyle = fillStyle;
      
      // Draw rounded rectangle for snake segments
      const radius = CELL_SIZE / 4;
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const width = CELL_SIZE - 2;
      const height = CELL_SIZE - 2;
      
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Add eyes if it's the head
      if (index === 0) {
        ctx.fillStyle = '#FFF';
        const eyeSize = CELL_SIZE / 6;
        const eyeOffset = CELL_SIZE / 3;
        
        // Left eye
        ctx.beginPath();
        ctx.arc(
          x + eyeOffset,
          y + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Right eye
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - eyeOffset,
          y + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    // Draw food with glow effect
    if (foodRef.current) {
      ctx.shadowColor = 'rgba(255, 82, 82, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = colorScheme.food;
      ctx.beginPath();
      ctx.arc(
        foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
        foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw special food with sparkle effect
    if (specialFoodRef.current) {
      ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
      ctx.shadowBlur = 15;
      ctx.fillStyle = colorScheme.specialFood;
      ctx.beginPath();
      ctx.arc(
        specialFoodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
        specialFoodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw score and level
    ctx.fillStyle = colorScheme.text;
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Score: ${score}`, 10, GRID_SIZE * CELL_SIZE + 25);
    ctx.fillText(`Level: ${level}`, GRID_SIZE * CELL_SIZE - 100, GRID_SIZE * CELL_SIZE + 25);
  }, [colorScheme, score, level, selectedColor]);

  const gameLoop = useCallback((timestamp) => {
    if (gameOver) {
      return;
    }

    if (isPaused) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!lastRenderTimeRef.current) {
      lastRenderTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastRenderTimeRef.current;

    if (elapsed > speed) {
      const continueGame = moveSnake();
      if (!continueGame) {
        // Update high score
        setHighScores(prev => ({
          ...prev,
          [gameMode]: Math.max(prev[gameMode], score)
        }));
        localStorage.setItem('snakeHighScores', JSON.stringify(highScores));
        return;
      }

      // Update level and speed
      if (score > 0 && score % 5 === 0) {
        setLevel(Math.floor(score / 5) + 1);
        setSpeed(prev => Math.max(prev * 0.95, 50));
      }

      lastRenderTimeRef.current = timestamp;
    }

    drawGame(ctx);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [drawGame, gameOver, isPaused, moveSnake, score, speed, gameMode, highScores]);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE + 40;

    resetGame();
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [handleKeyPress, resetGame]);

  return (
    <div style={{ 
      display: 'flex', 
      gap: '40px',
      padding: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      {/* Game Area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <canvas
          ref={canvasRef}
          style={{
            border: '3px solid #ccc',
            borderRadius: '10px',
            backgroundColor: colorScheme.background,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />

        {(gameOver || isPaused) && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}>
            <h2 style={{ margin: '0 0 20px 0' }}>{gameOver ? 'Game Over!' : 'Paused'}</h2>
            <p style={{ fontSize: '20px', margin: '10px 0' }}>Score: {score}</p>
            <p style={{ fontSize: '20px', margin: '10px 0' }}>Level: {level}</p>
            {gameOver && (
              <button
                onClick={resetGame}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                Play Again
              </button>
            )}
            <p style={{ marginTop: '20px', fontSize: '14px' }}>
              {gameOver ? 'Press R to restart' : 'Press SPACE to resume'}
            </p>
          </div>
        )}
      </div>

      {/* Controls Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '250px',
        marginTop: '40px', // Added margin to move controls down
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px',
        }}>
          <h2 style={{ margin: '0', color: '#333' }}>Game Settings</h2>
          <select 
            value={gameMode} 
            onChange={(e) => {
              setGameMode(e.target.value);
              resetGame();
            }}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <option value="classic">Classic Mode</option>
            <option value="speed">Speed Mode</option>
            <option value="walls">Wall Mode</option>
            <option value="maze">Maze Mode</option>
          </select>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <option value="green">Green Snake</option>
            <option value="blue">Blue Snake</option>
            <option value="red">Red Snake</option>
            <option value="purple">Purple Snake</option>
            <option value="rainbow">Rainbow Snake</option>
          </select>
        </div>

        <div style={{
          borderTop: '2px solid #eee',
          paddingTop: '20px',
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Controls</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '16px',
          }}>
            <p style={{ margin: 0 }}>↑ Up</p>
            <p style={{ margin: 0 }}>↓ Down</p>
            <p style={{ margin: 0 }}>← Left</p>
            <p style={{ margin: 0 }}>→ Right</p>
            <p style={{ margin: 0 }}>Space: Pause</p>
            <p style={{ margin: 0 }}>R: Restart</p>
          </div>
        </div>

        <div style={{
          borderTop: '2px solid #eee',
          paddingTop: '20px',
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Stats</h3>
          <p style={{ margin: '0 0 10px 0' }}><strong>Current Score:</strong> {score}</p>
          <p style={{ margin: '0 0 10px 0' }}><strong>Level:</strong> {level}</p>
          <p style={{ margin: '0 0 10px 0' }}><strong>High Score:</strong> {highScores[gameMode]}</p>
        </div>

        <div style={{
          backgroundColor: '#FFF9C4',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: 'auto',
        }}>
          <p style={{ 
            margin: 0, 
            color: '#FFA000',
            fontWeight: 'bold' 
          }}>
            Special gold food = 5 points!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
```

### src\components\SnakeGamePopup.jsx

``` 
import React, { useEffect, useState } from 'react';
import SnakeGame from './Snake';

const GamePopup = () => {
  const [showGames, setShowGames] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [codePosition, setCodePosition] = useState(0);
  
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight'
  ];

  const games = [
    {
      id: 'snake',
      title: 'Snake',
      description: 'Classic Snake Game',
      component: SnakeGame,
      props: {
        color1: "#248ec2",
        color2: "#1d355e",
        backgroundColor: "#ff0000"
      }
    },
    // Add more games here following the same structure
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === konamiCode[codePosition]) {
        const nextPosition = codePosition + 1;
        if (nextPosition === konamiCode.length) {
          setShowGames(true);
          setCodePosition(0);
        } else {
          setCodePosition(nextPosition);
        }
      } else {
        setCodePosition(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [codePosition, konamiCode]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  const handleClose = () => {
    setShowGames(false);
    setSelectedGame(null);
  };

  if (!showGames) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
    }}>
      {!selectedGame ? (
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '15px',
          padding: '2rem',
          width: '80%',
          maxWidth: '1200px',
          color: 'white',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h1 style={{ margin: 0 }}>Arcade Games</h1>
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => handleGameSelect(game)}
                style={{
                  backgroundColor: '#2a2a2a',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  ':hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <h3>{game.title}</h3>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ width: '90vw', height: '90vh', position: 'relative' }}>
          <button
            onClick={handleBack}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              zIndex: 1,
              padding: '0.5rem 1rem',
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Back to Games
          </button>
          <selectedGame.component {...selectedGame.props} />
        </div>
      )}
    </div>
  );
};

export default GamePopup;
```

### src\components\StudentTools\FinalGradeCalculator.jsx

``` 
import React, { useState } from 'react';

const FinalGradeCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalExamWeight, setFinalExamWeight] = useState('');
  const [requiredFinalExamGrade, setRequiredFinalExamGrade] = useState(null);

  const calculateFinalGrade = () => {
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalExamWeight) / 100;

    if (isNaN(current) || isNaN(desired) || isNaN(weight)) {
      alert('Please enter valid numbers');
      return;
    }

    const requiredGrade = (desired - (1 - weight) * current) / weight;
    setRequiredFinalExamGrade(requiredGrade.toFixed(2));
  };

  return (
    <div className="final-grade-calculator">
      <h2 className="text-2xl font-bold mb-4">Final Grade Calculator</h2>
      <div className="mb-4">
        <label className="block mb-2">Current Grade (%)</label>
        <input
          type="number"
          value={currentGrade}
          onChange={(e) => setCurrentGrade(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Desired Grade (%)</label>
        <input
          type="number"
          value={desiredGrade}
          onChange={(e) => setDesiredGrade(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Final Exam Weight (%)</label>
        <input
          type="number"
          value={finalExamWeight}
          onChange={(e) => setFinalExamWeight(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <button
        onClick={calculateFinalGrade}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Calculate
      </button>
      {requiredFinalExamGrade !== null && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Required Final Exam Grade: {requiredFinalExamGrade}%</h3>
        </div>
      )}
    </div>
  );
};

export default FinalGradeCalculator;
```

### src\components\TeacherTools\DiceRoller.jsx

``` 
// src/components/TeacherTools/DiceRoller.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const DiceRoller = () => {
  const { currentTheme } = useTheme();
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [diceType, setDiceType] = useState(6);
  const [results, setResults] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const diceTypes = [4, 6, 8, 10, 12, 20];

  const rollDice = () => {
    setIsRolling(true);
    setShowResults(false);
    
    setTimeout(() => {
      const newResults = Array.from({ length: numberOfDice }, () =>
        Math.floor(Math.random() * diceType) + 1
      );
      setResults(newResults);
      setIsRolling(false);
      setShowResults(true);
    }, 2000); // Increased spinning animation duration
  };

  const totalSum = results.reduce((sum, result) => sum + result, 0);

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Dice Roller</h2>
      <div className="mb-4">
        <label className="block mb-2">Number of Dice:</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setNumberOfDice(num)}
              className={`${
                numberOfDice === num ? currentTheme.accent : currentTheme.button
              } ${currentTheme.buttonText} px-3 py-1 rounded`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Dice Type:</label>
        <div className="flex flex-wrap gap-2">
          {diceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setDiceType(type)}
              className={`${
                diceType === type ? currentTheme.accent : currentTheme.button
              } ${currentTheme.buttonText} px-3 py-1 rounded`}
            >
              d{type}
            </button>
          ))}
        </div>
      </div>
      <button
        className={`${currentTheme.button} ${currentTheme.buttonText} px-4 py-2 rounded text-lg font-bold`}
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      {isRolling && (
        <div className="mt-8 flex justify-center items-center h-32">
          {Array.from({ length: numberOfDice }).map((_, index) => (
            <div key={index} className="animate-spin mx-4 text-6xl">
              🎲
            </div>
          ))}
        </div>
      )}

      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Results</h3>
            <div className="mb-4">
              {results.map((result, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {result}
                </span>
              ))}
            </div>
            <p className="text-xl font-bold text-gray-800">Total: {totalSum}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowResults(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  rollDice();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Roll Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
```

### src\components\TeacherTools\GameSelector.jsx

``` 
// src/components/TeacherTools/GameSelector.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const games = [
  { name: 'Kahoot!', url: 'https://kahoot.com/' },
  { name: 'Quizizz', url: 'https://quizizz.com/' },
  { name: 'Quizlet', url: 'https://quizlet.com/' },
  { name: 'Blooket', url: 'https://www.blooket.com/' },
  { name: 'Gimkit', url: 'https://www.gimkit.com/' },
];

const GameSelector = () => {
  const { currentTheme } = useTheme();
  const [selectedGame, setSelectedGame] = useState(null);

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGame(games[randomIndex]);
  };

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Random Game Selector</h2>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleRandomSelect}
          className={`${currentTheme.accent} ${currentTheme.text} px-6 py-3 text-lg font-semibold rounded-lg hover:opacity-80 transition-opacity duration-200 shadow-md`}
        >
          Choose Random Game
        </button>
      </div>
      {selectedGame && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4 transform transition-all duration-300 ease-in-out">
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Selected Game:</h3>
          <a 
            href={selectedGame.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 text-3xl font-bold block mb-4"
          >
            {selectedGame.name}
          </a>
          <p className="text-gray-700 text-lg">
            Click the game name above to visit its website and start playing!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameSelector;
```

### src\components\TeacherTools\GroupDivider.jsx

``` 
import React, { useState } from 'react';

const GroupDivider = () => {
  const [names, setNames] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [groups, setGroups] = useState([]);

  const handleInputChange = (e) => {
    setNames(e.target.value);
  };

  const handleGroupSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setGroupSize(value);
  };

  const divideIntoGroups = () => {
    const nameArray = names.split('\n').filter(name => name.trim() !== '');
    const shuffledNames = nameArray.sort(() => Math.random() - 0.5);
    const newGroups = [];

    for (let i = 0; i < shuffledNames.length; i += groupSize) {
      newGroups.push(shuffledNames.slice(i, i + groupSize));
    }

    setGroups(newGroups);
  };

  return (
    <div className="flex">
      {/* Left side for names input */}
      <div className="w-1/2 p-4">
        <textarea
          value={names}
          onChange={handleInputChange}
          className="w-full h-64 p-2 border rounded text-black"
          placeholder="Enter names (one per line and select number of people after entering names)"
        />
        <div className="mt-2 flex items-center">
          <input
            type="range"
            min="1"
            max={Math.max(1, names.split('\n').filter(name => name.trim() !== '').length)}
            value={groupSize}
            onChange={handleGroupSizeChange}
            className="w-full"
          />
          <input
            type="number"
            min="1"
            max={Math.max(1, names.split('\n').filter(name => name.trim() !== '').length)}
            value={groupSize}
            onChange={handleGroupSizeChange}
            className="w-16 ml-2 p-1 border rounded text-center text-black"
          />
        </div>
        <button
          onClick={divideIntoGroups}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Divide into Groups
        </button>
      </div>

      {/* Right side for displaying groups */}
      <div className="w-1/2 p-4">
        {groups.length > 0 && groups.map((group, index) => (
          <div key={index} className="mb-4 p-2 border rounded">
            <h3 className="font-bold">Group {index + 1}</h3>
            <ul>
              {group.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDivider;
```

### src\components\TeacherTools\NamePicker.jsx

``` 
// src/components/TeacherTools/NamePicker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const tailwindColors = {
  'red-500': '#ef4444',
  'pink-500': '#ec4899',
  'purple-500': '#a855f7',
  'indigo-500': '#6366f1',
  'blue-500': '#3b82f6',
  'cyan-500': '#06b6d4',
  'teal-500': '#14b8a6',
  'green-500': '#22c55e',
  'lime-500': '#84cc16',
  'yellow-500': '#eab308',
  'amber-500': '#f59e0b',
  'orange-500': '#f97316'
};

const NamePicker = () => {
  const { currentTheme } = useTheme();
  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const wheelRef = useRef(null);
  const canvasRef = useRef(null);

  const tailwindGradients = [
    ['from-red-500 to-pink-500', 'from-pink-500 to-purple-500'],
    ['from-purple-500 to-indigo-500', 'from-indigo-500 to-blue-500'],
    ['from-blue-500 to-cyan-500', 'from-cyan-500 to-teal-500'],
    ['from-teal-500 to-green-500', 'from-green-500 to-lime-500'],
    ['from-lime-500 to-yellow-500', 'from-yellow-500 to-amber-500'],
    ['from-amber-500 to-orange-500', 'from-orange-500 to-red-500'],
  ];

  const getRandomGradients = (count) => {
    const shuffled = tailwindGradients.flat().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    drawWheel();
  }, [names]);

  useEffect(() => {
    if (isSpinning) {
      const spinDuration = 5000;
      const spinRevolutions = 5;
      const randomStopAngle = Math.random() * 360;
      const totalRotation = spinRevolutions * 360 + randomStopAngle;
      
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

      setTimeout(() => {
        setIsSpinning(false);
        const selectedIndex = Math.floor(randomStopAngle / (360 / names.length));
        setSelectedName(names[selectedIndex]);
        setShowNotification(true);
      }, spinDuration);
    }
  }, [isSpinning, names]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (names.length === 0) {
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      return;
    }

    const sliceAngle = (2 * Math.PI) / names.length;
    const gradients = getRandomGradients(names.length);

    names.forEach((name, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;

      // Create gradient
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + radius * Math.cos((startAngle + endAngle) / 2),
        centerY + radius * Math.sin((startAngle + endAngle) / 2)
      );
      const [fromColor, toColor] = gradients[index].split(' ');
      gradient.addColorStop(0, tailwindColors[fromColor.split('-')[1] + '-500']);
      gradient.addColorStop(1, tailwindColors[toColor.split('-')[1] + '-500']);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px "Inter", "Roboto", "Helvetica", "Arial", sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(name, radius - 15, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const newNames = e.target.value.split('\n').filter(name => name.trim() !== '');
    setNames(newNames);
  };

  const handleSpin = () => {
    if (names.length > 1 && !isSpinning) {
      setIsSpinning(true);
      setSelectedName('');
    }
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleRemove = () => {
    setNames(names.filter(name => name !== selectedName));
    setInputValue(names.filter(name => name !== selectedName).join('\n'));
    setShowNotification(false);
  };

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Name Picker</h2>
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/3 pr-4 mb-4 md:mb-0">
          <div className="relative w-80 h-80 mx-auto mb-4" onClick={handleSpin}>
            <div
              ref={wheelRef}
              className="absolute w-full h-full cursor-pointer"
            >
              <canvas ref={canvasRef} width="400" height="400" className="w-full h-full" />
            </div>
            <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M0 10 L10 0 L10 20 Z" fill="red" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            className={`${currentTheme.input} rounded px-2 py-1 mb-2 flex-grow`}
            placeholder="Enter names (one per line)"
            style={{ resize: 'none', color: 'black' }}
          />
        </div>
      </div>
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${currentTheme.main} rounded-lg shadow-xl overflow-hidden max-w-sm w-full`}>
            <div className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2`}>
              <h3 className="text-lg font-semibold">Winner!</h3>
            </div>
            <div className="p-4">
              <p className={`text-xl font-bold mb-4 ${currentTheme.text}`}>{selectedName}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleClose}
                  className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80 transition-opacity duration-200`}
                >
                  Close
                </button>
                <button
                  onClick={handleRemove}
                  className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80 transition-opacity duration-200`}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NamePicker;
```

### src\components\TeacherTools\Timer.jsx

``` 
// src/components/TeacherTools/Timer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Timer = () => {
  const { currentTheme } = useTheme();
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState('05:00');
  const inputRef = useRef(null);

  const presets = [
    { name: '1 min', seconds: 60 },
    { name: '5 min', seconds: 300 },
    { name: '10 min', seconds: 600 },
    { name: '15 min', seconds: 900 },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => {
          const newTime = time - 1;
          setInputTime(formatTime(newTime));
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(300);
    setInputTime('05:00');
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleInputBlur = () => {
    const [mins, secs] = inputTime.split(':').map(Number);
    if (!isNaN(mins) && !isNaN(secs)) {
      const totalSeconds = mins * 60 + secs;
      setTime(totalSeconds);
      setInputTime(formatTime(totalSeconds));
    } else {
      setInputTime(formatTime(time));
    }
  };

  const handlePresetClick = (seconds) => {
    setTime(seconds);
    setInputTime(formatTime(seconds));
    setIsActive(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Timer</h2>
      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={inputTime}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`text-4xl w-32 text-center ${currentTheme.input} rounded`}
          style={{ color: 'black' }}
        />
      </div>
      <div className="mb-4">
        <button
          className={`${currentTheme.button} ${currentTheme.buttonText} px-4 py-2 rounded mr-2`}
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className={`${currentTheme.button} ${currentTheme.buttonText} px-4 py-2 rounded`}
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        {presets.map((preset) => (
          <button
            key={preset.name}
            className={`${currentTheme.button} ${currentTheme.buttonText} px-3 py-1 rounded text-sm`}
            onClick={() => handlePresetClick(preset.seconds)}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;
```

### src\components\games.jsx

``` 
const games = [
    {
      id: 'snake',
      title: 'Snake',
      description: 'Classic Snake Game',
      component: SnakeGame,
      props: {
        color1: "#248ec2",
        color2: "#1d355e",
        backgroundColor: "#ff0000"
      }
    },
    {
      id: 'tetris',
      title: 'Tetris',
      description: 'Classic Tetris Game',
      component: TetrisGame, // You'll need to import this
      props: {
        // Tetris-specific props
      }
    },
    // Add more games...
  ];
  ```

### src\context\AuthContext.jsx

``` 
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }
  }, []);

  const login = (userData) => {
    const authorizedUser = {
      ...userData,
      isAuthorized: isAuthorizedEmail(userData.email),
      isAdmin: isAdminEmail(userData.email),
      isStudent: isStudentEmail(userData.email)
    };
    setUser(authorizedUser);
    localStorage.setItem('user', JSON.stringify(authorizedUser));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem('sessionExpiry', expiry.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  };

  const isAuthorizedEmail = (email) => {
    const allowedDomains = ['spx.org', 'spxstudent.org'];
    const allowedEmails = ['kagenmjensen@me.com',];
    return allowedDomains.includes(email.split('@')[1].toLowerCase()) || allowedEmails.includes(email.toLowerCase());
  };

  const isAdminEmail = (email) => {
    const adminEmails = ['kagenmjensen@me.com',"dcamick25@spxstudent.org","lfarrell@spx.org","rpage27@spxstudent.org"];
    return adminEmails.includes(email.toLowerCase());
  };

  const isStudentEmail = (email) => {
    const studentDomains = ['spxstudent.org'];
    return studentDomains.includes(email.split('@')[1].toLowerCase());
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const isAuthorized = () => {
    return user && user.isAuthorized;
  };

  const isAdmin = () => {
    return user && user.isAdmin;
  };

  const isStudent = () => {
    return user && user.isStudent;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAuthorized, isAdmin, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

### src\context\ThemeContext.jsx

``` 
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default',
    main: 'bg-stpius-blue',
    accent: 'bg-stpius-gold',
    text: 'text-stpius-white',
    border: 'border-stpius-gold',
  },
  dark: {
    name: 'Dark',
    main: 'bg-gray-900',
    accent: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-600',
  },
  light: {
    name: 'Light',
    main: 'bg-gray-100',
    accent: 'bg-gray-300',
    text: 'text-gray-900',
    border: 'border-gray-300',
  },
  forest: {
    name: 'Forest',
    main: 'bg-green-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
  },
  ocean: {
    name: 'Ocean',
    main: 'bg-blue-800',
    accent: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-500',
  },
  sunset: {
    name: 'Sunset',
    main: 'bg-orange-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-red-400',
  },
  lavender: {
    name: 'Lavender',
    main: 'bg-purple-400',
    accent: 'bg-purple-200',
    text: 'text-gray-800',
    border: 'border-purple-300',
  },
  mint: {
    name: 'Mint',
    main: 'bg-green-400',
    accent: 'bg-green-200',
    text: 'text-gray-800',
    border: 'border-green-300',
  },
  cherry: {
    name: 'Cherry',
    main: 'bg-red-600',
    accent: 'bg-pink-300',
    text: 'text-white',
    border: 'border-red-400',
  },
  coffee: {
    name: 'Coffee',
    main: 'bg-yellow-900',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-yellow-700',
  },
  retro: {
    name: 'Retro',
    main: 'bg-[#403D39]', 
    accent: 'bg-[#EB5E28]', 
    text: 'text-[#FFFCF2]', 
    border: 'border-[#CCC5B9]', 
  },
  skyblue: {
    name: 'Sky Blue',
    main: 'bg-blue-400',
    accent: 'bg-blue-200',
    text: 'text-gray-800',
    border: 'border-blue-300',
  },
  coral: {
    name: 'Coral',
    main: 'bg-red-400',
    accent: 'bg-orange-300',
    text: 'text-white',
    border: 'border-red-300',
  },
  emerald: {
    name: 'Emerald',
    main: 'bg-green-600',
    accent: 'bg-green-400',
    text: 'text-white',
    border: 'border-green-500',
  },
  amethyst: {
    name: 'Amethyst',
    main: 'bg-purple-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-purple-500',
  },
  golden: {
    name: 'Golden',
    main: 'bg-yellow-600',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500',
  },
  silver: {
    name: 'Silver',
    main: 'bg-gray-300',
    accent: 'bg-gray-200',
    text: 'text-gray-800',
    border: 'border-gray-400',
  },
  bronze: {
    name: 'Bronze',
    main: 'bg-yellow-800',
    accent: 'bg-yellow-700',
    text: 'text-white',
    border: 'border-yellow-600',
  },
  candycane: {
  name: 'Candy Cane',
  main: 'bg-[#FFFAF0]', 
  accent: 'bg-[#FF3B3F]', 
  text: 'text-[#2C2C2C]', 
  border: 'border-[#FF3B3F]', 
},
  halloween: {
    name: 'Halloween',
    main: 'bg-orange-600',
    accent: 'bg-purple-700',
    text: 'text-white',
    border: 'border-black',
  },
  valentinesday: {
    name: "Valentine's Day",
    main: 'bg-pink-500',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-300',
  },
  stpatricksday: {
    name: "St. Patrick's Day",
    main: 'bg-green-600',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-green-300',
  },
  easter: {
    name: 'Easter',
    main: 'bg-purple-400',
    accent: 'bg-yellow-300',
    text: 'text-gray-800',
    border: 'border-pink-300',
  },
  independenceday: {
    name: 'Independence Day',
    main: 'bg-blue-700',
    accent: 'bg-red-600',
    text: 'text-white',
    border: 'border-white',
  },
  thanksgiving: {
    name: 'Thanksgiving',
    main: 'bg-orange-700',
    accent: 'bg-yellow-600',
    text: 'text-white',
    border: 'border-brown-400',
  },
  laborday: {
    name: 'Labor Day',
    main: 'bg-blue-500',
    accent: 'bg-red-500',
    text: 'text-white',
    border: 'border-white',
  },
  stpiusx: {
    name: 'St. Pius X',
    main: 'bg-[#001F3F]', // Navy Blue
    accent: 'bg-[#B98827]', // Gold
    text: 'text-white',
    border: 'border-[#B98827]',
  },
  popefrancis: {
    name: 'Pope Francis',
    main: 'bg-white',
    accent: 'bg-yellow-400',
    text: 'text-gray-900',
    border: 'border-yellow-500',
  },
  popejohnpaulii: {
    name: 'Pope John Paul II',
    main: 'bg-red-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-yellow-400',
  },
  popebenedictxvi: {
    name: 'Pope Benedict XVI',
    main: 'bg-red-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500',
  },
  popeleoxiii: {
    name: 'Pope Leo XIII',
    main: 'bg-blue-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-yellow-500',
  },
  poepiusx: {
    name: 'Pope Pius X',
    main: 'bg-white',
    accent: 'bg-red-600',
    text: 'text-gray-900',
    border: 'border-red-500',
  },
  allsaints: {
    name: 'All Saints',
    main: 'bg-yellow-300',
    accent: 'bg-white',
    text: 'text-gray-900',
    border: 'border-yellow-400',
  },
  immaculateconception: {
    name: 'Immaculate Conception',
    main: 'bg-blue-500',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-300',
  },
  sacredheart: {
    name: 'Sacred Heart',
    main: 'bg-red-700',
    accent: 'bg-yellow-300',
    text: 'text-white',
    border: 'border-yellow-400',
  },
  stjoseph: {
    name: 'St. Joseph',
    main: 'bg-teal-700',
    accent: 'bg-yellow-500',
    text: 'text-white',
    border: 'border-yellow-600',
  },
  stpeter: {
    name: 'St. Peter',
    main: 'bg-red-700',
    accent: 'bg-gold-400',
    text: 'text-white',
    border: 'border-red-600',
  },
  stpaul: {
    name: 'St. Paul',
    main: 'bg-purple-800',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-purple-600',
  },
  stmichael: {
    name: 'St. Michael',
    main: 'bg-blue-600',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-blue-700',
  },
  sttherese: {
    name: 'St. Thérèse',
    main: 'bg-pink-600',
    accent: 'bg-red-300',
    text: 'text-white',
    border: 'border-pink-500',
  },
  stfrancisassisi: {
    name: 'St. Francis of Assisi',
    main: 'bg-brown-800',
    accent: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-400',
  },
  stmary: {
    name: 'St. Mary',
    main: 'bg-blue-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-500',
  },
  staugustine: {
    name: 'St. Augustine',
    main: 'bg-yellow-800',
    accent: 'bg-black',
    text: 'text-white',
    border: 'border-yellow-600',
  },
  stbenedict: {
    name: 'St. Benedict',
    main: 'bg-black',
    accent: 'bg-red-700',
    text: 'text-white',
    border: 'border-red-600',
  },
  stjohn: {
    name: 'St. John the Apostle',
    main: 'bg-blue-800',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-blue-600',
  },
  stclare: {
    name: 'St. Clare',
    main: 'bg-purple-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-purple-500',
  },
  stignatius: {
    name: 'St. Ignatius of Loyola',
    main: 'bg-red-800',
    accent: 'bg-gold-600',
    text: 'text-white',
    border: 'border-red-700',
  },
  stcatherine: {
    name: 'St. Catherine of Siena',
    main: 'bg-purple-700',
    accent: 'bg-yellow-400',
    text: 'text-white',
    border: 'border-purple-600',
  },
  stthereseavilla: {
    name: 'St. Thérèse of Ávila',
    main: 'bg-teal-600',
    accent: 'bg-purple-400',
    text: 'text-white',
    border: 'border-teal-500',
  },
  stsimon: {
    name: 'St. Simon',
    main: 'bg-green-700',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-green-600',
  },
  stvincent: {
    name: 'St. Vincent de Paul',
    main: 'bg-blue-600',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-blue-500',
  },
  stlucy: {
    name: 'St. Lucy',
    main: 'bg-pink-700',
    accent: 'bg-red-400',
    text: 'text-white',
    border: 'border-pink-500',
  },
  stpatrick: {
    name: 'St. Patrick',
    main: 'bg-green-700',
    accent: 'bg-white',
    text: 'text-white',
    border: 'border-green-500',
  },
  stanthony: {
    name: 'St. Anthony of Padua',
    main: 'bg-brown-700',
    accent: 'bg-gold-500',
    text: 'text-white',
    border: 'border-brown-600',
  },
  stjames: {
    name: 'St. James',
    main: 'bg-red-600',
    accent: 'bg-blue-400',
    text: 'text-white',
    border: 'border-red-500',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      } catch (error) {
        const fallbackTheme = themes[savedTheme.toLowerCase()] || themes.default;
        setCurrentTheme(fallbackTheme);
      }
    }
  }, []);

  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  useEffect(() => {
    const root = document.documentElement;

    const mainColor = getComputedStyle(root)
      .getPropertyValue(`--${currentTheme.main.slice(3)}`)
      .trim();

    const darkerColor = adjustBrightness(mainColor, -20);

    document.body.style.background = `linear-gradient(to bottom left, ${mainColor}, ${darkerColor})`;
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    const normalizedThemeName = themeName.toLowerCase().replace(/\s+/g, '');
    const newTheme = themes[normalizedThemeName] || themes.default;
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

```

### src\context\WeekScheduleContext.jsx

``` 
// src/context/WeekScheduleContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

const WeekScheduleContext = createContext();

export const useWeekSchedule = () => useContext(WeekScheduleContext);

export const WeekScheduleProvider = ({ children }) => {
  const [weekSchedule, setWeekSchedule] = useState({});

  const fetchSchedule = useCallback(async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      setWeekSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }, []);

  return (
    <WeekScheduleContext.Provider value={{ weekSchedule, setWeekSchedule, fetchSchedule }}>
      {children}
    </WeekScheduleContext.Provider>
  );
};
```

### src\hooks\useWeekSchedule.jsx

``` 
import { useState, useEffect } from 'react';

export const useWeekSchedule = () => {
  const [weekSchedule, setWeekSchedule] = useState({});

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

  useEffect(() => {
    fetchSchedule();
  }, []);

  return { weekSchedule, setWeekSchedule, fetchSchedule };
};
```

### src\index.jsx

``` 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WeekScheduleProvider } from './context/WeekScheduleContext';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import MainDashboard from './pages/MainDashboard';
import Admin from './pages/Admin';
import Account from './pages/Account';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import TeacherTools from './pages/TeacherTools';
import News from './pages/News';
import ChangeLog from './pages/ChangeLog';
import './styles/App.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/landing" replace />;
};

function AppContent() {
  const { user, setUser } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage user={user} setUser={setUser} />} />
            <Route 
              path="/main" 
              element={
                <PrivateRoute>
                  <MainDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
            <Route path="/teacher-tools" element={<PrivateRoute><TeacherTools /></PrivateRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/news" element={<News />} />
            <Route path="/changelog" element={<ChangeLog />} />
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </main>
      </div>
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
```

### src\layouts\MainLayout.jsx

``` 
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
  const { currentTheme } = useTheme();

  return (
    <div className={`App flex flex-col min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <NavBar />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
```

### src\main.jsx

``` 
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline use')
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### src\pages\About.jsx

``` 
// src/pages/About.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import AboutSection1Img from '../assets/about section 1 img.png';
import AboutSection2Img from '../assets/about section 2 img.png';
import AboutSection3Img from '../assets/about section 3 img.png';
import AboutSection4Img from '../assets/about section 4 img.png';
import AboutSection5Img from '../assets/about section 5 img.png';
import AboutSection6Img from '../assets/about section 6 img.png';
import AboutSection7Img from '../assets/about section 7 img.png'; // New image import

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [typedKeys, setTypedKeys] = useState('');

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleKeyPress = (event) => {
    setTypedKeys((prevKeys) => {
      const newKeys = prevKeys + event.key;
      if (newKeys.endsWith('2014')) {
        setShowPopup(true);
        return ''; // Reset keys after showing popup
      }
      return newKeys.slice(-4); // Keep only the last 4 characters
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      className="about-container relative"
      style={{
        backgroundPosition: `center ${scrollY * 0.5}px`,
      }}
    >
      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'rgb(0, 33, 66)', // Hardcoded background color
              borderColor: 'rgb(185, 137, 39)', // Hardcoded border color
              color: 'white', // Hardcoded text color
              borderStyle: 'solid',
              borderWidth: '2px',
              borderRadius: '15px',
            }}
          >
            <button className="popup-close" onClick={closePopup} style={{ color: 'white' }}>X</button>
            <h2 className="popup-heading" style={{ color: 'white' }}>
              Introducing the GOAT Mrs. Farrell
            </h2>
            <p className="popup-text" style={{ color: 'white' }}>
              Teacher of the Year award winner<br />
              Earned a Master’s in Non-Profit Management and Leadership<br />
              Named Most Enthusiastic by a senior class<br />
              #3 in high school graduating class (serious scholar vibes)<br />
              Winner of the Thespian Award in high school theatre<br />
              Frequent honors recipient and a proud teacher's pet back in the day<br />
              Halloween Costume Contest champion (alongside your department)<br />
              Thriving in year nine at St. Pius X, teaching Theology with passion<br />
              BA in Religious Studies from William & Mary<br />
              Active participant and supporter in the SPX community, with a love for poolside gatherings<br />
              Blessed with a wonderful husband and a spirited two-year-old daughter, Addie, who you’ll see cheering on at school events
            </p>
            <img 
              src={AboutSection7Img} 
              alt="Popup Content" 
              className="popup-image" 
              style={{ width: '50%' }} // Set image to 50% of screen width
            />
          </div>
        </div>
      )}

      {/* Section 0: Fullscreen Title with Scroll Prompt */}
      <section className="about-section about-section-0 relative z-20">
        <motion.h1
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: -100 }}
          transition={{ duration: 2 }}
          className="about-main-title"
        >
          Introducing <a className="glow-link" rel="noopener noreferrer">ScheduleSPX</a>
        </motion.h1>
        <motion.div
          className="scroll-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ bottom: 'calc(2rem + 100px)' }}
        >
          <span>&darr;</span> {/* Downward arrow */}
        </motion.div>
      </section>

      {/* Section 1 */}
      <section className="about-section relative z-20">
        <div className="about-content flex-row" style={{ gap: '10%' }}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">It all started in English class...</h2>
            <p className="about-body">
              In true "lightbulb moment" fashion, David and Kagen had the idea of making a website to keep track of bell schedules during the day, with a way to see the time left in the tab preview, and have a progress bar.
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection1Img} alt="About Section 1" />
          </motion.div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section about-content-reverse relative z-20">
        <div className="about-content flex-row-reverse" style={{ gap: '10%' }}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">However, it took more than that class to get it up and running...</h2>
            <p className="about-body">
              Kagen, with some "supervision" from David, created the base website and started the backend and figured out the system for coding, workshoping, and publishing the code to the main domain.
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection2Img} alt="About Section 2" />
          </motion.div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section relative z-20">
        <div className="about-content flex-row" style={{ gap: '10%' }}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">But once it was up, we didn’t stop there.</h2>
            <p className="about-body">
              We kept having ideas after ideas, and soon enough we figured out a way to work the best in our workflow to be able to create, develop, and publish all the features you may want!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection3Img} alt="About Section 3" />
          </motion.div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="about-section about-content-reverse relative z-20">
        <div className="about-content flex-row-reverse" style={{ gap: '10%' }}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">... and it quickly became the talk of the town</h2>
            <p className="about-body">
              Once people started visiting our site, it quickly became so popular that almost every computer on campus had it up! Everyone from freshman to the teachers were using the site. We even made the news! It was so cool to see everyone using and enjoying it!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection4Img} alt="About Section 4" />
          </motion.div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="about-section relative z-20">
        <div className="about-content flex-row" style={{ gap: '10%' }}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">it was time to expand our team</h2>
            <p className="about-body">
              We realized that it was too much for just Kagen and David to keep updating the site, so they recruited Russell to help with development, and to help maintain the site once the seniors graduated. We also now were officially represented by Mrs. Farrell! She helps our Teacher-Student site relationship and is our #1 supporter! (type the year she got her B.A for a surprise)
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection5Img} alt="About Section 5" />
          </motion.div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="about-section about-content-reverse relative z-20">
        <div className="about-content flex-row-reverse" style={{ gap: '10%' }}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">With our new team, and our loyal site users, we are ready to make this the best it can be!</h2>
            <p className="about-body">
              We are dedicated to keeping this site up, updated, and loved by all the students! Please reach out to <a href="mailto:admin@schedulespx.com" className="glow-link" target="_blank" rel="noopener noreferrer">admin@schedulespx.com</a> to reach us directly for any bug reports, feature requests, and ideas! Your support inspires us to keep going!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection6Img} alt="About Section 6" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
```

### src\pages\Account.jsx

``` 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PeriodRenamer from '../components/PeriodRenamer';
import '../styles/carousel.css';

const Account = ({ weekSchedule }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const { user, isLoggedIn } = useAuth();
  const [filteredThemes, setFilteredThemes] = useState('Featured Themes');

  console.log("Account - user:", user);
  console.log("Account - isLoggedIn:", isLoggedIn());

  const themeCategories = {
    'Featured Themes': ['Default', 'Dark', 'Light', 'candycane'],
    'General Themes': ['Forest', 'Ocean', 'Sunset', 'Lavender', 'Mint', 'Cherry', 'Coffee', 'Retro',],
    'Holiday Themes': ['candycane', 'Halloween', 'ValentinesDay', 'StPatricksDay', 'Easter', 'IndependenceDay', 'Thanksgiving'],
    'People Themes': ['StJoseph', 'StPeter', 'StPaul', 'StMichael', 'StTherese', 'StFrancisAssisi', 'StMary', 'StAugustine', 'StBenedict', 'StJohn', 'StClare', 'StIgnatius', 'StCatherine', 'StThereseAvila', 'StSimon', 'StVincent', 'StLucy', 'StPatrick', 'StAnthony', 'StJames'],
  };

  useEffect(() => {
    setFilteredThemes('Featured Themes');
    console.log("Account - Component mounted");
  }, []);

  const handleThemeChange = (themeName) => {
    if (themes[themeName.toLowerCase()]) {
      changeTheme(themeName.toLowerCase());
    } else {
      console.error(`Attempted to change to undefined theme: ${themeName}`);
    }
  };

  const handleFilterChange = (filter) => {
    setFilteredThemes(filter);
  };

  const renderThemes = () => {
    const themesToRender = filteredThemes === 'Show All' ? Object.keys(themes) : themeCategories[filteredThemes] || [];
    return themesToRender.map((themeName) => {
      const theme = themes[themeName.toLowerCase()];
      if (!theme) {
        console.error(`Theme not found: ${themeName}`);
        return null;
      }
      return (
        <CSSTransition key={themeName} timeout={500} classNames="fade">
          <ThemePreview key={themeName} themeName={themeName} theme={theme} />
        </CSSTransition>
      );
    });
  };

  const ThemePreview = ({ themeName, theme }) => {
    if (!theme) {
      console.error(`Attempted to render undefined theme: ${themeName}`);
      return null;
    }

    const isSelected = currentTheme.name.toLowerCase().replace(/\s+/g, '') === themeName.toLowerCase();

    return (
      <div
        className={`w-full h-24 rounded-lg overflow-hidden shadow-md border-2 ${theme.accent} cursor-pointer transition-transform duration-200 hover:scale-105 relative flex items-center justify-center`}
        onClick={() => handleThemeChange(themeName)}
      >
        <div className={`absolute inset-x-0 top-0 h-1/2 ${theme.main}`}></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex">
          <div className={`w-1/2 ${theme.accent}`}></div>
          <div className={`w-1/2 ${theme.main}`}></div>
        </div>
        <div className={`absolute px-2 py-1 text-center font-bold bg-opacity-70 rounded ${isSelected ? 'bg-green-500' : 'bg-black'} text-white`}>
          {theme.name}
        </div>
      </div>
    );
  };

  if (!isLoggedIn()) {
    console.log("Account - User not logged in");
    return (
      <div className={`container mx-auto mt-8 p-4 ${currentTheme.main} ${currentTheme.text}`}>
        <p className="text-center text-xl drop-shadow-md">Please log in to view your account information.</p>
      </div>
    );
  }

  console.log("Account - Rendering account information");
  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-4`} style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
      <div className="max-w-4xl mx-auto pb-16">
        {/* Account Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h1 className="text-2xl font-bold mb-6 text-center drop-shadow-md">Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <p className={`p-2 rounded ${currentTheme.main}`}>{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <p className={`p-2 rounded ${currentTheme.main}`}>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Period Customization section */}
        <div className="mb-8">
          <PeriodRenamer />
        </div>
        
        {/* Theme Customization section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className="text-xl font-bold mb-4 text-center">Theme Customization</h2>
          <div className="flex flex-wrap justify-center mb-4 gap-2">
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Featured Themes')}
            >
              Featured Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('General Themes')}
            >
              General Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Holiday Themes')}
            >
              Holiday Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('People Themes')}
            >
              People Themes
            </button>
            <button
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleFilterChange('Show All')}
            >
              Show All
            </button>
          </div>
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderThemes()}
          </TransitionGroup>
        </div>

        {/* Legal Information section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className="text-xl font-bold mb-4 text-center">Legal Information</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/privacy" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Change Log section */}
        <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-4 text-center">Change Log</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/changelog" 
              className={`${currentTheme.accent} text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:opacity-80 transition-opacity duration-200`}
            >
              View Change Log
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
```

### src\pages\Admin.jsx

``` 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Admin = ({ weekSchedule, setWeekSchedule, fetchSchedule }) => {
  const { currentTheme } = useTheme();
  const { user, isAuthorized, isAdmin } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newPeriod, setNewPeriod] = useState({ name: '', start: '', end: '' });
  const [saveStatus, setSaveStatus] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [popup, setPopup] = useState({ title: '', message: '', author: '', isActive: false });

  useEffect(() => {
    if (Object.keys(weekSchedule).length === 0) {
      fetchSchedule();
    }
    fetchCurrentPopup();
  }, []);

  const fetchCurrentPopup = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPopup(data);
      } else {
        console.error("Failed to fetch popup:", await response.text());
      }
    } catch (error) {
      console.error('Error fetching popup:', error);
    }
  };

  const handleAddPeriod = () => {
    if (newPeriod.name && newPeriod.start && newPeriod.end) {
      const newPeriodString = `${newPeriod.name} - ${newPeriod.start}-${newPeriod.end}`;
      const updatedSchedule = {
        ...weekSchedule,
        [selectedDay]: [...weekSchedule[selectedDay], newPeriodString]
      };
      setWeekSchedule(updatedSchedule);
      setNewPeriod({ name: '', start: '', end: '' });
      saveSchedule(updatedSchedule);
    }
  };

  const handleRemovePeriod = (index) => {
    const updatedSchedule = {
      ...weekSchedule,
      [selectedDay]: weekSchedule[selectedDay].filter((_, i) => i !== index)
    };
    setWeekSchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
  };

  const handleBulkInput = () => {
    const lines = bulkInput.trim().split('\n');
    const newPeriods = lines.slice(1).map(line => {
      const [name, start, end] = line.split('\t');
      return `${name} - ${start}-${end}`;
    });

    const updatedSchedule = {
      ...weekSchedule,
      [selectedDay]: newPeriods
    };
    setWeekSchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
    setBulkInput('');
  };

  const saveSchedule = async (schedule) => {
    try {
      setSaveStatus('Saving...');
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(schedule)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const result = await response.json();
      setSaveStatus('Schedule saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
      fetchSchedule();
    } catch (error) {
      console.error('Error saving schedule:', error);
      setSaveStatus(`Failed to save schedule: ${error.message}`);
    }
  };

  const savePopup = async () => {
    try {
      setSaveStatus('Saving popup...');
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(popup)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      setSaveStatus('Popup saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
      fetchCurrentPopup();
    } catch (error) {
      console.error('Error saving popup:', error);
      setSaveStatus(`Failed to save popup: ${error.message}`);
    }
  };

  const inputStyle = `w-full p-2 mb-2 border rounded ${currentTheme.input} text-gray-900`;

  if (!user || !isAuthorized() || !isAdmin()) {
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>You are not authorized to access the admin panel.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-6 rounded-lg shadow-lg`}>
            <h2 className={`text-2xl font-bold mb-6`}>Admin Console</h2>

            {/* Popup Management Section */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4`}>Manage Popup</h3>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Current Popup</h4>
                <p>Title: {popup.title}</p>
                <p>Message: {popup.message}</p>
                <p>Author: {popup.author}</p>
                <p>Active: {popup.isActive ? 'Yes' : 'No'}</p>
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Set New Popup</h4>
                <input
                  type="text"
                  placeholder="Popup Title"
                  value={popup.title}
                  onChange={(e) => setPopup(prev => ({ ...prev, title: e.target.value }))}
                  className={inputStyle}
                />
                <textarea
                  placeholder="Popup Message"
                  value={popup.message}
                  onChange={(e) => setPopup(prev => ({ ...prev, message: e.target.value }))}
                  className={inputStyle}
                  rows="3"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={popup.author}
                  onChange={(e) => setPopup(prev => ({ ...prev, author: e.target.value }))}
                  className={inputStyle}
                />
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={popup.isActive}
                    onChange={(e) => setPopup(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  <label>Active</label>
                </div>
                <button
                  onClick={savePopup}
                  className={`${currentTheme.accent} px-4 py-2 rounded hover:opacity-80`}
                >
                  Save Popup
                </button>
              </div>
            </div>

            {/* Schedule Management Section */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4`}>Manage Schedule</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddPeriod}
                    className={`${currentTheme.accent} px-4 py-2 rounded hover:opacity-80`}
                  >
                    Add Period
                  </button>
                  <button
                    onClick={handleBulkInput}
                    className={`${currentTheme.accent} px-4 py-2 rounded hover:opacity-80`}
                  >
                    Add Bulk Periods
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className={`block mb-2`}>Select Day:</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className={inputStyle}
                >
                  {Object.keys(weekSchedule).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>{selectedDay}'s Schedule</h4>
                <ul className="space-y-2">
                  {weekSchedule[selectedDay] && weekSchedule[selectedDay].map((period, index) => (
                    <li key={index} className={`flex justify-between items-center`}>
                      <span>{period}</span>
                      <button
                        onClick={() => handleRemovePeriod(index)}
                        className={`${currentTheme.accent} px-2 py-1 rounded hover:opacity-80`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Add New Period</h4>
                <input
                  type="text"
                  placeholder="Period Name"
                  value={newPeriod.name}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, name: e.target.value }))}
                  className={inputStyle}
                />
                <input
                  type="time"
                  value={newPeriod.start}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, start: e.target.value }))}
                  className={inputStyle}
                />
                <input
                  type="time"
                  value={newPeriod.end}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, end: e.target.value }))}
                  className={inputStyle}
                />
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Bulk Add Periods</h4>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="Paste formatted schedule here..."
                  className={inputStyle}
                  rows="10"
                />
              </div>
            </div>

            {saveStatus && (
              <p className={`mt-2 ${saveStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                {saveStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

```

### src\pages\ChangeLog.jsx

``` 
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ChangeLog = () => {
  const { currentTheme } = useTheme();

  const changeLogData = [
    {
      date: '2023-08-01',
      description: 'Initial release of Schedule-SPX',
      affectedComponents: ['LandingPage', 'MainDashboard'],
      author: 'Kagen Jensen',
      version: '1.0.0',
      links: [
        { text: 'Pull Request #1', url: 'https://github.com/KdogDevs/schedulesspx/pull/1' },
        { text: 'Issue #1', url: 'https://github.com/KdogDevs/schedulesspx/issues/1' }
      ]
    },
    {
      date: '2023-08-15',
      description: 'Added new themes and improved performance',
      affectedComponents: ['ThemeContext', 'NavBar'],
      author: 'David Camick',
      version: '1.1.0',
      links: [
        { text: 'Pull Request #2', url: 'https://github.com/KdogDevs/schedulesspx/pull/2' },
        { text: 'Issue #2', url: 'https://github.com/KdogDevs/schedulesspx/issues/2' }
      ]
    },
    // Add more change log entries as needed
  ];

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-4`}>
      <div className="max-w-4xl mx-auto pb-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Log</h1>
        {changeLogData.map((entry, index) => (
          <div key={index} className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
            <h2 className="text-xl font-semibold mb-2">{entry.date}</h2>
            <p className="mb-2"><strong>Description:</strong> {entry.description}</p>
            <p className="mb-2"><strong>Affected Components/Files:</strong> {entry.affectedComponents.join(', ')}</p>
            <p className="mb-2"><strong>Author:</strong> {entry.author}</p>
            <p className="mb-2"><strong>Version:</strong> {entry.version}</p>
            <div className="mb-2">
              <strong>Links:</strong>
              <ul className="list-disc list-inside">
                {entry.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeLog;
```

### src\pages\Events.jsx

``` 
// src/Events.jsx
import React, { useState, useEffect } from 'react';

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user && user.accessToken) {
        try {
          const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10`, {
            headers: {
              'Authorization': `Bearer ${user.accessToken}`
            }
          });
          const data = await response.json();
          setEvents(data.items || []);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };
    fetchEvents();
  }, [user]);

  return (
    <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-stpius-white">Important Events</h2>
      {user ? (
        <ul className="flex-grow overflow-y-auto">
          {events.map((event, index) => (
            <li key={index} className="mb-2 bg-stpius-gold/30 p-2 rounded">
              <span className="font-semibold text-stpius-white">
                {new Date(event.start.dateTime || event.start.date).toLocaleString()}:
              </span>{' '}
              <span className="text-stpius-white">{event.summary}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stpius-white flex-grow flex items-center justify-center">Please sign in to view events.</p>
      )}
    </div>
  );
};

export default Events;
```

### src\pages\LandingPage.jsx

``` 
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import { useAuth } from '../context/AuthContext';

const GoogleLogin = lazy(() => import('../components/GoogleLogin'));

const LandingPage = React.memo(() => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const { user, login } = useAuth();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);

  const handleLoginSuccess = (userData) => {
    login(userData);
    navigate('/main');
  };

  return (
    <div className="landing-page">
      <div className="background-image-container"></div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="landing-title"
      >
        Welcome to Schedule SPX
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="landing-subtitle"
      >
        The All-in-One Student Dashboard.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="landing-body"
      >
        Please sign in to use, or <Link to="/about" className="highlight-link">Click Here</Link> to learn more.
      </motion.p>
      <motion.div
        className="landing-buttons"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <GoogleLogin onLoginSuccess={handleLoginSuccess} />
        </Suspense>
        <p className="fine-print">
          By Signing in, you agree to the <Link to="/terms" className="highlight-link">Terms</Link> and the <Link to="/privacy" className="highlight-link">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
});

export default LandingPage;
```

### src\pages\MainDashboard.jsx

``` 
// src/pages/MainDashboard.jsx
import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DayHeader from '../components/DayHeader';
import QuickLinks from '../components/QuickLinks';
import PeriodProgress from '../components/PeriodProgress';
import Schedule from '../components/Schedule';
import GoogleCalendar from '../components/GoogleCalendar';
import PopupMessage from '../components/PopupMessage';
import { useWeekSchedule } from '../context/WeekScheduleContext';

const MainDashboard = () => {
  const { currentTheme } = useTheme();
  const { weekSchedule, fetchSchedule } = useWeekSchedule();
  const contentRef = useRef(null);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div ref={contentRef} className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left h-[164px]`}>
            <DayHeader />
          </div>
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-left h-[300px]`}>
            <QuickLinks />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden flex flex-col slide-down h-[484px]`}>
            <Schedule weekSchedule={weekSchedule} />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden slide-in-right h-[484px]`}>
            <div className="h-full overflow-y-auto">
              <GoogleCalendar />
            </div>
          </div>
        </div>
        <div className={`col-span-full ${currentTheme.accent} ${currentTheme.border} rounded-lg shadow-md overflow-hidden period-progress-container slide-up h-[155px]`}>
          <PeriodProgress weekSchedule={weekSchedule} />
        </div>
      </div>
      <PopupMessage />
    </div>
  );
};

export default MainDashboard;
```

### src\pages\News.jsx

``` 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const proxyUrl = 'https://simple-proxy.devs4u.workers.dev/';
      const targetUrl = 'https://spxgoldenlines.com/feed/';
      const response = await fetch(`${proxyUrl}?destination=${encodeURIComponent(targetUrl)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const items = xmlDoc.querySelectorAll('item');
      
      const parsedArticles = Array.from(items).map(item => ({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        pubDate: item.querySelector('pubDate')?.textContent,
        description: item.querySelector('description')?.textContent,
        content: item.querySelector('content\\:encoded')?.textContent,
        imageUrl: getImageUrl(item)
      }));

      setArticles(parsedArticles);
      selectFeaturedStory(parsedArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    // Try to get image from content:encoded
    const content = item.querySelector('content\\:encoded')?.textContent;
    if (content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const img = tempDiv.querySelector('img');
      if (img) {
        // Get the largest image from srcset if available
        const srcset = img.getAttribute('srcset');
        if (srcset) {
          const sources = srcset.split(',')
            .map(src => {
              const [url, width] = src.trim().split(' ');
              return {
                url,
                width: width ? parseInt(width.replace('w', '')) : 0
              };
            })
            .sort((a, b) => b.width - a.width);
          
          if (sources.length > 0) {
            return sources[0].url;
          }
        }
        return img.getAttribute('src');
      }
    }

    // Try to get image from description
    const description = item.querySelector('description')?.textContent;
    if (description) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const img = tempDiv.querySelector('img');
      if (img) {
        return img.getAttribute('src');
      }
    }

    // Additional fallbacks
    const mediaContent = item.querySelector('media\\:content');
    if (mediaContent && mediaContent.getAttribute('medium') === 'image') {
      return mediaContent.getAttribute('url');
    }

    const enclosure = item.querySelector('enclosure');
    if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
      return enclosure.getAttribute('url');
    }

    return null;
  };

  const selectFeaturedStory = (articles) => {
    const currentDate = new Date();
    const weekNumber = Math.floor(currentDate.getTime() / (7 * 24 * 60 * 60 * 1000));
    const randomIndex = weekNumber % articles.length;
    setFeaturedStory(articles[randomIndex]);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const FeaturedArticle = ({ article }) => (
    <div className={`${currentTheme.main} rounded-lg shadow-lg overflow-hidden border-2 ${currentTheme.border} relative animate-fadeIn`}>
      <div className="flex flex-col md:flex-row relative">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
            zIndex: 1
          }}
        />
        
        {article.imageUrl && (
          <div className="md:w-2/3 relative z-10">
            <img 
              src={article.imageUrl} 
              alt={article.title || 'Featured article image'} 
              className="w-full h-64 md:h-[500px] object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.remove('md:w-2/3');
                e.target.parentElement.parentElement.querySelector('div:last-child').classList.remove('md:w-1/3');
                e.target.parentElement.parentElement.querySelector('div:last-child').classList.add('w-full');
              }}
            />
          </div>
        )}
        <div className={`p-6 ${article.imageUrl ? 'md:w-1/3' : 'w-full'} flex flex-col justify-between relative z-10`}>
          <div>
            <span className={`${currentTheme.accent} ${currentTheme.text} text-sm font-bold px-3 py-1 rounded-lg mb-2 inline-block`}>
              Featured Story
            </span>
            <h2 className={`${currentTheme.text} text-2xl md:text-3xl font-bold mb-4`}>{article.title}</h2>
            <p className={`${currentTheme.text} opacity-80 text-sm mb-4`}>{formatDate(article.pubDate)}</p>
            <div 
              className={`${currentTheme.text} mb-6 overflow-hidden line-clamp-4`}
              dangerouslySetInnerHTML={{__html: article.description}}
            />
          </div>
          <a 
            href={article.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${currentTheme.accent} ${currentTheme.text} font-bold py-3 px-6 rounded-lg inline-block transition-all duration-300 hover:opacity-80`}
          >
            Read Full Story
          </a>
        </div>
      </div>
    </div>
  );

  const ArticleCard = ({ article, index }) => (
    <div 
      className={`${currentTheme.main} rounded-lg shadow-lg overflow-hidden border-2 ${currentTheme.border} relative animate-fadeIn h-full flex flex-col`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
          zIndex: 1
        }}
      />
      
      {article.imageUrl && (
        <div className="relative z-10 h-56">
          <img 
            src={article.imageUrl} 
            alt={article.title || 'Article image'} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.height = '0';
            }}
          />
        </div>
      )}
      <div className={`p-5 relative z-10 flex-grow flex flex-col ${!article.imageUrl ? 'h-full' : ''}`}>
        <h2 className={`${currentTheme.text} text-xl font-semibold mb-2 line-clamp-2`}>{article.title}</h2>
        <p className={`${currentTheme.text} opacity-80 text-sm mb-3`}>{formatDate(article.pubDate)}</p>
        <div 
          className={`${currentTheme.text} mb-4 overflow-hidden line-clamp-3 flex-grow`}
          dangerouslySetInnerHTML={{__html: article.description}}
        />
        <a 
          href={article.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${currentTheme.accent} ${currentTheme.text} font-bold py-2 px-4 rounded-lg inline-block transition-all duration-300 hover:opacity-80 mt-auto`}
        >
          Read More
        </a>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen overflow-y-auto">
        <div className={`${currentTheme.main} w-full min-h-screen flex items-center justify-center`}>
          <div className={`${currentTheme.main} rounded-lg shadow-lg p-8 border-2 ${currentTheme.border} relative`}>
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
                zIndex: 1
              }}
            />
            <div className={`${currentTheme.text} text-center text-xl relative z-10 animate-pulse`}>
              Loading news...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className={`${currentTheme.main} w-full`}>
        <div className="container mx-auto px-4 py-6">
          <h1 className={`text-4xl font-bold mb-8 text-center ${currentTheme.text}`}>Latest News</h1>
          
          {featuredStory && (
            <div className="mb-12">
              <FeaturedArticle article={featuredStory} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto pb-12">
            {articles
              .filter(article => article !== featuredStory)
              .map((article, index) => (
                <div key={index} className="h-full">
                  <ArticleCard article={article} index={index} />
                </div>
              ))}
          </div>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default News;
```

### src\pages\PrivacyPolicy.jsx

``` 
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 overflow-auto max-h-screen">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: August 26, 2024</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p>Welcome to Schedule-SPX. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
        <p>We collect information that you provide directly to us, such as when you create an account or use our services. This may include:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal information (e.g., name, email address)</li>
          <li>Schedule and event information</li>
          <li>Usage data and preferences</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Personalize your experience</li>
          <li>Communicate with you about our services</li>
          <li>Protect against, investigate, and prevent potentially unlawful or abusive activities</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
        <p>We may use third-party services that collect, monitor and analyze this type of information in order to increase our Service's functionality. These third-party service providers have their own privacy policies addressing how they use such information.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
        <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at admin@schedulespx.com.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
```

### src\pages\StudentTools.jsx

``` 
import React from 'react';
import FinalGradeCalculator from '../components/StudentTools/FinalGradeCalculator';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const StudentTools = () => {
  const { currentTheme } = useTheme();

  const tools = [
    { 
      name: 'Final Grade Calculator', 
      component: FinalGradeCalculator,
      icon: '📊',
      gradient: `${currentTheme.accent}`
    },
  ];

  return (
    <div className={`flex flex-col h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-6 max-w-4xl">
          <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-6 rounded-lg shadow-lg`}>
            {/* Header */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-bold mb-8 ${currentTheme.text} text-center`}
            >
              Student Tools
            </motion.h1>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tools.map((tool) => (
                <motion.button
                  key={tool.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative group overflow-hidden rounded-xl p-4
                    ${currentTheme.accent} 
                    border-2 ${currentTheme.border}
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                  `}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="font-semibold">{tool.name}</span>
                  </div>
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(
                          45deg,
                          transparent 25%,
                          rgba(255,255,255,0.1) 45%,
                          rgba(255,255,255,0.2) 50%,
                          rgba(255,255,255,0.1) 55%,
                          transparent 75%
                        )
                      `,
                      backgroundSize: '200% 200%',
                      animation: 'shine 8s linear infinite',
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Active Tool Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative overflow-hidden rounded-xl shadow-2xl
                ${currentTheme.accent} bg-opacity-10
                border-2 ${currentTheme.border}
                p-8
                mb-24
              `}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
                  zIndex: 1
                }}
              />

              <div className="relative z-10">
                {React.createElement(tools[0].component)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shine Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default StudentTools;
```

### src\pages\TeacherTools.jsx

``` 
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Timer from '../components/TeacherTools/Timer';
import NamePicker from '../components/TeacherTools/NamePicker';
import GameSelector from '../components/TeacherTools/GameSelector';
import DiceRoller from '../components/TeacherTools/DiceRoller';
import GroupDivider from '@/components/TeacherTools/GroupDivider';
import { motion } from 'framer-motion';

const TeacherTools = () => {
  const { currentTheme } = useTheme();
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { 
      name: 'Timer', 
      component: Timer,
      icon: '⏱️',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Name Picker', 
      component: NamePicker,
      icon: '👥',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Game Selector', 
      component: GameSelector,
      icon: '🎮',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Dice Roller', 
      component: DiceRoller,
      icon: '🎲',
      gradient: `${currentTheme.accent}`
    },
    { 
      name: 'Group Creator', 
      component: GroupDivider,
      icon: '👥',
      gradient: `${currentTheme.accent}`
    },
  ];

  return (
    <div className={`flex flex-col h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-6 max-w-4xl">
          <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-6 rounded-lg shadow-lg`}>
            {/* Header */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-bold mb-8 ${currentTheme.text} text-center`}
            >
              Teacher Tools
            </motion.h1>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tools.map((tool) => (
                <motion.button
                  key={tool.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative group overflow-hidden rounded-xl p-4
                    ${currentTheme.accent} 
                    border-2 ${currentTheme.border}
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                  `}
                  onClick={() => setActiveTool(tool.name)}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="font-semibold">{tool.name}</span>
                  </div>
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(
                          45deg,
                          transparent 25%,
                          rgba(255,255,255,0.1) 45%,
                          rgba(255,255,255,0.2) 50%,
                          rgba(255,255,255,0.1) 55%,
                          transparent 75%
                        )
                      `,
                      backgroundSize: '200% 200%',
                      animation: 'shine 8s linear infinite',
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Active Tool Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative overflow-hidden rounded-xl shadow-2xl
                ${currentTheme.accent} bg-opacity-10
                border-2 ${currentTheme.border}
                p-8
                mb-24
              `}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
                  zIndex: 1
                }}
              />

              <div className="relative z-10">
                {activeTool ? (
                  React.createElement(tools.find(tool => tool.name === activeTool).component)
                ) : (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">✨</span>
                    <p className={`text-xl ${currentTheme.text}`}>Select a tool to get started</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shine Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default TeacherTools;
```

### src\pages\TermsAndConditions.jsx

``` 
// src/TermsAndConditions.jsx
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8 overflow-auto max-h-screen">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">Last updated: August 26, 2024</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p>By accessing or using Schedule-SPX, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you are prohibited from using our service and may be permanently banned.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
        <p>Schedule-SPX provides a platform for managing and viewing school schedules. We reserve the right to modify, suspend, or discontinue the service at any time without notice.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. User Conduct and Responsibilities</h2>
        <p>Users are solely responsible for their conduct while using Schedule-SPX. We are not liable for any user's actions or the consequences thereof. Users agree not to use the service for any unlawful or prohibited purpose.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Limitation of Liability</h2>
        <p>Schedule-SPX and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use or inability to use the service.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Service Availability</h2>
        <p>We do not guarantee that the service will be available at all times. Schedule-SPX may come down at any time and for any reason without prior notice.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Termination of Service</h2>
        <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including a breach of the Terms.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Your continued use of Schedule-SPX after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of the State of Georgia, United States, without regard to its conflict of law provisions.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Contact Information</h2>
        <p>For any questions about these Terms, please contact us at admin@schedulespx.com.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
```

### src\styles\About.css

``` 
/* About.css */

.about-container {
  width: 100%;
  overflow-x: hidden;
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: linear-gradient(to bottom right, #1e3a8a, #000000);
  background-attachment: fixed;
  background-size: 200%;
}

.about-section {
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 2rem;
}

.about-section-0 {
  text-align: center;
  position: relative;
}

.about-main-title {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  padding-top: 4rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5); /* Subtle drop shadow */
}

.scroll-prompt {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: white;
  animation: bounce 2s infinite;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5); /* Subtle drop shadow */
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}

.about-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.about-content-reverse {
  flex-direction: row-reverse;
}

.about-text {
  flex: 1;
  padding: 2rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3); /* Subtle drop shadow for text */
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.about-body {
  font-size: 1.5rem;
  line-height: 1.8;
}

.about-image-placeholder {
  flex: 1;
  padding: 2rem;
  filter: drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.3)); /* Drop shadow respecting alpha channel */
}

.about-image-placeholder img {
  width: 100%;
  border-radius: 20px;
  display: block; /* Ensure the image is treated as a block-level element */
}

.glow-link {
  color: #fbbf24;
  text-shadow: 0px 0px 8px rgba(251, 191, 36, 0.75);
  transition: text-shadow 0.3s ease-in-out;
}

.glow-link:hover {
  text-shadow: 0px 0px 12px rgba(251, 191, 36, 1);
}

/* Hide the scrollbar while keeping the page scrollable */
body {
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}

/* Popup Modal Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  width: 80%;
  max-width: 900px;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.popup-heading {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.popup-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.popup-image {
  width: 100%;
  border-radius: 15px;
}
```

### src\styles\App.css

``` 
.App {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

html, body {
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to bottom left, rgba(0, 0, 0, 0.5), transparent);
  z-index: 0;
  background-size: 200% 200%;
}

.App-main, .App-header, .App-footer {
  position: relative;
  z-index: 1;
}

.glass-tile,
.ad-widget {
  min-height: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.period-progress,
.GoogleCalendar {
  grid-column: span 3;
  width: 100%;
  position: relative;
  z-index: 2; /* Ensure it stays above the gradient */
}

.GoogleCalendar {
  z-index: 2; /* Ensure Google Calendar content stays above the gradient */
}

/* Slide-up animation for global elements with cubic ease-out */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.5s cubic-bezier(0.87, 0, 0.13, 1) forwards;
}

/* Slide-down animation */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-down {
  animation: slideDown 1s cubic-bezier(0.87, 0, 0.13, 1) forwards;
}

/* Slide-in-from-left animation */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left {
  animation: slideInFromLeft 2s cubic-bezier(0.87, 0, 0.13, 1) forwards;
  opacity: 1; /* Ensure it's visible after the animation */
}

/* Slide-in-from-right animation */
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-right {
  animation: slideInFromRight 2s cubic-bezier(0.87, 0, 0.13, 1) forwards;
  opacity: 1; /* Ensure it's visible after the animation */
}

/* Slide-in-from-bottom animation with delay */
@keyframes slideInFromBottom {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-bottom {
  opacity: 0; /* Start hidden */
  animation: slideInFromBottom 1.5s cubic-bezier(0.25, 0.1, 0.25, 1.0) 2s forwards;
}

/* Blur overlay for unauthenticated users on /main */
.main-blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 10;
}

/* Ensure the Announcement component doesn't displace other elements */
.grid .Announcement {
  grid-column: 2 / span 1; /* Centering the announcement */
  width: 100%;
  justify-self: center;
}
```

### src\styles\BlurOverlay.css

``` 
/* src/components/BlurOverlay.css */
.blur-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .overlay-message {
    color: white;
    font-size: 2rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 20px;
    border-radius: 10px;
  }
  ```

### src\styles\LandingPage.css

``` 
.landing-page {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to bottom right, #1e3a8a, #000000); /* Background gradient */
    z-index: 2; /* Ensure the text and content are above the background image */
}

.background-image-container {
    position: absolute;
    top: -100px;
    left: -100px;
    width: 200%; /* Original width to accommodate the loop */
    height: 200%; /* Original height to accommodate the loop */
    background-image: url('./assets/splashscreengraphic.png'); /* Using the provided file path */
    background-size: cover;
    background-repeat: repeat-x; /* Repeat the background only horizontally */
    animation: loopBackground 100s linear infinite alternate, fadeInBackground 2s ease-in-out forwards; /* Mirroring and fade-in effect */
    z-index: 1; /* Ensure the background is behind the text */
    opacity: 0; /* Start with opacity 0 for fade-in */
}

@keyframes loopBackground {
    0% {
        transform: translateX(0) translateY(0);
    }
    100% {
        transform: translateX(-50%) translateY(-50%); /* Move diagonally and mirror */
    }
}

@keyframes fadeInBackground {
    to {
        opacity: 1;
    }
}

/* Increased drop shadow for text */
.landing-title {
    font-size: 4rem;
    font-weight: 700;
    color: white;
    margin-bottom: 3rem;
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8); /* Increased drop shadow */
    animation: fadeIn 2s ease-in-out;
    z-index: 2; /* Ensure text is above the background image */
}

.landing-subtitle {
    font-size: 1.75rem;
    color: #c0c0c0;
    margin-bottom: 2.5rem;
    text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7); /* Increased drop shadow */
    animation: fadeIn 2s ease-in-out;
    animation-delay: 0.5s;
    opacity: 0;
    animation-fill-mode: forwards;
    z-index: 2; /* Ensure text is above the background image */
}

.landing-body {
    font-size: 1.25rem;
    color: #c0c0c0;
    margin-bottom: 3.5rem;
    text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7); /* Increased drop shadow */
    animation: fadeIn 2s ease-in-out;
    animation-delay: 1s;
    opacity: 0;
    animation-fill-mode: forwards;
    z-index: 2; /* Ensure text is above the background image */
}

.landing-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeIn 2s ease-in-out;
    animation-delay: 1.5s;
    opacity: 0;
    animation-fill-mode: forwards;
    z-index: 2; /* Ensure buttons are above the background image */
}

.fine-print {
    font-size: 0.75rem;
    color: #c0c0c0;
    margin-top: 1rem;
    text-align: center;
    z-index: 2; /* Ensure fine print is above the background image */
}

.highlight-link {
    color: #fbbf24;
    text-shadow: 0px 0px 8px rgba(251, 191, 36, 0.75);
    transition: text-shadow 0.3s ease-in-out;
}

.highlight-link:hover {
    text-shadow: 0px 0px 12px rgba(251, 191, 36, 1);
}

.landing-buttons button {
    margin: 1rem;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    color: #0066ff;
    background-color: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: bounce 3s ease-in-out infinite;
    z-index: 2; /* Ensure button is above the background image */
}

.landing-buttons button:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
```

### src\styles\TutorialModal.css

``` 
.vignette-overlay {
    position: absolute;
    background: radial-gradient(circle, transparent, black);
    border-radius: 50%;
    pointer-events: none; /* Ensure it doesn't block user interaction */
    z-index: 999; /* Above everything else */
    display: none; /* Hidden by default */
}

.vignette-overlay.active {
    display: block; /* Show only when active */
}

.tutorial-modal {
    position: fixed;
    z-index: 1000;
    pointer-events: all;
    transform: translate(-50%, -50%); /* Ensure it's centered */
    transform-origin: center center; /* Anchor point set to the center */
}

/* Add scale-in animation for the first tutorial window */
@keyframes scaleIn {
  0% {
    transform: scale(0) translate(-50%, -50%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn 0.8s cubic-bezier(0.87, 0, 0.13, 1) forwards;
}

.tutorial-content {
    background: linear-gradient(to bottom right, #1e3a8a, #000000); /* Dark blue gradient background */
    padding: 2rem 2.2rem;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #fbbf24; /* Golden border */
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5); /* Drop shadow */
    color: white; /* Text color */
}

.tutorial-content button {
    margin: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background: #fbbf24; /* Golden button background */
    color: #1e3a8a; /* Dark blue text color for the button */
    transition: background 0.3s ease;
}
```

### src\styles\carousel.css

``` 
.carousel-items {
    display: flex;
    overflow: hidden;
    position: relative;
  }
  
  .carousel-items > * {
    flex: 0 0 20%;
    transition: transform 0.5s ease-in-out;
  }
  
  .fade-enter {
    opacity: 0.01;
  }
  
  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  
  .fade-exit {
    opacity: 1;
  }
  
  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }
  
  .carousel-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  
  .carousel-prev, .carousel-next {
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .carousel-prev:hover, .carousel-next:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  ```

### src\styles\index.css

``` 
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  height: 100%;
  overflow: hidden;
}

#root {
  height: 100%;
}

body {
  @apply bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100;
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

.App {
  @apply h-screen flex flex-col;
}

main {
  @apply flex-grow flex flex-col;
}

.glass-tile {
  @apply bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-4 shadow-lg text-inherit flex flex-col justify-center;
}

.ad-component {
  @apply glass-tile flex items-center justify-center;
  min-height: 250px;
}

.period-progress {
  @apply glass-tile flex items-center justify-center flex-col p-2 w-full;
}

.grid {
  @apply gap-4;
}

h1, h2, h3 {
  @apply text-lg font-bold;
}

p, span, div {
  @apply text-sm;
}

nav {
  @apply bg-gray-900 text-white py-2 px-4 flex justify-between items-center;
}
```

### src\tests\App.test.jsx

``` 
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### src\tests\setupTests.jsx

``` 
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
```

### src\utils\reportWebVitals.jsx

``` 
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

### tailwind.config.js

``` 
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'stpius-white': '#ffffff',
        'stpius-gold': '#b98827',
        'stpius-blue': '#012143',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 #00000000' },
          '50%': { boxShadow: '0 0 10px 3px currentColor' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        highlightFadeIn: {
          '0%': { opacity: 0, boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
          '100%': { opacity: 1, boxShadow: '0 0 10px 3px rgba(255, 255, 255, 0.2)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        highlightFadeIn: 'highlightFadeIn 1s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
```

### vite.config.js

``` 
// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      // React plugin with SWC for faster builds
      react(),
      
      // PWA configuration
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Schedule-SPX',
          short_name: 'Schedule-SPX',
          description: 'Your school schedule management app',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      })
    ],
    server: {
      port: 3000, // Dev server port
      open: true, // Opens the browser automatically
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'], // Default extensions
      alias: {
        '@': path.resolve(__dirname, './src'), // Alias for src directory
      },
    },
    define: {
      // Define environment variables for use in the app
      'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY),
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
    },
    build: {
      outDir: 'dist', // Output directory for build
      target: 'esnext', // JavaScript target
      minify: mode === 'production' ? 'terser' : false, // Minification settings
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console logs in production
          drop_debugger: mode === 'production' // Remove debugger statements in production
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'], // Separate vendor chunk
          },
        },
      },
    },
    publicDir: 'public', // Directory for static assets
    css: {
      postcss: {
        plugins: [
          autoprefixer(), // Adds vendor prefixes
          tailwindcss()   // Tailwind CSS integration
        ]
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' } // Suppress specific warnings
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'], // Pre-bundle dependencies
    },
  };
});
```

