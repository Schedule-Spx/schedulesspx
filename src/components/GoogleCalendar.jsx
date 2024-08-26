// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            CALENDAR_ID
          )}/events`,
          {
            params: {
              key: API_KEY,
              timeMin: (new Date()).toISOString(),
              maxResults: 10,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        setEvents(response.data.items);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">
      <h2 className="text-xl font-bold mb-4">Important Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">
                {new Date(event.start.dateTime || event.start.date).toLocaleString()}:
              </span>{' '}
              {event.summary}
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
