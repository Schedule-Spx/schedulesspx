import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
    }
  }, []);

  const login = (userData) => {
    const userWithAuth = { ...userData, isAuthorized: isAuthorized(userData.email) };
    setUser(userWithAuth);
    localStorage.setItem('user', JSON.stringify(userWithAuth));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem('sessionExpiry', expiry.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  };

  const isAuthorized = (email) => {
    const allowedDomains = ['spx.org', 'spxstudent.org'];
    const allowedEmails = ['kagenmjensen@me.com'];
    return allowedDomains.includes(email.split('@')[1]) || allowedEmails.includes(email);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
