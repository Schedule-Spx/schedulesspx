// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = __VITE_GOOGLE_API_KEY__;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!API_KEY) {
        console.error('API Key not found:', API_KEY);
        setError('Google API Key is not set');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
          {
            params: {
              key: API_KEY,
              timeMin: new Date().toISOString(),
              maxResults: 10, // Limit to 10 events
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        
        if (response.data.items && response.data.items.length > 0) {
          setEvents(response.data.items);
        } else {
          console.log('No events found in the response');
        }
      } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  if (loading) {
    return <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">Loading events...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">
      <h2 className="text-xl font-bold mb-4">Important Events</h2>
      {events.length > 0 ? (
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="text-sm">
              <div className="font-semibold">{formatDate(event.start.dateTime || event.start.date)}</div>
              <div>{event.summary}</div>
              {event.start.dateTime && (
                <div className="text-xs text-gray-500">
                  {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events.</p>
      )}
    </div>
  );
};

export default GoogleCalendar;
