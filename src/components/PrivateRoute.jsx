import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isAuthorized } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if the user is authorized
  if (!isAuthorized()) {
    // If the user is logged in but not authorized, show an error message or redirect
    return <Navigate to="/unauthorized" replace />;
  }

  // If the user is logged in and authorized, render the children
  return children;
};

export default PrivateRoute;
