import StripePayment from '@/components/payment/stripe-payment';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { Navigate } from 'react-router-dom';

export const PaymentPage = () => {
  const search = useSearchQuery();

  const ticketId = search.get('ticketId');

  if (!ticketId) {
    // We will navigate back to the home page if the ticketId is not found
    return <Navigate to='/' replace />;
  }

  return <StripePayment ticketId={ticketId} />;
};
