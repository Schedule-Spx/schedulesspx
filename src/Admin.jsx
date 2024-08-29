import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const Admin = ({ user, weekSchedule, setWeekSchedule, fetchSchedule }) => {
  const { currentTheme } = useTheme();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newPeriod, setNewPeriod] = useState({ name: '', start: '', end: '' });
  const [saveStatus, setSaveStatus] = useState('');
  const [bulkInput, setBulkInput] = useState('');

  // ... (rest of the component logic remains the same)

  return (
    <div className="flex-grow flex flex-col h-full">
      <div className={`${currentTheme.secondary} ${currentTheme.border} p-6 rounded-lg shadow-lg overflow-y-auto flex-grow`}>
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>Admin Console</h2>
        <div className="mb-4">
          <label className={`block mb-2 ${currentTheme.text}`}>Select Day:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className={`w-full p-2 border rounded ${currentTheme.primary} ${currentTheme.text} ${currentTheme.border}`}
          >
            {Object.keys(weekSchedule).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <h3 className={`text-xl font-semibold mb-2 ${currentTheme.text}`}>{selectedDay}'s Schedule</h3>
          <ul className="space-y-2">
            {weekSchedule[selectedDay] && weekSchedule[selectedDay].map((period, index) => (
              <li key={index} className={`flex justify-between items-center ${currentTheme.text}`}>
                <span>{period}</span>
                <button
                  onClick={() => handleRemovePeriod(index)}
                  className={`${currentTheme.primary} ${currentTheme.text} px-2 py-1 rounded hover:opacity-80`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className={`text-xl font-semibold mb-2 ${currentTheme.text}`}>Add New Period</h3>
          <input
            type="text"
            placeholder="Period Name"
            value={newPeriod.name}
            onChange={(e) => setNewPeriod(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full p-2 mb-2 border rounded ${currentTheme.primary} ${currentTheme.text} ${currentTheme.border}`}
          />
          <input
            type="time"
            value={newPeriod.start}
            onChange={(e) => setNewPeriod(prev => ({ ...prev, start: e.target.value }))}
            className={`w-full p-2 mb-2 border rounded ${currentTheme.primary} ${currentTheme.text} ${currentTheme.border}`}
          />
          <input
            type="time"
            value={newPeriod.end}
            onChange={(e) => setNewPeriod(prev => ({ ...prev, end: e.target.value }))}
            className={`w-full p-2 mb-2 border rounded ${currentTheme.primary} ${currentTheme.text} ${currentTheme.border}`}
          />
          <button
            onClick={handleAddPeriod}
            className={`${currentTheme.primary} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80`}
          >
            Add Period
          </button>
        </div>
        <div className="mb-4">
          <h3 className={`text-xl font-semibold mb-2 ${currentTheme.text}`}>Bulk Add Periods</h3>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="Paste formatted schedule here..."
            className={`w-full p-2 mb-2 border rounded ${currentTheme.primary} ${currentTheme.text} ${currentTheme.border}`}
            rows="10"
          />
          <button
            onClick={handleBulkInput}
            className={`${currentTheme.primary} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80`}
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
