// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../utils/queries';

const PaymentPage = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(QUERY_EVENT, {
    variables: { id }
  });

  const event = data?.event || {};

  if (loading) return <h2>Loading…</h2>

  console.log(event);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payment for {event.title}</h1>
      <CheckoutForm eventId={id} />
    </div>
  );
};

export default PaymentPage;