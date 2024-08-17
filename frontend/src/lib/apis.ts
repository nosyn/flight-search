import { toast } from '@/components/ui/use-toast';
import { API_AIRPORTS, API_FLIGHTS } from './constants';
import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient();

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
    });
  } catch (error) {
    toast({
      title: 'Calling API Error',
      description: 'Failed to fetch airports. See console.log for detail',
    });
    console.error('Failed to fetch airports', error);
  }
};

export const searchFlights = async () => {
  try {
    const response = await fetch(API_FLIGHTS, {
      credentials: 'include',
    });

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
};
