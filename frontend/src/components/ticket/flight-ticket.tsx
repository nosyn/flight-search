import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader className='bg-primary text-primary-foreground p-6'>
        <div className='flex items-center justify-between'>
          <div className='font-semibold text-2xl capitalize'>
            Flight Ticket - {flightType}
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-6 grid gap-6'>
        <div>
          <FlightTicket.SubTitle subTitle='Flight Information' />
          <FlightTicket.SubItem label='Seat Number' value={flightSeatNumber} />
          <FlightTicket.SubItem label='Airline Code' value='AA' />
          <FlightTicket.SubItem
            label='Record Locator'
            value={flightRecordLocator}
          />
          <FlightTicket.SubItem label='Departure From' value='SFO' />
          <FlightTicket.SubItem label='Arrival To' value='JFK' />
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
              <FlightTicket.SubItem label='Flight Number' value='AA123' />
              <FlightTicket.SubItem label='Airplane' value='Boeing 737' />
              <FlightTicket.SubItem label='Airplane' value='Boeing 737' />
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
    <div className='flex items-center justify-between'>
      <div className='text-muted-foreground'>{label}</div>
      <div className='capitalize'>{value}</div>
    </div>
  );
};
