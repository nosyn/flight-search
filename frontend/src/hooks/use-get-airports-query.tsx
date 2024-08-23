import { API_AIRPORTS } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { Airports, AirportsSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export const useGetAirportsQuery = () => {
  return useQuery<Airports, HttpErrorResponse, Airports>({
    queryKey: ['airports'],
    queryFn: async () => {
      const response = await fetch(API_AIRPORTS, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const { success, data: airports } = await AirportsSchema.safeParseAsync(
          data
        );

        if (success) {
          return airports;
        }

        throw new HttpErrorResponse('Invalid ticket data', response.status);
      }

      const errorMessage = (await response.text()) as string;

      throw new HttpErrorResponse(errorMessage, response.status);
    },
    initialData: [],
  });
};
