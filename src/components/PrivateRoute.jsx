import React, { memo, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logger from '../utils/logger';

// Access requirements component to reduce complexity of main component
const PrivateRoute = memo(({ 
  children, 
  requireAuth = false, 
  adminOnly = false, 
  teacherToolsAccess = false 
}) => {
  const { isLoggedIn, isAuthorized, isAdmin, user } = useAuth();
  const location = useLocation();
  
  // Consolidated check for access rights using useMemo
  const accessCheck = useMemo(() => {
    // Check login status first
    if (!isLoggedIn()) {
      logger.debug("PrivateRoute - Access denied: Not logged in", { path: location.pathname });
      return { hasAccess: false, redirectTo: "/", reason: "not_logged_in" };
    }
    
    // Check banned status
    if (user?.isBanned) {
      logger.debug("PrivateRoute - Access denied: User is banned", { path: location.pathname });
      return { hasAccess: false, redirectTo: "/banned", reason: "banned" };
    }
    
    // Check authorization requirements
    if (requireAuth && !isAuthorized()) {
      logger.debug("PrivateRoute - Access denied: Not authorized", { path: location.pathname });
      return { hasAccess: false, redirectTo: "/unauthorized", reason: "not_authorized" };
    }
    
    // Check admin-only access
    if (adminOnly && !isAdmin()) {
      logger.debug("PrivateRoute - Access denied: Admin access required", { path: location.pathname });
      return { hasAccess: false, redirectTo: "/unauthorized", reason: "not_admin" };
    }
    
    // Check teacher tools access
    if (teacherToolsAccess && !(user.email.endsWith('@spx.org') || isAdmin())) {
      logger.debug("PrivateRoute - Access denied: Teacher tools access required", { path: location.pathname });
      return { hasAccess: false, redirectTo: "/unauthorized", reason: "not_teacher" };
    }
    
    // If all checks pass, grant access
    logger.debug("PrivateRoute - Access granted", { path: location.pathname });
    return { hasAccess: true };
  }, [isLoggedIn, isAuthorized, isAdmin, user, location.pathname, requireAuth, adminOnly, teacherToolsAccess]);
  
  // Redirect to appropriate location if access is denied
  if (!accessCheck.hasAccess) {
    return <Navigate to={accessCheck.redirectTo} state={{ from: location }} replace />;
  }
  
  // Grant access to the protected route
  return children;
});

export default PrivateRoute;
