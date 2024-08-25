// src/Admin.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = ({ user }) => {
  const [weekSchedule, setWeekSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  });

  useEffect(() => {
    const savedSchedule = localStorage.getItem('weekSchedule');
    if (savedSchedule) {
      setWeekSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const handleChange = (day, index, field, value) => {
    const newSchedule = { ...weekSchedule };
    newSchedule[day][index][field] = value;
    setWeekSchedule(newSchedule);
  };

  const handleVisibilityChange = (day, index) => {
    const newSchedule = { ...weekSchedule };
    newSchedule[day][index].visible = !newSchedule[day][index].visible;
    setWeekSchedule(newSchedule);
  };

  const handleAddPeriod = (day) => {
    const newSchedule = { ...weekSchedule };
    newSchedule[day].push({ name: `Period ${newSchedule[day].length + 1}`, start: "", end: "", visible: true });
    setWeekSchedule(newSchedule);
  };

  const handleRemovePeriod = (day, index) => {
    const newSchedule = { ...weekSchedule };
    newSchedule[day].splice(index, 1);
    setWeekSchedule(newSchedule);
  };

  const handleSave = () => {
    localStorage.setItem('weekSchedule', JSON.stringify(weekSchedule));
    alert('Schedule saved');
  };

  const adminEmails = ['kagenmjensen@me.com', 'dcamick25@spxstudent.org'];
  
  if (!user || !adminEmails.includes(user.email.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Management Page</h1>
      {Object.entries(weekSchedule).map(([day, schedule]) => (
        <div key={day} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{day}</h2>
          {schedule.map((period, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <input
                type="text"
                value={period.name}
                onChange={(e) => handleChange(day, index, 'name', e.target.value)}
                className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Period Name"
              />
              <input
                type="text"
                value={period.start}
                onChange={(e) => handleChange(day, index, 'start', e.target.value)}
                className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Start Time (e.g., 08:40 AM)"
              />
              <input
                type="text"
                value={period.end}
                onChange={(e) => handleChange(day, index, 'end', e.target.value)}
                className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="End Time (e.g., 09:21 AM)"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={period.visible}
                  onChange={() => handleVisibilityChange(day, index)}
                  className="mr-2"
                />
                <label>Visible</label>
                <button
                  onClick={() => handleRemovePeriod(day, index)}
                  className="ml-auto bg-red-500 text-white rounded p-2"
                >
                  Remove Period
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => handleAddPeriod(day)}
            className="bg-green-500 text-white rounded p-2 mt-2"
          >
            Add Period
          </button>
        </div>
      ))}
      <button onClick={handleSave} className="bg-blue-500 text-white rounded p-2 mt-4">
        Save Schedule
      </button>
    </div>
  );
};

export default Admin;
