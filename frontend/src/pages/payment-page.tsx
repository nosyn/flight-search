import StripePayment from '@/components/payment/stripe-payment';

export const PaymentPage = () => {
  return (
    <div>
      <p className='font-semibold text-xl'>
        Please enter your payment details to complete the booking
      </p>
      <StripePayment />
    </div>
  );
};
