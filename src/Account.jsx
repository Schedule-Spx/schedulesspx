// src/Account.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Account = ({ user, weekSchedule }) => {
  if (!user) {
    return (
      <div className="container mx-auto mt-8 p-4">
        <p className="text-center text-xl text-stpius-white">Please log in to view your account information.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-stpius-white">Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-stpius-white text-sm font-bold mb-2">Name</label>
              <p className="bg-stpius-gold/30 text-stpius-white p-2 rounded">{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-stpius-white text-sm font-bold mb-2">Email</label>
              <p className="bg-stpius-gold/30 text-stpius-white p-2 rounded">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-stpius-white">Legal Information</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link 
            to="/privacy" 
            className="bg-stpius-gold text-stpius-blue font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-stpius-gold/80 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="bg-stpius-gold text-stpius-blue font-bold py-2 px-4 rounded w-full sm:w-auto text-center hover:bg-stpius-gold/80 transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
