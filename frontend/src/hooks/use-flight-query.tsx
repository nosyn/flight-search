import { API_FLIGHTS } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { Flight, FlightSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export type UseFlightQueryArgs = {
  flightId: string;
};

export const useFlightQuery = ({ flightId }: UseFlightQueryArgs) => {
  return useQuery<Flight, HttpErrorResponse, Flight>({
    queryKey: ['flights', flightId],
    queryFn: async ({ queryKey }) => {
      const [_, flightId] = queryKey as [string, string];
      const response = await fetch(`${API_FLIGHTS}/${flightId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const { success, data: flight } = await FlightSchema.safeParseAsync(
          data
        );

        if (success) {
          return flight;
        }

        throw new HttpErrorResponse('Invalid flight data', response.status);
      }

      const errorMessage = (await response.text()) as string;

      throw new HttpErrorResponse(errorMessage, response.status);
    },
  });
};
