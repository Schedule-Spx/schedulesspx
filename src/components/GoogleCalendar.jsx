// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
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
              maxResults: 50,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        
        setEvents(response.data.items);
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

  const isToday = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    return today.toDateString() === eventDate.toDateString();
  };

  const renderEventList = (eventList, isToday = false) => (
    <ul className="space-y-2">
      {eventList.map((event) => (
        <li key={event.id} className="bg-white dark:bg-gray-700 p-2 rounded shadow">
          <div className="font-semibold">{event.summary}</div>
          {event.start.dateTime && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : events.length === 0 ? (
          <div>No upcoming events</div>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Today's Events</h3>
              {renderEventList(events.filter(event => isToday(event.start.dateTime || event.start.date)), true)}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Future Events</h3>
              {renderEventList(events.filter(event => !isToday(event.start.dateTime || event.start.date)))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendar;
