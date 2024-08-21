import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

import { API_CREATE_PAYMENT_INTENT } from '@/lib/constants';
import { CheckoutForm } from './checkout-form';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePayment({ ticketId }: { ticketId: string }) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!clientSecret) {
      // Create PaymentIntent as soon as the page loads
      fetch(API_CREATE_PAYMENT_INTENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ticketId }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  return (
    <div className='App'>
      {clientSecret && (
        <Elements
          options={{
            appearance: {
              theme: 'stripe',
            },
            clientSecret,
          }}
          stripe={stripePromise}
        >
          <CheckoutForm ticketId={ticketId} />
        </Elements>
      )}
    </div>
  );
}
