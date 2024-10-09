// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import EventCards from '../components/EventCards';
import { useQuery } from '@apollo/client';
import { EVENTS } from '../utils/queries';

const Home = () => {
  const { data } = useQuery(EVENTS);
  const events = data?.events ?? [];
  return (
    <main className="flex flex-col min-h-screen pt-20 px-6 pb-8">
      <EventCards events={events}/>
    </main>
  );
};

export default Home;