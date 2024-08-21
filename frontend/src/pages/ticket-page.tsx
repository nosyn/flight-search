import FlightTicket from '@/components/ticket/flight-ticket';
import { useTicketQuery } from '@/hooks/use-ticket-query';
import { useSearchQuery } from '@/hooks/use-search-query';
import { Navigate } from 'react-router-dom';

export const TicketPage = () => {
  const search = useSearchQuery();
  const ticketId = search.get('ticketId');

  if (!ticketId) {
    // We will navigate back to the home page if the ticketId is not found
    return <Navigate to='/' replace />;
  }

  return <TicketDetail ticketId={ticketId} />;
};

export const TicketDetail = ({ ticketId }: { ticketId: string }) => {
  const { data, isLoading, error } = useTicketQuery({ ticketId });

  if (error) {
    console.error('Error loading ticket data', error);
    return <div>Error loading ticket data</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-2'>
      <div>
        <h3 className='font-bold text-2xl'>
          You have successfully bought the flight ticket. Please review flight
          ticket below
        </h3>
      </div>
      <h3 className='text-xl'>Departure Ticket</h3>
      <FlightTicket
        flightId={data.departureFlightId}
        flightType={data.departureFlightType}
        flightSeatNumber={data.departureFlightSeatNumber}
        flightRecordLocator={data.departureFlightRecordLocator}
        passengerName={data.passengerName}
        passengerDOB={data.passengerDOB}
        passengerGender={data.passengerGender}
      />
      <h3 className='text-xl'>Return Ticket</h3>
      <FlightTicket
        flightId={data.returnFlightId}
        flightType={data.returnFlightType}
        flightSeatNumber={data.returnFlightSeatNumber}
        flightRecordLocator={data.returnFlightRecordLocator}
        passengerName={data.passengerName}
        passengerDOB={data.passengerDOB}
        passengerGender={data.passengerGender}
      />
    </div>
  );
};
