// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!API_KEY) {
        setError('Google API Key is not set');
        setLoading(false);
        return;
      }
      try {
        console.log('Fetching events with API Key:', API_KEY);
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            CALENDAR_ID
          )}/events`,
          {
            params: {
              key: API_KEY,
              timeMin: new Date().toISOString(),
              maxResults: 20,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        
        console.log('API Response:', response.data);
        
        if (response.data.items && response.data.items.length > 0) {
          // Group events by date
          const groupedEvents = response.data.items.reduce((acc, event) => {
            const date = new Date(event.start.dateTime || event.start.date).toDateString();
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(event);
            return acc;
          }, {});

          setEvents(groupedEvents);
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

  const formatTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">
        <h2 className="text-xl font-bold mb-4">Important Events</h2>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">
        <h2 className="text-xl font-bold mb-4">Important Events</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile overflow-auto" style={{maxHeight: '400px'}}>
      <h2 className="text-xl font-bold mb-4">Important Events</h2>
      {Object.keys(events).length > 0 ? (
        Object.entries(events).map(([date, dayEvents]) => (
          <div key={date} className="mb-4">
            <h3 className="font-semibold">{formatDate(date)}</h3>
            <ul className="list-disc list-inside">
              {dayEvents.map((event, index) => (
                <li key={index} className="text-sm">
                  {event.start.dateTime ? `${formatTime(event.start.dateTime)} - ` : ''}
                  {event.summary}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No upcoming events.</p>
      )}
    </div>
  );
};

export default GoogleCalendar;
