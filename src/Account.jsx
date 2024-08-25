// src/Account.jsx
import React from 'react';

const Account = ({ user }) => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add more user information as needed */}
        </div>
      ) : (
        <p>Please log in to view your account information.</p>
      )}
    </div>
  );
};

export default Account;
