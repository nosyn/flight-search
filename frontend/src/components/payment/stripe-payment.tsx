import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

import { CheckoutForm } from './checkout-form';
import { useCreatePaymentIntentMutation } from '@/hooks/use-create-payment-intent';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePayment({ ticketId }: { ticketId: string }) {
  const { data: clientSecret, mutate } = useCreatePaymentIntentMutation({
    ticketId,
  });

  useEffect(() => {
    mutate();
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
