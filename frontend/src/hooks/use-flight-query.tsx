import { getFlight, GetFlightArgs } from '@/lib/apis';
import { Flight } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export const useFlightQuery = ({ flightId }: GetFlightArgs) => {
  return useQuery<Flight | null>({
    queryKey: ['flights', flightId],
    queryFn: () => {
      return getFlight({
        flightId,
      });
    },
  });
};
