// EventCards.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Auth from '../utils/auth';
import { SAVE_EVENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';


const EventCards = ({ events }) => {
  const [saveEvent] = useMutation(SAVE_EVENT);
  const handleSaveEvent = async (id) => {
    await saveEvent({
      variables: { id }
    })
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {console.log('EVENTS', events)}
      {events.map(event => (
        <div key={event._id} className="bg-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3 text-blue-900">{event.title}</h2>
            <p className="text-gray-500 mb-3">Date: {event.date}</p>
            <p className="text-gray-700">{event.description}</p>
            {Auth.loggedIn() && (
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                onClick={() => handleSaveEvent(event._id)}
              >
               Save this Event!
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCards;