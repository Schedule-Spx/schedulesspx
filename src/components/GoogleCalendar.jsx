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

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full border-2 border-gray-200 dark:border-gray-700 flex flex-col h-full`}>
      <div className="p-4 flex flex-col h-full">
        <h2 className={`text-xl font-bold text-gray-800 dark:text-white mb-4`}>Upcoming Events</h2>
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <div className={`text-gray-800 dark:text-white animate-pulse`}>Loading events...</div>
          ) : error ? (
            <div className={`text-red-500`}>Error: {error}</div>
          ) : Object.keys(events).length === 0 ? (
            <div className={`text-gray-800 dark:text-white`}>No upcoming events</div>
          ) : (
            Object.entries(events).map(([date, dayEvents]) => (
              <div key={date} className="mb-4">
                <h3 className={`text-lg font-semibold text-gray-800 dark:text-white mb-2`}>{formatDate(date)}</h3>
                <ul className="space-y-2">
                  {dayEvents.map((event) => (
                    <li 
                      key={event.id} 
                      className={`bg-gray-100 dark:bg-gray-700 p-2 rounded shadow transition-all duration-300 ease-in-out`}
                    >
                      <div className={`font-semibold text-gray-800 dark:text-white`}>{event.summary}</div>
                      {event.start.dateTime && (
                        <div className={`text-sm text-gray-600 dark:text-gray-300`}>
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
    </div>
  );
};

export default GoogleCalendar;
