import { toast } from '@/components/ui/use-toast';
import { useFlightsQuery } from '@/hooks/use-flights-query';
import { useSearchQuery } from '@/hooks/use-search-query';
import { Navigate } from 'react-router-dom';
import { FlightCard, FlightCardProps } from './flight-card';

type ChooseFlightProps = {
  type: FlightsScheduleType;
  onSelectTicket: FlightCardProps['selectTicket'];
};

export const FlightsSchedule = ({
  type,
  onSelectTicket,
}: ChooseFlightProps) => {
  const query = useSearchQuery();
  const isDeparture = type === 'departure';
  const origin = query.get('origin') || '';
  const destination = query.get('destination') || '';
  const date =
    (isDeparture ? query.get('dateFrom') : query.get('dateTo')) || '';

  const { isLoading, data, error } = useFlightsQuery({
    // We need to swap the origin and destination when fetching return flights
    origin: isDeparture ? origin : destination,
    destination: isDeparture ? destination : origin,
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
      <div className='font-bold mb-4'>
        {type === 'departure'
          ? 'Select departure flights'
          : 'Select return flights'}
      </div>
      <div className='text-xl font-semibold'>Date: {date}</div>
      <div className='max-h-[540px] overflow-auto pr-6'>
        {data.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            selectTicket={onSelectTicket}
          />
        ))}
      </div>
    </div>
  );
};
