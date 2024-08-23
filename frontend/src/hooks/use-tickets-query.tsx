import { API_TICKETS } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { Tickets, TicketsSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export const useTicketsQuery = () => {
  return useQuery<Tickets, HttpErrorResponse, Tickets>({
    queryKey: ['tickets'],
    retry: false,
    queryFn: async () => {
      const response = await fetch(`${API_TICKETS}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const { success, data: tickets } = await TicketsSchema.safeParseAsync(
          data
        );

        if (success) {
          return tickets;
        }

        throw new HttpErrorResponse('Invalid tickets data', response.status);
      }

      const errorMessage = (await response.text()) as string;

      throw new HttpErrorResponse(errorMessage, response.status);
    },
    initialData: [],
  });
};
