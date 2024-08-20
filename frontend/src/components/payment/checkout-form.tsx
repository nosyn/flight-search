import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '../ui/button';
import { LoaderIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutForm = ({ ticketId }: { ticketId: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (successPayment) {
      setTimeout(() => {
        navigate({
          pathname: '/ticket',
          search: new URLSearchParams({
            ticketId: ticketId,
          }).toString(),
        });
      }, 3500);
    }
  }, [successPayment]);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setSuccessPayment(true);
          setMessage(
            'Payment succeeded!. You will be redirected in 3 seconds.'
          );
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:5173/payment?ticketId=${ticketId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      {!successPayment && (
        <form
          id='payment-form'
          onSubmit={handleSubmit}
          className='max-w-[480px]'
        >
          <PaymentElement
            id='payment-element'
            options={{
              paymentMethodOrder: ['visa'],
            }}
          />
          <Button
            disabled={isLoading || !stripe || !elements}
            id='submit'
            type='submit'
            className='my-2'
          >
            {isLoading && (
              <LoaderIcon
                size='small'
                className='animate-spin h-5 w-5 mr-3'
                viewBox='0 0 24 24'
              />
            )}
            Pay now
          </Button>
          {/* Show any error or success messages */}
        </form>
      )}

      {message && (
        <p id='payment-message' className='font-bold text-2xl'>
          {message}
        </p>
      )}
    </div>
  );
};
