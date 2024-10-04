// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import EventCards from '../components/EventCards';

const initialEvents = [
  { _id: 1, title: 'Event Title 1', date: '10-17-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
  { _id: 2, title: 'Event Title 2', date: '10-23-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
  { _id: 3, title: 'Event Title 3', date: '10-31-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
  { _id: 4, title: 'Event Title 4', date: '11-17-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
  { _id: 5, title: 'Event Title 5', date: '11-27-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
  { _id: 6, title: 'Event Title 6', date: '12-20-2024', description: 'Description of the event goes here.', imageUrl: 'https://via.placeholder.com/300' },
];

const Home = () => {
  const [events, setEvents] = useState(initialEvents);

  const saveEvent = () => {
    const newEvent = {
      _id: events.length + 1,
      title: `Event Title ${events.length + 1}`,
      date: '01-01-2025',
      description: 'Description of the new event goes here.',
      imageUrl: 'https://via.placeholder.com/300',
    };
    setEvents([...events, newEvent]);
  };

  return (
    <main className="flex flex-col min-h-screen pt-20 px-6 pb-8">
      <EventCards events={events} saveEvent={saveEvent} />
    </main>
  );
};

export default Home;