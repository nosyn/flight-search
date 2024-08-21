import { toast } from '@/components/ui/use-toast';
import { API_FLIGHTS } from '@/lib/constants';
import { Flight } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export type UseFlightQueryArgs = {
  flightId: string;
};

export const useFlightQuery = ({ flightId }: UseFlightQueryArgs) => {
  return useQuery<Flight | null>({
    queryKey: ['flights', flightId],
    queryFn: async ({ queryKey }): Promise<Flight | null> => {
      const [_, flightId] = queryKey as [string, string];
      try {
        const response = await fetch(`${API_FLIGHTS}/${flightId}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const flight = await response.json();
          return flight;
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

      return null;
    },
  });
};
