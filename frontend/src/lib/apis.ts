import { toast } from '@/components/ui/use-toast';
import { BuyingFlightTicket, Flight, Me, Ticket } from '@/schemas';
import { QueryClient } from '@tanstack/react-query';
import { API_AIRPORTS, API_FLIGHTS, API_ME, API_TICKET } from './constants';

// Create a client
export const queryClient = new QueryClient();

export const getAirports = async () => {
  try {
    const response = await fetch(API_AIRPORTS, {
      credentials: 'include',
    });

    if (response.ok) {
      const airports = await response.json();
      ``;
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

export const buyFlightTicket = async (data: BuyingFlightTicket) => {
  try {
    const response = await fetch(API_TICKET, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) {
      return await response.json();
    }

    toast({
      title: `Calling API Error with status: ${response.status}`,
    });
  } catch (error) {
    toast({
      title: 'Calling API Error',
      description: 'Failed to buy flight ticket. See console.log for detail',
    });
    console.error('Failed to buy flight ticket', error);
  }
};

export type GetTicketArgs = {
  ticketId: string;
};
export const getTicket = async ({
  ticketId,
}: GetTicketArgs): Promise<Ticket | null> => {
  try {
    const response = await fetch(`${API_TICKET}/${ticketId}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const ticket = await response.json();
      return ticket;
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

export const getMe = async (): Promise<Me | null> => {
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
