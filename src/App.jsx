// src/App.jsx
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './ThemeContext';
import DayHeader from './DayHeader';
import Events from './Events';
import PeriodProgress from './PeriodProgress';
import PeriodTitleUpdater from './PeriodTitleUpdater';
import Schedule from './Schedule';
import NavBar from './NavBar';
import Admin from './Admin';
import Account from './components/Account';
import About from './components/About';
import AdComponent from './AdComponent';

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [user, setUser] = useState(null);

  const isAdminPage = location.pathname === '/admin';

  return (
    <div className={`App ${theme} flex flex-col min-h-screen ${isAdminPage ? 'overflow-auto' : 'overflow-hidden'}`}>
      <NavBar user={user} setUser={setUser} />
      <PeriodTitleUpdater />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/account" element={<Account user={user} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/"
          element={
            <main className="flex-grow flex flex-col p-4 space-y-4 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                <DayHeader />
                <Schedule />
                <Events user={user} />
              </div>
              <PeriodProgress user={user} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                <AdComponent adSlot="1234567890" />
                <AdComponent adSlot="1234567891" />
                <AdComponent adSlot="1234567892" />
              </div>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
