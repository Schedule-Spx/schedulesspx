// src/Events.js
import React from 'react';

const events = [
  { time: "09:00 AM", event: "Meeting with team" },
  { time: "11:00 AM", event: "Project deadline" },
  { time: "01:00 PM", event: "Lunch with client" },
  { time: "03:00 PM", event: "Conference call" },
  { time: "05:00 PM", event: "Review reports" },
];

const Events = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded glass-tile">
      <h2 className="text-xl font-bold mb-4">Important Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{event.time}:</span> {event.event}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
