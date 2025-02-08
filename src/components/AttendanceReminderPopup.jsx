import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AttendanceReminderPopup = ({ onClose }) => {
  const { user, updateReminderPreference } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.isTeacher && user?.reminderPreference) {
        setIsVisible(true);
      }
    }, 8 * 60 * 1000); // 8 minutes

    return () => clearTimeout(timer);
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleTurnOffReminder = () => {
    updateReminderPreference(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4">Attendance Reminder</h2>
        <p className="mb-4">You have 2 minutes to submit your attendance.</p>
        <p className="mb-4">If you want to turn off this reminder, you can do so on the account page.</p>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Close
        </button>
        <button
          onClick={handleTurnOffReminder}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Turn Off Reminder
        </button>
      </div>
    </div>
  );
};

export default AttendanceReminderPopup;
