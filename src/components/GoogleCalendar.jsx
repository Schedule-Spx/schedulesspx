// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'your_calendar_id_here@group.calendar.google.com';

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
          {
            params: {
              key: API_KEY,
              timeMin: new Date().toISOString(),
              maxResults: 10,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        setEvents(response.data.items || []);
      } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        setError('Failed to fetch events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (events.length === 0) return <div>No upcoming events</div>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleCalendar;
