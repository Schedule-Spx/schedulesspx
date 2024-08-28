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
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
          {
            params: {
              key: API_KEY,
              timeMin: new Date().toISOString(),
              maxResults: 5,
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

  if (loading) return <div className="p-4 text-stpius-white">Loading events...</div>;
  if (error) return <div className="p-4 text-stpius-white">Error: {error}</div>;
  if (Object.keys(events).length === 0) return <div className="p-4 text-stpius-white">No upcoming events</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-stpius-white">Upcoming Events</h2>
      <div className="space-y-4">
        {Object.entries(events).map(([date, dayEvents]) => (
          <div key={date}>
            <h3 className="text-lg font-semibold mb-2 text-stpius-white">{formatDate(date)}</h3>
            <ul className="space-y-2">
              {dayEvents.map((event) => (
                <li key={event.id} className="bg-stpius-gold/30 p-2 rounded">
                  <div className="font-semibold text-stpius-white">{event.summary}</div>
                  {event.start.dateTime && (
                    <div className="text-sm text-stpius-white/70">
                      {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleCalendar;
