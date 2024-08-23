import { API_FLIGHTS } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { Flights, FlightsSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export type UseFlightsQueryArgs = {
  origin: string;
  destination: string;
  date: string;
};

export const useFlightsQuery = ({
  date,
  destination,
  origin,
}: UseFlightsQueryArgs) => {
  return useQuery<Flights, HttpErrorResponse, Flights>({
    queryKey: ['flights', origin, destination, date],
    queryFn: async ({ queryKey }) => {
      const [_, origin, destination, date] = queryKey as [
        string,
        string,
        string,
        string
      ];

      const response = await fetch(
        `${API_FLIGHTS}?origin=${origin}&destination=${destination}&date=${date}`,
        {
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { success, data: flights } = await FlightsSchema.safeParseAsync(
          data
        );

        if (success) {
          return flights;
        }

        throw new HttpErrorResponse('Invalid flights data', response.status);
      }

      const errorMessage = (await response.text()) as string;

      throw new HttpErrorResponse(errorMessage, response.status);
    },
    enabled: !!origin && !!destination && !!date,
  });
};
