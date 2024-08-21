import { toast } from '@/components/ui/use-toast';
import { API_AIRPORTS } from '@/lib/constants';
import { Airport } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export const useGetAirports = () => {
  return useQuery({
    queryKey: ['airports'],
    queryFn: async (): Promise<Airport[]> => {
      try {
        const response = await fetch(API_AIRPORTS, {
          credentials: 'include',
        });

        if (response.ok) {
          const airports = await response.json();

          return airports;
        }

        toast({
          title: `Calling API Error with status: ${response.status}`,
        });
      } catch (error) {
        toast({
          title: 'Calling API Error',
          description: 'Failed to fetch airports. See console.log for detail',
        });
        console.error('Failed to fetch airports', error);
      }

      return [];
    },
    initialData: [],
  });
};
