// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import NavBar from './NavBar';
import QuickLinks from './QuickLinks';
import Schedule from './Schedule';

const App = () => {
  const { currentTheme } = useTheme();
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching schedule data
    fetch('/path-to-your-schedule-data.json')
      .then(response => response.json())
      .then(data => {
        setScheduleData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching schedule data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="App" style={{ backgroundColor: currentTheme.main }}>
      <NavBar />
      <main>
        <QuickLinks />
        {scheduleData ? (
          <Schedule scheduleData={scheduleData} />
        ) : (
          <div style={{ color: currentTheme.text }}>No schedule available</div>
        )}
      </main>
    </div>
  );
};

export default App;
