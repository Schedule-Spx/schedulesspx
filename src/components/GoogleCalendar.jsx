import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const { currentTheme } = useTheme();
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
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
        
        const groupedEvents = response.data.items.reduce((acc, event) => {
          const eventDate = new Date(event.start.dateTime || event.start.date);
          const localDate = new Date(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
          const dateString = localDate.toDateString();
          
          if (!acc[dateString]) {
            acc[dateString] = [];
          }
          acc[dateString].push(event);
          return acc;
        }, {});

        setEvents(groupedEvents);
      } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        setError(`Failed to fetch events: ${error.response?.data?.error?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleTimeString(undefined, options);
  };

  console.log('Current Theme:', currentTheme); // Debugging line

  const containerStyle = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    border: '2px solid #CCCCCC',
    borderRadius: '8px',
    padding: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const eventStyle = {
    backgroundColor: '#F3F4F6',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Upcoming Events</h2>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        {loading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>Error: {error}</div>
        ) : Object.keys(events).length === 0 ? (
          <div>No upcoming events</div>
        ) : (
          Object.entries(events).map(([date, dayEvents]) => (
            <div key={date} style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'semibold', marginBottom: '8px' }}>{formatDate(date)}</h3>
              <ul>
                {dayEvents.map((event) => (
                  <li key={event.id} style={eventStyle}>
                    <div style={{ fontWeight: 'semibold' }}>{event.summary}</div>
                    {event.start.dateTime && (
                      <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                        {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoogleCalendar;
