import { toast } from '@/components/ui/use-toast';
import { API_CREATE_PAYMENT_INTENT } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { PaymentIntent, PaymentIntentSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type UseCreatePaymentIntentArgs = {
  ticketId: string;
};
export const useCreatePaymentIntentMutation = ({
  ticketId,
}: UseCreatePaymentIntentArgs) => {
  const navigate = useNavigate();
  return useMutation<PaymentIntent, HttpErrorResponse>({
    mutationKey: ['createPaymentIntent'],
    mutationFn: async () => {
      // Create PaymentIntent as soon as the page loads
      const response = await fetch(API_CREATE_PAYMENT_INTENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ticketId }),
      });

      if (response.ok) {
        const data = await response.json();
        const { success, data: paymentIntent } =
          await PaymentIntentSchema.safeParseAsync(data);

        if (success) {
          return paymentIntent;
        }

        throw new HttpErrorResponse(
          'Invalid payment intent data',
          response.status
        );
      }

      const errorMessage = (await response.text()) as string;

      if (response.status === 303) {
        toast({
          title: 'Ticket Already Paid',
          description: 'Redirect to ticket page',
        });

        navigate(`/ticket?ticketId=${ticketId}`);
      }

      throw new HttpErrorResponse(errorMessage, response.status);
    },
  });
};
