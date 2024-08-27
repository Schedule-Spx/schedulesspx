import React from 'react';
import { Link } from 'react-router-dom';
import PeriodRenamer from './PeriodRenamer';

const Account = ({ user, weekSchedule }) => {
  if (!user) {
    return <p>Please log in to view your account information.</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 overflow-auto max-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      <div className="mb-4">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="mt-8 space-y-4">
        <Link 
          to="/privacy" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          View Privacy Policy
        </Link>
        <Link 
          to="/terms" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block ml-4"
        >
          View Terms of Service
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Rename Periods</h2>
        <PeriodRenamer weekSchedule={weekSchedule} />
      </div>
    </div>
  );
};

export default Account;
