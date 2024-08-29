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
    <div className={`h-full flex flex-col ${currentTheme.accent} rounded-lg shadow-md overflow-hidden`}>
      <h2 className={`text-lg font-bold p-4 ${currentTheme.text}`}>Upcoming Events</h2>
      <div className="flex-grow flex flex-col">
        {loading ? (
          <div className={`${currentTheme.text} animate-pulse p-4`}>Loading events...</div>
        ) : error ? (
          <div className={`${currentTheme.text} text-red-500 p-4`}>Error: {error}</div>
        ) : events.length === 0 ? (
          <div className={`${currentTheme.text} p-4`}>No upcoming events</div>
        ) : (
          <div className="flex-grow grid grid-rows-5 gap-1 p-2">
            {events.map((event, index) => {
              const isActive = isEventActive(event);
              return (
                <div 
                  key={event.id} 
                  className={`
                    relative flex flex-col justify-center p-2 rounded-lg text-sm
                    ${isActive ? `${currentTheme.main} ${currentTheme.text} font-bold` : `${currentTheme.main} bg-opacity-50 ${currentTheme.text}`}
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
                  <span className="font-semibold relative z-10">{event.summary}</span>
                  <span className={`text-xs relative z-10 ${isActive ? currentTheme.text : `${currentTheme.text} opacity-80`}`}>
                    {formatDate(event.start.dateTime || event.start.date)}
                    {event.start.dateTime && ` ${formatTime(event.start.dateTime)}`}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendar;
