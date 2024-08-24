// src/Events.jsx
import React, { useState, useEffect } from 'react';

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user && user.accessToken) {
        try {
          const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10`, {
            headers: {
              'Authorization': `Bearer ${user.accessToken}`
            }
          });
          const data = await response.json();
          setEvents(data.items || []);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };
    fetchEvents();
  }, [user]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">
      <h2 className="text-xl font-bold mb-4">Important Events</h2>
      {user ? (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">
                {new Date(event.start.dateTime || event.start.date).toLocaleString()}:
              </span> {event.summary}
            </li>
          ))}
        </ul>
      ) : (
        <p>Please sign in to view events.</p>
      )}
    </div>
  );
};

export default Events;
