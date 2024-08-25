// src/Account.jsx
import React, { useState, useEffect } from 'react';

const Account = ({ user }) => {
  const [periodNames, setPeriodNames] = useState([
    "Period 1", "Period 2", "Period 3", "Period 4",
    "Period 5", "Period 6", "Period 7", "Period 8", "Assembly"
  ]);

  useEffect(() => {
    const savedNames = localStorage.getItem('periodNames');
    if (savedNames) {
      setPeriodNames(JSON.parse(savedNames));
    }
  }, []);

  const handleNameChange = (index, newName) => {
    const newNames = [...periodNames];
    newNames[index] = newName;
    setPeriodNames(newNames);
  };

  const handleSave = () => {
    localStorage.setItem('periodNames', JSON.stringify(periodNames));
    alert('Period names saved successfully!');
  };

  if (!user) {
    return <p>Please log in to view your account information.</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      <div className="mb-4">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <h2 className="text-xl font-bold mb-2">Customize Period Names</h2>
      {periodNames.map((name, index) => (
        <div key={index} className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Period {index + 1}:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      ))}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Save Period Names
      </button>
    </div>
  );
};

export default Account;
