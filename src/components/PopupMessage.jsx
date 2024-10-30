import React, { useState, useEffect } from 'react';

const PopupMessage = ({ title, message, author, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6 whitespace-pre-wrap">{message}</p>
        <p className="text-sm text-gray-500 mb-4">- {author}</p>
        <button 
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
