import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const savedUser = localStorage.getItem('user');
  const savedExpiry = localStorage.getItem('sessionExpiry');
  
  if (savedUser && savedExpiry && new Date().getTime() < parseInt(savedExpiry)) {
    const user = JSON.parse(savedUser);

    // Check and reset banned status if user no longer matches banned email
    if (isBannedEmail(user.email)) {
      user.isBanned = true;
    } else {
      user.isBanned = false;
    }

    setUser(user);
  } else {
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  }
}, []);

  const login = (userData) => {
    const authorizedUser = {
      ...userData,
      isAuthorized: isAuthorizedEmail(userData.email),
      isAdmin: isAdminEmail(userData.email),
      isStudent: isStudentEmail(userData.email),
      isBanned: isBannedEmail(userData.email),
    };
    setUser(authorizedUser);
    localStorage.setItem('user', JSON.stringify(authorizedUser));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem('sessionExpiry', expiry.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  };

  const isAuthorizedEmail = (email) => {
    const allowedDomains = ['spx.org', 'spxstudent.org'];
    const allowedEmails = ['kagenmjensen@me.com',];
    return allowedDomains.includes(email.split('@')[1].toLowerCase()) || allowedEmails.includes(email.toLowerCase());
  };

  const isAdminEmail = (email) => {
    const adminEmails = ['kagenmjensen@me.com',"dcamick25@spxstudent.org","lfarrell@spx.org", "rpage27@spxstudent.org"];
    return adminEmails.includes(email.toLowerCase());
  };

  const isStudentEmail = (email) => {
    const studentDomains = ['spxstudent.org'];
    return studentDomains.includes(email.split('@')[1].toLowerCase());
  };

  const isBannedEmail = (email) => {
    return email.toLowerCase().endsWith('26@spxstudent.org') && !(email.toLowerCase() == 'ehuffman26@spxstudent.org');
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const isAuthorized = () => {
    return user && user.isAuthorized;
  };

  const isAdmin = () => {
    return user && user.isAdmin;
  };

  const isStudent = () => {
    return user && user.isStudent;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAuthorized, isAdmin, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
