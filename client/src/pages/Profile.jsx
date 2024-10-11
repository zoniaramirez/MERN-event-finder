import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { REMOVE_EVENT } from '../utils/mutations';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { Link } from 'react-router-dom';

const Profile = () => {
  const [removeEvent] = useMutation(REMOVE_EVENT);

  const params = useParams();
  const { loading, error, data } = useQuery(
    params?.id ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { id: params?.id },
    }
  );
//code variables and arrow functions for uber booking
const [isBooked, setToBooked] = useState(false);

const bookUber = (event) => {
  alert(`Your Uber has been booked from your location to ${event.title}`);
  setToBooked(true);
};

  const imgURL = (path) => new URL(path, import.meta.url).href;

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  const handleRemoveEvent = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeEvent({
        variables: { id },
        refetchQueries: [
          { query:  params?.id ? QUERY_SINGLE_USER : QUERY_ME }
        ]
      });
      
      if (data) {
        console.log('Event removed successfully!');
      }
    } catch (err) {
      console.error('Error removing event:', err);
      alert('Failed to remove the event. Please try again.')
    }
  };

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === params?.id) {
    return <Navigate to="/me" />;
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <h4 className='text-center text-red-500'>
          An error ocurred while fetching the profile data.
        </h4>
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h4 className="text-center text-red-500">
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </h4>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6 pt-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            {/*{user._id ? `${user.username}'s` : 'Your'} profile*/}
            {user.savedEvents?.length
              ? `Viewing ${user.savedEvents.length} saved ${user.savedEvents.length === 1 ? 'event' : 'events'}:`
              : 'You have no saved events!'}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {console.log('SAVER', user.savedEvents)}
        {user?.savedEvents?.map(event => (
          <div key={event._id} className="bg-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={imgURL(event.image)} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-blue-900">{event.title}</h2>
              <p className="text-gray-500 mb-3">Date: {event.date}</p>
              <p className="text-gray-500 mb-3">Price: ${event.price}</p>
              <p className="text-gray-700">{event.description}</p>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
                onClick={() => handleRemoveEvent(event._id)}>
                  Remove Event
              </button>
              <Link
                to={`/payment/${event._id}`}
                className="mt-4 ml-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors duration-300"
              >
                Pay for this Event
              </Link>
              <button className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
              onClick={() => bookUber(event)} disabled={isBooked}>
                {isBooked ? 'Your Uber has been Booked': 'Book an Uber'}
              </button>
              {isBooked && <p>Your Uber has been booked! Enjoy the event.</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;