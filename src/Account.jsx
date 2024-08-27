// src/Account.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PeriodRenamer from './PeriodRenamer';

const Account = ({ user, weekSchedule }) => {
  if (!user) {
    return (
      <div className="container mx-auto mt-8 p-4">
        <p className="text-center text-xl">Please log in to view your account information.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name</label>
              <p className="bg-gray-100 dark:bg-gray-700 p-2 rounded">{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
              <p className="bg-gray-100 dark:bg-gray-700 p-2 rounded">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Customize Period Names</h2>
          <PeriodRenamer weekSchedule={weekSchedule} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Legal Information</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link 
            to="/privacy" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
