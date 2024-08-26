import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [weekSchedule, setWeekSchedule] = useState({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: []
  });
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newPeriod, setNewPeriod] = useState({ name: '', start: '', end: '' });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule');
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      console.log('Fetched schedule:', data); // Log the fetched data
      setWeekSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const handleAddPeriod = () => {
    if (newPeriod.name && newPeriod.start && newPeriod.end) {
      const newPeriodString = `${newPeriod.name} - ${newPeriod.start}-${newPeriod.end}`;
      setWeekSchedule(prev => ({
        ...prev,
        [selectedDay]: [...prev[selectedDay], newPeriodString]
      }));
      setNewPeriod({ name: '', start: '', end: '' });
    }
  };

  const handleRemovePeriod = (index) => {
    setWeekSchedule(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weekSchedule)
      });
      if (!response.ok) throw new Error('Failed to save schedule');
      alert('Schedule saved successfully');
      console.log('Saved schedule:', weekSchedule); // Log the saved data
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
          {weekSchedule[selectedDay].map((period, index) => (
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
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save Schedule
      </button>
    </div>
  );
};

export default Admin;
