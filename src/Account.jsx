import React from 'react';

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
      {/* Add more account-related information and settings */}
    </div>
  );
};

export default Account;
