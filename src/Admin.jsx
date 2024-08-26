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
  const [selectedDay, setSelectedDay] = useState('Monday');

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

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    const lines = pastedText.split('\n');
    const newSchedule = lines.map((line) => {
      const [name, start, end] = line.split('\t');
      return { name, start, end, visible: true };
    });
    setWeekSchedule({ ...weekSchedule, [selectedDay]: newSchedule });
  };

  const adminEmails = ['kagenmjensen@me.com', 'dcamick25@spxstudent.org'];
  
  if (!user || !adminEmails.includes(user.email.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Management Page</h1>
      <div className="mb-4">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded mr-2 ${
              selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{selectedDay}</h2>
        <textarea
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="10"
          placeholder="Paste your schedule here..."
          onPaste={handlePaste}
        ></textarea>
      </div>
      {weekSchedule[selectedDay].map((period, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={period.name}
            onChange={(e) => handleChange(selectedDay, index, 'name', e.target.value)}
            className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Period Name"
          />
          <input
            type="text"
            value={period.start}
            onChange={(e) => handleChange(selectedDay, index, 'start', e.target.value)}
            className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Start Time (e.g., 08:40 AM)"
          />
          <input
            type="text"
            value={period.end}
            onChange={(e) => handleChange(selectedDay, index, 'end', e.target.value)}
            className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="End Time (e.g., 09:21 AM)"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={period.visible}
              onChange={() => handleVisibilityChange(selectedDay, index)}
              className="mr-2"
            />
            <label>Visible</label>
            <button
              onClick={() => handleRemovePeriod(selectedDay, index)}
              className="ml-auto bg-red-500 text-white rounded p-2"
            >
              Remove Period
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => handleAddPeriod(selectedDay)}
        className="bg-green-500 text-white rounded p-2 mt-2"
      >
        Add Period
      </button>
      <button onClick={handleSave} className="bg-blue-500 text-white rounded p-2 mt-4">
        Save Schedule
      </button>
    </div>
  );
};

export default Admin;
