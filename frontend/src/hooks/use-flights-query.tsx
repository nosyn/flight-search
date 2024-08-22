import { toast } from '@/components/ui/use-toast';
import { API_FLIGHTS } from '@/lib/constants';
import { Flight } from '@/schemas';
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
  return useQuery({
    queryKey: ['flights', origin, destination, date],
    queryFn: async ({ queryKey }): Promise<Flight[]> => {
      const [_, origin, destination, date] = queryKey as [
        string,
        string,
        string,
        string
      ];

      try {
        const response = await fetch(
          `${API_FLIGHTS}?origin=${origin}&destination=${destination}&date=${date}`,
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const flights = await response.json();
          return flights;
        }

        toast({
          title: `Calling API Error with status: ${response.status}`,
        });
      } catch (error) {
        toast({
          title: 'Calling API Error',
          description: 'Failed to fetch flights. See console.log for detail',
        });
        console.error('Failed to fetch flights', error);
      }

      return [];
    },
    enabled: !!origin && !!destination && !!date,
  });
};
