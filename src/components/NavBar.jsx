// NavBar.jsx
"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleLogin from "./GoogleLogin";
import logo from "../assets/logo.svg";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

// Logout Icon Component
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// Account Icon Component
const AccountIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

const NavBar = () => {
  const { currentTheme } = useTheme();
  const { user, login, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    console.log("NavBar - Login success, userData:", userData);
    login(userData);
  };

  const handleLogout = () => {
    console.log("NavBar - Logout clicked");
    logout();
    navigate("/");
  };

  const canAccessTeacherTools = () => {
    return user && (user.email.endsWith("@spx.org") || isAdmin());
  };

  return (
    <div className={`${currentTheme.main} py-3`}>
      <div className="container mx-auto px-4">
        <div className={`
          relative rounded-lg border-2 ${currentTheme.border}
          overflow-hidden
        `}>
          {/* Shine Effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  45deg,
                  transparent 25%,
                  ${currentTheme.accent}15 45%,
                  ${currentTheme.accent}30 50%,
                  ${currentTheme.accent}15 55%,
                  transparent 75%
                )
              `,
              backgroundSize: '200% 200%',
              animation: 'shine 8s linear infinite',
            }}
          />

          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
              zIndex: 1
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex justify-between items-center h-[58px] px-8">
            {/* Left section */}
            <div className="flex items-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to="/" className="flex items-center whitespace-nowrap">
                  <img src={logo} alt="Schedule-SPX Logo" className="h-8 w-auto mr-2" />
                  <span className={`text-xl font-bold ${currentTheme.text}`}>Schedule-SPX</span>
                </Link>
              </motion.div>

              <div className="flex items-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/about" className={`text-sm font-medium ${currentTheme.text}`}>
                    About
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/news" className={`text-sm font-medium ${currentTheme.text}`}>
                    News
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  {canAccessTeacherTools() && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        to="/teacher-tools"
                        className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-1.5 px-3 rounded`}
                      >
                        Teacher Tools
                      </Link>
                    </motion.div>
                  )}

                  {isAdmin() && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        to="/admin"
                        className={`${currentTheme.accent} ${currentTheme.text} text-sm font-medium py-1.5 px-3 rounded`}
                      >
                        Admin Console
                      </Link>
                    </motion.div>
                  )}

                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link to="/account">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center overflow-hidden ${currentTheme.accent} bg-opacity-20`}>
                          {user.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <AccountIcon />
                          )}
                        </div>
                      </Link>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`${currentTheme.accent} ${currentTheme.text} p-2 rounded-full hover:opacity-80 transition-opacity duration-200`}
                      onClick={handleLogout}
                      title="Logout"
                    >
                      <LogoutIcon />
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <GoogleLogin onLoginSuccess={handleLoginSuccess} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shine Animation Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
