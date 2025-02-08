import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reminderPreference, setReminderPreference] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExpiry = localStorage.getItem('sessionExpiry');
    const isBanned = localStorage.getItem('isBanned') === 'true';

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
      localStorage.removeItem('isBanned');
    }

    if (user?.isBanned) {
      window.location.href = '/banned';
    }
  }, []);

  const bannedEmails = ['ccrosby25@spxstudent.org', '26@spxstudent.org','dedwards25@spxstudent.org','achenault25@spxstudent.org','wfreeman25@spxstudent.org','guebelacker25@spxstudent.org','etewolde27@spxstudent.org'];

  const login = (userData) => {
    const authorizedUser = {
      ...userData,
      isAuthorized: isAuthorizedEmail(userData.email),
      isAdmin: isAdminEmail(userData.email),
      isStudent: isStudentEmail(userData.email),
      isBanned: isBannedEmail(userData.email),
      reminderPreference: userData.reminderPreference ?? true,
    };

    if (authorizedUser.isBanned) {
      setUser(authorizedUser);
      localStorage.setItem('user', JSON.stringify(authorizedUser));
      const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem('sessionExpiry', expiry.toString());
      localStorage.setItem('isBanned', authorizedUser.isBanned.toString());
      window.location.href = '/banned';
      return;
    }

    setUser(authorizedUser);
    localStorage.setItem('user', JSON.stringify(authorizedUser));
    const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem('sessionExpiry', expiry.toString());
    localStorage.setItem('isBanned', authorizedUser.isBanned.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    localStorage.removeItem('isBanned');
  };

  const isAuthorizedEmail = (email) => {
    const allowedDomains = ['spx.org', 'spxstudent.org'];
    const allowedEmails = ['kagenmjensen@me.com',];
    return !bannedEmails.includes(email.toLowerCase()) && (allowedDomains.includes(email.split('@')[1].toLowerCase()) || allowedEmails.includes(email.toLowerCase()));
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
    return (email.toLowerCase().includes('26@spxstudent.org') && email.toLowerCase() !== 'ehuffman26@spxstudent.org') || bannedEmails.includes(email.toLowerCase());
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

  const updateReminderPreference = (preference) => {
    setReminderPreference(preference);
    if (user) {
      const updatedUser = { ...user, reminderPreference: preference };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAuthorized, isAdmin, isStudent, reminderPreference, updateReminderPreference }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
