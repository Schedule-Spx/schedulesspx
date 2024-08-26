// src/Admin.jsx
import React, { useState } from 'react';

const Admin = () => {
  const [weekSchedule, setWeekSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  const handlePeriodChange = (day, index, period) => {
    setWeekSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [
        ...prevSchedule[day].slice(0, index),
        period,
        ...prevSchedule[day].slice(index + 1),
      ],
    }));
  };

  const handleAddPeriod = (day) => {
    setWeekSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [...prevSchedule[day], ''],
    }));
  };

  const handleRemovePeriod = (day, index) => {
    setWeekSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [
        ...prevSchedule[day].slice(0, index),
        ...prevSchedule[day].slice(index + 1),
      ],
    }));
  };

  const handleSave = async () => {
    try {
      await fetch('https://schedule-api.devs4u.workers.dev/api/schedule', {
        method: 'POST',
        body: JSON.stringify(weekSchedule),
      });
      alert('Schedule saved successfully');
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule');
    }
  };

  return (
    <div>
      <h2>Admin Console</h2>
      {Object.entries(weekSchedule).map(([day, periods]) => (
        <div key={day}>
          <h3>{day}</h3>
          {periods.map((period, index) => (
            <div key={index}>
              <input
                type="text"
                value={period}
                onChange={(e) => handlePeriodChange(day, index, e.target.value)}
              />
              <button onClick={() => handleRemovePeriod(day, index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleAddPeriod(day)}>Add Period</button>
        </div>
      ))}
      <button onClick={handleSave}>Save Schedule</button>
    </div>
  );
};

export default Admin;
