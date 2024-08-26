// src/Account.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Account = ({ user }) => {
  if (!user) {
    return <p>Please log in to view your account information.</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 overflow-auto max-h-screen">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      <div className="mb-4">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="mt-8 space-y-2">
        <p>
          <Link 
            to="/privacy" 
            className="text-blue-500 hover:text-blue-700 underline"
          >
            View Privacy Policy
          </Link>
        </p>
        <p>
          <Link 
            to="/terms" 
            className="text-blue-500 hover:text-blue-700 underline"
          >
            View Terms and Conditions
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Account;
