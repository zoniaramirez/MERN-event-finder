// EventCards.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const events = [
    { id: 1, title: 'Event Title 1', date: '10-17-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Event Title 2', date: '10-23-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Event Title 3', date: '10-31-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Event Title 4', date: '11-17-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
    { id: 5, title: 'Event Title 5', date: '11-27-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
    { id: 6, title: 'Event Title 6', date: '12-20-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
  ];
  
  const EventCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-blue-900">{event.title}</h2>
              <p className="text-gray-500 mb-3">Date: {event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default EventCards;