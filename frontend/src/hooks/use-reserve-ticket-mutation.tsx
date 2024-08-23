import { API_TICKETS } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { ReserveFlightTicket, Ticket, TicketSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';

export const useReserveTicketMutation = () => {
  return useMutation<Ticket, HttpErrorResponse, ReserveFlightTicket>({
    mutationKey: ['reserveFlightTicket'],
    mutationFn: async (data) => {
      const response = await fetch(API_TICKETS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
      throw new HttpErrorResponse(errorMessage, response.status);
    },
  });
};
