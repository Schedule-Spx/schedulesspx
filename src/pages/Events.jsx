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
    <div className="bg-stpius-blue border border-stpius-gold rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-stpius-white">Important Events</h2>
      {user ? (
        <ul className="flex-grow overflow-y-auto">
          {events.map((event, index) => (
            <li key={index} className="mb-2 bg-stpius-gold/30 p-2 rounded">
              <span className="font-semibold text-stpius-white">
                {new Date(event.start.dateTime || event.start.date).toLocaleString()}:
              </span>{' '}
              <span className="text-stpius-white">{event.summary}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stpius-white flex-grow flex items-center justify-center">Please sign in to view events.</p>
      )}
    </div>
  );
};

export default Events;
