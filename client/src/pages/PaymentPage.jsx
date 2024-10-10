// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

const PaymentPage = () => {
  const { eventId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payment for Event {eventId}</h1>
      <CheckoutForm eventId={eventId} />
    </div>
  );
};

export default PaymentPage;