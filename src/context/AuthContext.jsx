import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      console.log("AuthProvider - Loaded user from localStorage:", parsedUser);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
      console.log("AuthProvider - No valid user in localStorage");
    }
  }, []);

  const login = (userData) => {
    const authorizedUser = {
      ...userData,
      isAuthorized: isAuthorizedEmail(userData.email),
      isAdmin: isAdminEmail(userData.email)
    };
    setUser(authorizedUser);
    localStorage.setItem('user', JSON.stringify(authorizedUser));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem('sessionExpiry', expiry.toString());
    console.log("AuthProvider - User logged in:", authorizedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    console.log("AuthProvider - User logged out");
  };

  const isAuthorizedEmail = (email) => {
    const allowedDomains = ['spx.org', 'spxstudent.org'];
    const allowedEmails = ['kagenmjensen@me.com'];
    return allowedDomains.includes(email.split('@')[1]) || allowedEmails.includes(email);
  };

  const isAdminEmail = (email) => {
    const adminEmails = ['kagenmjensen@me.com'];
    return adminEmails.includes(email.toLowerCase());
  };

  const isLoggedIn = () => {
    const loggedIn = !!user;
    console.log("AuthProvider - isLoggedIn:", loggedIn);
    return loggedIn;
  };

  const isAuthorized = () => {
    const authorized = user && user.isAuthorized;
    console.log("AuthProvider - isAuthorized:", authorized);
    return authorized;
  };

  const isAdmin = () => {
    const admin = user && user.isAdmin;
    console.log("AuthProvider - isAdmin:", admin);
    return admin;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAuthorized, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
