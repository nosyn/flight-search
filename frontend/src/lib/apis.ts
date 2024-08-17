import { toast } from '@/components/ui/use-toast';
import { API_AIRPORTS } from './constants';

export const getAirports = async () => {
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
      description: 'Failed to fetch airports. See console.log for detail',
    });
  } catch (error) {
    toast({
      title: 'Calling API Error',
      description: 'Failed to fetch airports. See console.log for detail',
    });
    console.error('Failed to fetch airports', error);
  }
};
