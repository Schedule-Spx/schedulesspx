import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requireAuth = false, adminOnly = false, teacherToolsAccess = false }) => {
  const { isLoggedIn, isAuthorized, isAdmin, user } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute - isLoggedIn:", isLoggedIn());
  console.log("PrivateRoute - isAuthorized:", isAuthorized());
  console.log("PrivateRoute - isAdmin:", isAdmin());
  console.log("PrivateRoute - requireAuth:", requireAuth);
  console.log("PrivateRoute - adminOnly:", adminOnly);
  console.log("PrivateRoute - teacherToolsAccess:", teacherToolsAccess);

  if (!isLoggedIn()) {
    console.log("PrivateRoute - Not logged in, redirecting to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user?.isBanned) {
    console.log("PrivateRoute - User is banned, redirecting to banned page");
    return <Navigate to="/banned" replace />;
  }

  if (requireAuth && !isAuthorized()) {
    console.log("PrivateRoute - User not authorized");
    return <Navigate to="/unauthorized" replace />;
  }

  if (adminOnly && !isAdmin()) {
    console.log("PrivateRoute - Admin access required but user is not admin");
    return <Navigate to="/unauthorized" replace />;
  }

  if (teacherToolsAccess && !(user.email.endsWith('@spx.org') || isAdmin())) {
    console.log("PrivateRoute - Teacher Tools access required but user is not eligible");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("PrivateRoute - User authorized, rendering children");
  return children;
};

export default PrivateRoute;
