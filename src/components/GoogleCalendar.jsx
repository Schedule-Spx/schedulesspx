// src/components/GoogleCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';

const GoogleCalendar = () => {
  const { currentTheme } = useTheme();
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
              maxResults: 10,
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
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleTimeString(undefined, options);
  };

  const isEventActive = (event) => {
    const now = new Date();
    const start = new Date(event.start.dateTime || event.start.date);
    const end = new Date(event.end.dateTime || event.end.date);
    return now >= start && now < end;
  };

  return (
    <div className={`${currentTheme.accent} p-4 rounded-lg shadow-md h-64`}>
      <h2 className={`text-lg font-bold mb-2 ${currentTheme.text}`}>Upcoming Events</h2>
      <div className="overflow-y-auto h-52">
        {loading ? (
          <div className={`${currentTheme.text} animate-pulse`}>Loading events...</div>
        ) : error ? (
          <div className={`${currentTheme.text} text-red-500`}>Error: {error}</div>
        ) : events.length === 0 ? (
          <div className={currentTheme.text}>No upcoming events</div>
        ) : (
          <ul className="space-y-2">
            {events.map((event, index) => {
              const isActive = isEventActive(event);
              return (
                <li 
                  key={event.id} 
                  className={`
                    relative text-sm ${currentTheme.main} bg-opacity-60 p-2 rounded
                    transition-all duration-300 ease-in-out
                    animate-fadeIn
                  `}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div 
                    className={`
                      absolute inset-0 rounded-lg 
                      ${isActive ? 'animate-highlightFadeIn' : ''}
                    `}
                    style={{
                      animationDelay: `${(index * 100) + 500}ms`,
                      animationDuration: '1.5s',
                    }}
                  ></div>
                  <div className={`font-semibold ${currentTheme.text} relative z-10`}>{event.summary}</div>
                  <div className={`text-xs ${currentTheme.text} opacity-80 relative z-10`}>
                    {formatDate(event.start.dateTime || event.start.date)}
                    {event.start.dateTime && ` ${formatTime(event.start.dateTime)}`}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendar;
