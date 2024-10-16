// EventCards.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Auth from '../utils/auth';
import { SAVE_EVENT } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { EVENTS, QUERY_ME } from '../utils/queries';

import { Link } from 'react-router-dom';


const EventCards = ({ events }) => {
  const [saveEvent] = useMutation(SAVE_EVENT);
  const { data } = useQuery(QUERY_ME);

  const savedEvents = data?.me?.savedEvents ?? [];

  const handleSaveEvent = async (id) => {
    await saveEvent({
      variables: { id },
      refetchQueries: [
        { query: QUERY_ME },
        { query: EVENTS }
      ]
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
            <p className="text-gray-500 mb-3">Price: ${event.price}</p>
            <p className="text-gray-700">{event.description}</p>
            {Auth.loggedIn() && (
              <div className="flex flex-col items-center mt-4">
                <button
                  className={`mt-4 px-4 py-2 rounded transition-colors duration-300 ${
                    savedEvents.map(o => o._id).includes(event._id) ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
                  }`}
                  onClick={() => handleSaveEvent(event._id)}
                  disabled={savedEvents.map(o => o._id).includes(event._id)}
                >
                  {savedEvents.map(o => o._id).includes(event._id) ? 'Saved' : 'Save this Event!'}
                </button>
                <Link
                  to={`/payment/${event._id}`}
                  className="mt-4 ml-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors duration-300"
                >
                  Pay for this Event
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCards;