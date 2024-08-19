import FlightTicket from '../ticket/flight-ticket';

export const LastStep = ({ data }: { data: any }) => {
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
