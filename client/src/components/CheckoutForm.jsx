// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    setTimeout(async () => {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
      } else {
        setError(null);
        setSuccess(true);
        setProcessing(false);
        console.log('PaymentMethod:', paymentMethod);
      }
    }, 2000); 
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="1234 1234 1234 1234"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="MM/YY"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
          CVC
        </label>
        <input
          type="text"
          id="cvc"
          name="cvc"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="CVC"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded ${processing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold`}
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && <div className="text-green-500 mt-4">Payment Successful!</div>}
    </form>
  );
};


export default CheckoutForm;