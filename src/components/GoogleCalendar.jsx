// src/components/GoogleCalendar.jsx
import React, { useState, useEffect, useMemo, memo } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

// Constants for better maintainability
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = 'spxstudent.org_ndugje9uqtb8hqdm9s2qkpi2k4@group.calendar.google.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Memoized components for better performance
const EventItem = memo(({ event, theme, formatTime }) => (
  <li 
    className={`${theme.accent} p-2 rounded shadow cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
    onClick={() => window.open(event.htmlLink, '_blank')}
  >
    <div className={`font-semibold ${theme.text}`}>{event.summary}</div>
    {event.start.dateTime && (
      <div className={`text-sm ${theme.text} opacity-80`}>
        {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
      </div>
    )}
  </li>
));

const DayEvents = memo(({ date, events, theme, formatDate, formatTime }) => {
  if (!events || events.length === 0) return null;
  
  return (
    <div className="mb-4">
      <h3 
        className={`text-md font-semibold ${theme.text} mb-2 text-center`} 
        style={{ fontSize: '0.85rem', opacity: 0.8 }}
      >
        {formatDate(date)}
      </h3>
      <ul className="space-y-2">
        {events.map((event) => (
          <EventItem 
            key={event.id} 
            event={event} 
            theme={theme} 
            formatTime={formatTime} 
          />
        ))}
      </ul>
    </div>
  );
});

// Loading and error states as memoized components
const CalendarState = memo(({ message, theme }) => (
  <div className={`p-4 ${theme.text} text-center h-full flex items-center justify-center ${theme.main} ${theme.border} border-2 rounded-lg`}>
    {message}
  </div>
));

// Gradient overlay as a memoized component
const GradientOverlay = memo(() => (
  <div 
    className="absolute inset-0 rounded-lg"
    style={{
      background: `linear-gradient(to top right, rgba(0, 0, 0, 0.2), transparent)`,
      zIndex: 0,
    }}
  />
));

// Main component
const GoogleCalendar = memo(() => {
  const { currentTheme } = useTheme();
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(0);

  // Helper functions memoized to prevent recreations
  const formatDate = useMemo(() => (
    (dateString) => {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  ), []);

  const formatTime = useMemo(() => (
    (dateTimeString) => {
      const options = { hour: 'numeric', minute: '2-digit' };
      return new Date(dateTimeString).toLocaleTimeString(undefined, options);
    }
  ), []);

  // Filter events function - memoized based on events
  const filterEvents = useMemo(() => (
    (eventsArray) => eventsArray?.filter(event => event.summary !== '8:00 am Start') || []
  ), []);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      const now = Date.now();
      
      // Don't fetch if we've fetched recently (caching)
      if (now - lastFetched < CACHE_DURATION && Object.keys(events).length > 0) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
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
        
        // Group events by date
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
        setLastFetched(now);
      } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        setError(`Failed to fetch events: ${error.response?.data?.error?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
    
    // Set up a timer to refresh events periodically
    const refreshTimer = setInterval(fetchEvents, CACHE_DURATION);
    
    return () => clearInterval(refreshTimer);
  }, [lastFetched, events]);

  // Early returns for loading and error states
  if (loading) return <CalendarState message="Loading events..." theme={currentTheme} />;
  if (error) return <CalendarState message={`Error: ${error}`} theme={currentTheme} />;
  if (Object.keys(events).length === 0) return <CalendarState message="No upcoming events" theme={currentTheme} />;

  return (
    <div className="w-full h-full">
      <div className={`${currentTheme.main} w-full h-full flex flex-col relative rounded-lg overflow-hidden`}>
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
            zIndex: 0,
          }}
        />
        <div 
          className="p-4 overflow-y-auto relative z-10 h-full scrollbar-hide"
          style={{
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
            '&::-webkit-scrollbar': {
              display: 'none'  /* Chrome, Safari, Opera */
            }
          }}
        >
          {Object.entries(events).map(([date, dayEvents]) => (
            <DayEvents 
              key={date}
              date={date}
              events={filterEvents(dayEvents)}
              theme={currentTheme}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default GoogleCalendar;
