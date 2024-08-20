import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFlightQuery } from '@/hooks/use-flight-query';
import { FlightType } from '@/schemas';

type FlightTicketProps = {
  flightId: number;
  flightType: FlightType;
  flightSeatNumber: string;
  flightRecordLocator: string;
  passengerName: string;
  passengerDOB: string;
  passengerGender: string;
};

export default function FlightTicket({
  flightId,
  flightType,
  flightRecordLocator,
  flightSeatNumber,
  passengerName,
  passengerGender,
  passengerDOB,
}: FlightTicketProps) {
  const { data, isLoading, error } = useFlightQuery({
    flightId: String(flightId),
  });

  if (isLoading) {
    return <div>Loading flight ticket</div>;
  }

  if (error || !data) {
    console.error('Error while loading flight ticket', error);
    return <div>Error while loading flight ticket</div>;
  }

  return (
    <Card className='w-full max-w-3xl'>
      <CardHeader className='bg-primary text-primary-foreground p-4'>
        <div className='flex items-center justify-between'>
          <div className='font-semibold text-2xl capitalize'>
            Flight Ticket - {flightType}
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4 grid gap-2'>
        <div>
          <FlightTicket.SubTitle subTitle='Flight Information' />
          <FlightTicket.SubItem label='Seat Number' value={flightSeatNumber} />
          <FlightTicket.SubItem label='Airline Code' value={data.airlineCode} />
          <FlightTicket.SubItem
            label='Record Locator'
            value={flightRecordLocator}
          />
          <FlightTicket.SubItem
            label='Departure From'
            value={data.departureAirport}
          />
          <FlightTicket.SubItem
            label='Arrival To'
            value={data.arrivalAirport}
          />
        </div>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='grid gap-2'>
            <FlightTicket.SubTitle subTitle='Passenger Information' />
            <div className='grid gap-1'>
              <FlightTicket.SubItem label='Name' value={passengerName} />
              <FlightTicket.SubItem label='Gender' value={passengerGender} />
              <FlightTicket.SubItem
                label='Date of Birth'
                value={new Date(passengerDOB).toLocaleDateString()}
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <FlightTicket.SubTitle subTitle='Airplane Details' />
            <div className='grid gap-1'>
              <FlightTicket.SubItem
                label='Flight Number'
                value={`${data.airlineCode}${data.flightNumber}`}
              />
              <FlightTicket.SubItem
                label='Airplane'
                value={data.airplaneName}
              />
              <FlightTicket.SubItem
                label='Airplane Code'
                value={data.airplaneIataTypeCode}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

FlightTicket.SubTitle = ({ subTitle }: { subTitle: string }) => {
  return <div className='font-medium text-lg'>{subTitle}</div>;
};

FlightTicket.SubItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex items-start justify-between gap-2'>
      <div className='text-muted-foreground'>{label}</div>
      <div className='capitalize text-end'>{value}</div>
    </div>
  );
};
