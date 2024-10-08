import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { REMOVE_EVENT } from '../utils/mutations';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [removeEvent] = useMutation(REMOVE_EVENT);

  const { id } = useParams();
  const { loading, error, data } = useQuery(
    id ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { id: id },
    }
  );

  const imgURL = (path) => new URL(path, import.meta.url).href;

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  const handleRemoveEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeEvent({
        variables: (eventId),
      });
      if (data) {
        console.log('Event removed successfully!');
        setRemoveSuccess(true);
      }
    } catch (err) {
      console.error('Error removing event:', err);
      alert('Failed to remove the event. Please try again.')
    }
  };

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
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
          <div key={event.eventId} className="bg-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={imgURL(event.image)} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-blue-900">{event.title}</h2>
              <p className="text-gray-500 mb-3">Date: {event.date}</p>
              <p className="text-gray-700">{event.description}</p>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
                onClick={() => handleRemoveEvent(event.eventId)}>
                Remove this Event!
              </button>
              {removeSuccess && <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                <p>Event removed successfully!</p>
              </div>}

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
