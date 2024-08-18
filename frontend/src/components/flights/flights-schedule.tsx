import { toast } from '@/components/ui/use-toast';
import { useFlightQuery } from '@/hooks/useFlightQuery';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { Navigate } from 'react-router-dom';
import { FlightCard } from './flight-card';

type ChooseFlightProps = {
  type: FlightsScheduleType;
  select: (flight: Flight) => void;
};

export const FlightsSchedule = ({ type }: ChooseFlightProps) => {
  const query = useSearchQuery();
  const origin = query.get('origin') || '';
  const destination = query.get('destination') || '';
  const isDeparture = type === 'departure';
  const date =
    (isDeparture ? query.get('dateFrom') : query.get('dateTo')) || '';

  const { isLoading, data, error } = useFlightQuery({
    origin,
    destination,
    date,
  });

  if (!origin || !destination || !date) {
    toast({
      title:
        'Missing some query values in the URL. Navigate back to the home page.',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify({ origin, destination, date }, null, 2)}
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

  if (data.length === 0) {
    return <div>Couldn't find any flights. Please search for new one</div>;
  }

  return (
    <div>
      <div className='text-xl font-semibold'>Date: {date}</div>
      {data.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};
