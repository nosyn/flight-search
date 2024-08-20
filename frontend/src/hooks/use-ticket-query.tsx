import { getTicket, GetTicketArgs } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';

export const useTicketQuery = ({ ticketId }: GetTicketArgs) => {
  return useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => {
      return getTicket({
        ticketId,
      });
    },
  });
};
