import { toast } from '@/components/ui/use-toast';
import { API_TICKET } from '@/lib/constants';
import { ReserveFlightTicket } from '@/schemas';
import { useMutation } from '@tanstack/react-query';

export const useReserveTicketMutation = () => {
  return useMutation({
    mutationKey: ['reserveFlightTicket'],
    mutationFn: async (data: ReserveFlightTicket) => {
      try {
        const response = await fetch(API_TICKET, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        if (response.ok) {
          return await response.json();
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
    },
  });
};
