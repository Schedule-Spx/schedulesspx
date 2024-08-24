// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './ThemeContext';
import DayHeader from './DayHeader';
import Events from './Events';
import PeriodProgress from './PeriodProgress';
import PeriodTitleUpdater from './PeriodTitleUpdater';
import Schedule from './Schedule';
import NavBar from './NavBar';
import Admin from './Admin';
import AdComponent from './AdComponent';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <NavBar toggleTheme={toggleTheme} />
        <PeriodTitleUpdater />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/"
            element={
              <>
                <div className="App-main">
                  <div className="glass-tile">
                    <DayHeader />
                  </div>
                  <div className="glass-tile">
                    <Schedule />
                  </div>
                  <div className="glass-tile">
                    <Events />
                  </div>
                  <div className="period-progress col-span-3">
                    <PeriodProgress />
                  </div>
                </div>
                <div className="App-ads">
                  <div className="ad-widget">
                    <AdComponent adSlot="1234567890" /> {/* Replace with your ad slot ID */}
                  </div>
                  <div className="ad-widget">
                    <AdComponent adSlot="1234567891" /> {/* Replace with your ad slot ID */}
                  </div>
                  <div className="ad-widget">
                    <AdComponent adSlot="1234567892" /> {/* Replace with your ad slot ID */}
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
