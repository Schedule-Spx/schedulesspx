// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("AuthContext - useEffect running");
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    console.log("AuthContext - Saved user:", savedUser);
    console.log("AuthContext - Saved expiry:", savedExpiry);
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      const parsedUser = JSON.parse(savedUser);
      console.log("AuthContext - Loaded user from storage:", parsedUser);
      setUser(parsedUser);
    } else {
      console.log("AuthContext - Clearing local storage");
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }
  }, []);

  const login = (userData) => {
    console.log("AuthContext - Login called with userData:", userData);
    const authorizedUser = {
      ...userData,
      isAuthorized: isAuthorizedEmail(userData.email)
    };
    console.log("AuthContext - Authorized user:", authorizedUser);
    setUser(authorizedUser);
    localStorage.setItem('user', JSON.stringify(authorizedUser));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem('sessionExpiry', expiry.toString());
  };

  const logout = () => {
    console.log("AuthContext - Logout called");
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  };

  const isAuthorizedEmail = (email) => {
    console.log("AuthContext - Checking authorization for email:", email);
    const allowedDomains = ['spx.org', 'spxstudent.org'];
    const allowedEmails = ['kagenmjensen@me.com'];
    const isAuthorized = allowedDomains.includes(email.split('@')[1]) || allowedEmails.includes(email);
    console.log("AuthContext - Is authorized:", isAuthorized);
    return isAuthorized;
  };

  const isAuthorized = () => {
    console.log("AuthContext - isAuthorized called, user:", user);
    const authorized = user && user.isAuthorized;
    console.log("AuthContext - isAuthorized result:", authorized);
    return authorized;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
