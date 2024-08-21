import { toast } from '@/components/ui/use-toast';
import { API_TICKET } from '@/lib/constants';
import { Ticket } from '@/schemas';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type UseGetTicketArgs = {
  ticketId: string;
};

export const useTicketQuery = ({ ticketId }: UseGetTicketArgs) => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: async (): Promise<Ticket | null> => {
      try {
        const response = await fetch(`${API_TICKET}/${ticketId}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const ticket = await response.json();
          return ticket;
        }

        if (response.status === 402) {
          toast({
            title: 'Payment Required',
            description: 'Please complete the payment to view the ticket',
          });

          navigate(`/payment?ticketId=${ticketId}`);
          return null;
        }

        toast({
          title: `Calling API Error with status: ${response.status}`,
        });
      } catch (error) {
        toast({
          title: 'Calling API Error',
          description: 'Failed to fetch ticket. See console.log for detail',
        });
        console.error('Failed to fetch ticket', error);
      }

      return null;
    },
  });
};
