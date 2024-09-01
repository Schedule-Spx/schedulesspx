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
        
        // Group events by date, adjusting for timezone
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

  // Filter out events with "8:00 am Start"
  const filterEvents = (events) => {
    return events.filter(event => event.summary !== '8:00 am Start');
  };

  if (loading) return <div className={`p-4 ${currentTheme.text} text-center`}>Loading events...</div>;
  if (error) return <div className={`p-4 ${currentTheme.text} text-center`}>Error: {error}</div>;
  if (Object.keys(events).length === 0) return <div className={`p-4 ${currentTheme.text} text-center`}>No upcoming events</div>;

  return (
    <div 
      className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative overflow-hidden`}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
          zIndex: 0
        }}
      ></div>
      <div className="p-4 overflow-y-auto relative z-10" style={{ maxHeight: '40vh' }}>
        {Object.entries(events).map(([date, dayEvents]) => {
          const filteredEvents = filterEvents(dayEvents); // Filter the events
          return (
            <div key={date} className="mb-4">
              {filteredEvents.length > 0 && (
                <>
                  <h3 className={`text-md font-semibold ${currentTheme.text} mb-2 text-center`} style={{ fontSize: '0.85rem', color: currentTheme.text + '80' }}>{formatDate(date)}</h3>
                  <ul className="space-y-2">
                    {filteredEvents.map((event) => (
                      <li 
                        key={event.id} 
                        className={`${currentTheme.accent} p-2 rounded shadow cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`} // Added scale effect on hover
                        onClick={() => window.open(event.htmlLink, '_blank')}
                      >
                        <div className={`font-semibold ${currentTheme.text}`}>{event.summary}</div>
                        {event.start.dateTime && (
                          <div className={`text-sm ${currentTheme.text} opacity-80`}>
                            {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoogleCalendar;
