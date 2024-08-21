import { toast } from '@/components/ui/use-toast';
import { API_ME } from '@/lib/constants';
import { Me } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => {
      return async (): Promise<Me | null> => {
        try {
          const response = await fetch(`${API_ME}`, {
            credentials: 'include',
          });

          if (response.ok) {
            const me = await response.json();
            return me;
          }

          toast({
            title: `Calling API Error with status: ${response.status}`,
          });
        } catch (error) {
          toast({
            title: 'Calling API Error',
            description: 'Failed to fetch ticket. See console.log for detail',
          });
          console.error('Failed to fetch ticket', error);
        }

        return null;
      };
    },
  });
};
