// src/Admin.js
import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [schedule, setSchedule] = useState([
    { name: "Period 1", start: "08:40 AM", end: "09:21 AM", visible: true },
    { name: "Period 2", start: "09:26 AM", end: "10:06 AM", visible: true },
    { name: "Period 3", start: "10:11 AM", end: "10:51 AM", visible: true },
    { name: "Period 4", start: "10:56 AM", end: "11:36 AM", visible: true },
    { name: "Period 5", start: "11:41 AM", end: "12:21 PM", visible: true },
    { name: "Period 6", start: "12:26 PM", end: "01:06 PM", visible: true },
    { name: "Period 7", start: "01:11 PM", end: "01:51 PM", visible: true },
    { name: "Period 8", start: "01:56 PM", end: "02:36 PM", visible: true },
    { name: "Assembly", start: "02:41 PM", end: "03:01 PM", visible: true },
  ]);

  useEffect(() => {
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const handleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const handleVisibilityChange = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].visible = !newSchedule[index].visible;
    setSchedule(newSchedule);
  };

  const handlePaste = (e) => {
    const pastedText = e.target.value;
    const lines = pastedText.split('\n');
    const newSchedule = lines.slice(1).map(line => {
      const [name, start, end] = line.split('\t');
      return { name, start, end, visible: true };
    });
    setSchedule(newSchedule);
  };

  const handleSave = () => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    alert('Schedule saved');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Page</h1>
      <textarea
        className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="10"
        placeholder="Paste schedule here"
        onBlur={handlePaste}
      />
      {schedule.map((period, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium mb-1">{period.name}</label>
          <input
            type="text"
            value={period.start}
            onChange={(e) => handleChange(index, 'start', e.target.value)}
            className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            value={period.end}
            onChange={(e) => handleChange(index, 'end', e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={period.visible}
              onChange={() => handleVisibilityChange(index)}
              className="mr-2"
            />
            <label>Visible</label>
          </div>
        </div>
      ))}
      <button onClick={handleSave} className="bg-blue-500 text-white rounded p-2">
        Save
      </button>
    </div>
  );
};

export default Admin;
