import { SearchFlightArgs, searchFlights } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';

export const useFlightQuery = ({
  date,
  destination,
  origin,
}: SearchFlightArgs) => {
  return useQuery({
    queryKey: ['flights'],
    queryFn: () => {
      return searchFlights({
        origin,
        destination,
        date,
      });
    },
    enabled: !!origin && !!destination && !!date,
  });
};
