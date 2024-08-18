import { FlightScheduleCard } from '@/components/flights/flight-schedule-card';
import { toast } from '@/components/ui/use-toast';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { searchFlights } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

export const ChooseFlightPage = () => {
  const query = useSearchQuery();
  const origin = query.get('origin') || '';
  const destination = query.get('destination') || '';
  const dateFrom = query.get('dateFrom') || '';
  const dateTo = query.get('dateTo') || '';

  const { isLoading, data, error } = useQuery({
    queryKey: ['flights', query.toString()],
    queryFn: () => {
      return searchFlights({
        origin,
        destination,
        dateFrom,
        dateTo,
      });
    },
    enabled: !!origin && !!destination && !!dateFrom && !!dateTo,
  });

  if (!origin || !destination || !dateFrom || !dateTo) {
    toast({
      title:
        'Missing some query values in the URL. Navigate back to the home page.',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify({ origin, destination, dateFrom, dateTo }, null, 2)}
          </code>
        </pre>
      ),
    });

    return <Navigate to='/' replace={true} />;
  }

  if (isLoading) {
    return <div>Loading flights schedule...</div>;
  }

  if (error || !data) {
    toast({
      title: 'Something wrong happened when fetching flights schedule.',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(error, null, 2)}</code>
        </pre>
      ),
    });
    return <div>Some thing wrong happened</div>;
  }

  return (
    <div>
      Choose Flight Page
      {data.map((flight) => (
        <FlightScheduleCard key={flight.id} flightSchedule={flight} />
      ))}
    </div>
  );
};
