import { toast } from '@/components/ui/use-toast';
import { API_TICKET } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { Ticket, TicketSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type UseGetTicketArgs = {
  ticketId: string;
};

export const useTicketQuery = ({ ticketId }: UseGetTicketArgs) => {
  const navigate = useNavigate();

  return useQuery<Ticket, HttpErrorResponse, Ticket>({
    queryKey: ['ticket', ticketId],
    retry: false,
    queryFn: async () => {
      const response = await fetch(`${API_TICKET}/${ticketId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const { success, data: ticket } = await TicketSchema.safeParseAsync(
          data
        );

        if (success) {
          return ticket;
        }

        throw new HttpErrorResponse('Invalid ticket data', response.status);
      }

      const errorMessage = (await response.text()) as string;

      if (response.status === 402) {
        toast({
          title: 'Payment Required',
          description: 'Please complete the payment to view the ticket',
        });
        navigate(`/payment?ticketId=${ticketId}`);
      }

      throw new HttpErrorResponse(errorMessage, response.status);
    },
  });
};
