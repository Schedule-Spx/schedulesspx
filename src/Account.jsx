import React, { useState, useEffect } from 'react';

const Account = ({ user, periodNames, setPeriodNames }) => {
  const [localPeriodNames, setLocalPeriodNames] = useState(periodNames);

  useEffect(() => {
    setLocalPeriodNames(periodNames);
  }, [periodNames]);

  const handleNameChange = (index, newName) => {
    const newNames = [...localPeriodNames];
    newNames[index] = newName;
    setLocalPeriodNames(newNames);
  };

  const handleSave = () => {
    setPeriodNames(localPeriodNames);
    localStorage.setItem('periodNames', JSON.stringify(localPeriodNames));
    alert('Period names saved successfully!');
  };

  if (!user) {
    return <p>Please log in to view your account information.</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      <div className="mb-4">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <h2 className="text-xl font-bold mb-2">Customize Period Names</h2>
      {localPeriodNames.map((name, index) => (
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
