// src/Admin.jsx
import React, { useState, useEffect } from 'react';

const Admin = ({ user, weekSchedule, setWeekSchedule, fetchSchedule }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newPeriod, setNewPeriod] = useState({ name: '', start: '', end: '' });
  const [saveStatus, setSaveStatus] = useState('');
  const [bulkInput, setBulkInput] = useState('');

  useEffect(() => {
    if (Object.keys(weekSchedule).length === 0) {
      fetchSchedule();
    }
  }, []);

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
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Save response:', result);
      setSaveStatus('Schedule saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
      fetchSchedule();
    } catch (error) {
      console.error('Error saving schedule:', error);
      setSaveStatus(`Failed to save schedule: ${error.message}`);
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-y-auto flex-grow">
        <h2 className="text-2xl font-bold mb-4">Admin Console</h2>
        <div className="mb-4">
          <label className="block mb-2">Select Day:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            {Object.keys(weekSchedule).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{selectedDay}'s Schedule</h3>
          <ul className="space-y-2">
            {weekSchedule[selectedDay] && weekSchedule[selectedDay].map((period, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{period}</span>
                <button
                  onClick={() => handleRemovePeriod(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Add New Period</h3>
          <input
            type="text"
            placeholder="Period Name"
            value={newPeriod.name}
            onChange={(e) => setNewPeriod(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="time"
            value={newPeriod.start}
            onChange={(e) => setNewPeriod(prev => ({ ...prev, start: e.target.value }))}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="time"
            value={newPeriod.end}
            onChange={(e) => setNewPeriod(prev => ({ ...prev, end: e.target.value }))}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleAddPeriod}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Period
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Bulk Add Periods</h3>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="Paste formatted schedule here..."
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            rows="10"
          />
          <button
            onClick={handleBulkInput}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Bulk Periods
          </button>
        </div>
        {saveStatus && (
          <p className={`mt-2 ${saveStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {saveStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Admin;
