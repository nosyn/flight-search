import { toast } from '@/components/ui/use-toast';
import { API_CREATE_PAYMENT_INTENT } from '@/lib/constants';
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
  return useMutation({
    mutationKey: ['createPaymentIntent'],
    mutationFn: async (): Promise<PaymentIntent | null> => {
      try {
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
            PaymentIntentSchema.safeParse(data);

          if (!success) {
            throw new Error('Invalid response data');
          }
          return paymentIntent;
        }

        if (response.status === 303) {
          toast({
            title: 'Ticket Already Paid',
            description: 'Redirect to ticket page',
          });

          navigate(`/ticket?ticketId=${ticketId}`);

          return null;
        }

        toast({
          title: `Calling API Error with status: ${response.status}`,
        });
      } catch (error) {
        toast({
          title: 'Calling API Error',
          description:
            'Failed to reserve flight ticket. See console.log for detail',
        });
        console.error('Failed to reserve flight ticket', error);
      }

      return null;
    },
  });
};
