import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Admin = ({ weekSchedule, setWeekSchedule, fetchSchedule }) => {
  const { currentTheme } = useTheme();
  const { user, isAuthorized, isAdmin } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newPeriod, setNewPeriod] = useState({ name: '', start: '', end: '' });
  const [saveStatus, setSaveStatus] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [popup, setPopup] = useState({ title: '', message: '', author: '', isActive: false });

  useEffect(() => {
    if (Object.keys(weekSchedule).length === 0) {
      fetchSchedule();
    }
    fetchCurrentPopup();
  }, []);

  const fetchCurrentPopup = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPopup(data);
      } else {
        console.error("Failed to fetch popup:", await response.text());
      }
    } catch (error) {
      console.error('Error fetching popup:', error);
    }
  };

  const handleAddPeriod = () => {
    if (newPeriod.name && newPeriod.start && newPeriod.end) {
      const newPeriodString = `${newPeriod.name} - ${newPeriod.start}-${newPeriod.end}`;
      const updatedSchedule = {
        ...weekSchedule,
        [selectedDay]: [...weekSchedule[selectedDay], newPeriodString]
      };
      setWeekSchedule(updatedSchedule);
      setNewPeriod({ name: '', start: '', end: '' });
      saveSchedule(updatedSchedule);
    }
  };

  const handleRemovePeriod = (index) => {
    const updatedSchedule = {
      ...weekSchedule,
      [selectedDay]: weekSchedule[selectedDay].filter((_, i) => i !== index)
    };
    setWeekSchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
  };

  const handleBulkInput = () => {
    const lines = bulkInput.trim().split('\n');
    const newPeriods = lines.slice(1).map(line => {
      const [name, start, end] = line.split('\t');
      return `${name} - ${start}-${end}`;
    });

    const updatedSchedule = {
      ...weekSchedule,
      [selectedDay]: newPeriods
    };
    setWeekSchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
    setBulkInput('');
  };

  const saveSchedule = async (schedule) => {
    try {
      setSaveStatus('Saving...');
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/schedule', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(schedule)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const result = await response.json();
      setSaveStatus('Schedule saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
      fetchSchedule();
    } catch (error) {
      console.error('Error saving schedule:', error);
      setSaveStatus(`Failed to save schedule: ${error.message}`);
    }
  };

  const savePopup = async () => {
    try {
      setSaveStatus('Saving popup...');
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(popup)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      setSaveStatus('Popup saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
      fetchCurrentPopup();
    } catch (error) {
      console.error('Error saving popup:', error);
      setSaveStatus(`Failed to save popup: ${error.message}`);
    }
  };

  // Add functions for markdown formatting
  const insertMarkdown = (syntax, placeholder) => {
    // Get the textarea element for popup message
    const textarea = document.getElementById('popup-message');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = popup.message;
    const selectedText = text.substring(start, end);
    
    let newText;
    if (selectedText) {
      // If text is selected, wrap it with syntax
      if (syntax === '[](url)') {
        newText = text.substring(0, start) + 
                 `[${selectedText}](url)` + 
                 text.substring(end);
      } else {
        newText = text.substring(0, start) + 
                 syntax.replace('text', selectedText) + 
                 text.substring(end);
      }
    } else {
      // If no text is selected, insert syntax with placeholder
      if (syntax === '[](url)') {
        newText = text.substring(0, start) + 
                 `[${placeholder}](url)` + 
                 text.substring(end);
      } else {
        newText = text.substring(0, start) + 
                 syntax.replace('text', placeholder) + 
                 text.substring(end);
      }
    }
    
    setPopup(prev => ({ ...prev, message: newText }));
    
    // After state update, set the selection range for better UX
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        if (syntax === '[](url)') {
          // Position cursor in the URL section
          textarea.selectionStart = start + selectedText.length + 2;
          textarea.selectionEnd = start + selectedText.length + 5;
        }
      } else {
        // Position cursor to write over placeholder text
        textarea.selectionStart = start + syntax.indexOf('text');
        textarea.selectionEnd = start + syntax.indexOf('text') + placeholder.length;
      }
    }, 0);
  };

  const inputStyle = `w-full p-2 mb-2 border rounded ${currentTheme.input} text-gray-900`;

  if (!user || !isAuthorized() || !isAdmin()) {
    return (
      <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative h-full flex flex-col justify-center items-center`}>
        <p className={`${currentTheme.text} text-center`}>You are not authorized to access the admin panel.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${currentTheme.main} ${currentTheme.text}`}>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className={`${currentTheme.secondary} border-2 ${currentTheme.border} p-6 rounded-lg shadow-lg`}>
            <h2 className={`text-2xl font-bold mb-6`}>Admin Console</h2>

            {/* Popup Management Section */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4`}>Manage Popup</h3>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Current Popup</h4>
                <p>Title: {popup.title}</p>
                <p>Message: {popup.message}</p>
                <p>Author: {popup.author}</p>
                <p>Active: {popup.isActive ? 'Yes' : 'No'}</p>
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Set New Popup</h4>
                <input
                  type="text"
                  placeholder="Popup Title"
                  value={popup.title}
                  onChange={(e) => setPopup(prev => ({ ...prev, title: e.target.value }))}
                  className={inputStyle}
                />
                {/* Add Markdown formatting toolbar */}
                <div className="flex flex-wrap gap-2 mb-2 mt-2">
                  <button
                    type="button"
                    onClick={() => insertMarkdown('**text**', 'bold text')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium`}
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('*text*', 'italic text')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 italic`}
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('# text', 'Heading')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300`}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('## text', 'Subheading')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300`}
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('[](url)', 'link text')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300`}
                    title="Link"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('- text', 'list item')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300`}
                    title="Bullet List"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('1. text', 'list item')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300`}
                    title="Numbered List"
                  >
                    1.
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('`text`', 'code')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 font-mono`}
                    title="Inline Code"
                  >
                    &lt;/&gt;
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('> text', 'blockquote')}
                    className={`px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300`}
                    title="Quote"
                  >
                    "
                  </button>
                </div>
                <textarea
                  id="popup-message"
                  placeholder="Popup Message"
                  value={popup.message}
                  onChange={(e) => setPopup(prev => ({ ...prev, message: e.target.value }))}
                  className={inputStyle}
                  rows="5"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={popup.author}
                  onChange={(e) => setPopup(prev => ({ ...prev, author: e.target.value }))}
                  className={inputStyle}
                />
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={popup.isActive}
                    onChange={(e) => setPopup(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  <label>Active</label>
                </div>
                <button
                  onClick={savePopup}
                  className={`${currentTheme.accent} px-4 py-2 rounded hover:opacity-80`}
                >
                  Save Popup
                </button>
              </div>
            </div>

            {/* Schedule Management Section */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4`}>Manage Schedule</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddPeriod}
                    className={`${currentTheme.accent} px-4 py-2 rounded hover:opacity-80`}
                  >
                    Add Period
                  </button>
                  <button
                    onClick={handleBulkInput}
                    className={`${currentTheme.accent} px-4 py-2 rounded hover:opacity-80`}
                  >
                    Add Bulk Periods
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className={`block mb-2`}>Select Day:</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className={inputStyle}
                >
                  {Object.keys(weekSchedule).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>{selectedDay}'s Schedule</h4>
                <ul className="space-y-2">
                  {weekSchedule[selectedDay] && weekSchedule[selectedDay].map((period, index) => (
                    <li key={index} className={`flex justify-between items-center`}>
                      <span>{period}</span>
                      <button
                        onClick={() => handleRemovePeriod(index)}
                        className={`${currentTheme.accent} px-2 py-1 rounded hover:opacity-80`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Add New Period</h4>
                <input
                  type="text"
                  placeholder="Period Name"
                  value={newPeriod.name}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, name: e.target.value }))}
                  className={inputStyle}
                />
                <input
                  type="time"
                  value={newPeriod.start}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, start: e.target.value }))}
                  className={inputStyle}
                />
                <input
                  type="time"
                  value={newPeriod.end}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, end: e.target.value }))}
                  className={inputStyle}
                />
              </div>
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2`}>Bulk Add Periods</h4>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="Paste formatted schedule here..."
                  className={inputStyle}
                  rows="10"
                />
              </div>
            </div>

            {saveStatus && (
              <p className={`mt-2 ${saveStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                {saveStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

