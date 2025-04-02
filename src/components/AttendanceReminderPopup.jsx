import React, { useState, useEffect, useCallback, memo } from 'react';
import { useAuth } from '../context/AuthContext';

// Constants
const REMINDER_DELAY = 8 * 60 * 1000; // 8 minutes in milliseconds

// Memoized button component for better performance
const Button = memo(({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
));

// Main component
const AttendanceReminderPopup = memo(({ onClose }) => {
  const { user, updateReminderPreference } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Setup timer only once when component mounts
  useEffect(() => {
    // Only set timer if user is a teacher with reminder preference enabled
    if (user?.isTeacher && user?.reminderPreference) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, REMINDER_DELAY);
      
      // Clean up timer when component unmounts
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Memoize handlers to prevent recreation on each render
  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose();
  }, [onClose]);

  const handleTurnOffReminder = useCallback(() => {
    updateReminderPreference(false);
    setIsVisible(false);
  }, [updateReminderPreference]);

  // Early return for performance
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4">Attendance Reminder</h2>
        <p className="mb-4">You have 2 minutes to submit your attendance.</p>
        <p className="mb-4">If you want to turn off this reminder, you can do so on the account page.</p>
        <Button
          onClick={handleClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Close
        </Button>
        <Button
          onClick={handleTurnOffReminder}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Turn Off Reminder
        </Button>
      </div>
    </div>
  );
});

export default AttendanceReminderPopup;
