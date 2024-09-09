import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthorized, isAdmin } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute - user:", user);
  console.log("PrivateRoute - isAuthorized:", isAuthorized());
  console.log("PrivateRoute - isAdmin:", isAdmin());
  console.log("PrivateRoute - adminOnly:", adminOnly);

  if (!user) {
    console.log("PrivateRoute - No user, redirecting to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAuthorized()) {
    console.log("PrivateRoute - User not authorized");
    return <Navigate to="/unauthorized" replace />;
  }

  if (adminOnly && !isAdmin()) {
    console.log("PrivateRoute - Admin access required but user is not admin");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("PrivateRoute - User authorized, rendering children");
  return children;
};

export default PrivateRoute;
