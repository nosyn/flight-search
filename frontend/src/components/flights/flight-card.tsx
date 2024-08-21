import { Card } from '@/components/ui/card';
import {
  getDateTimeFromTimestamp,
  getDurationBetweenTimestamps,
} from '@/lib/utils';
import { Flight, FlightType } from '@/schemas';
import { BriefcaseBusinessIcon, PiggyBankIcon, TicketIcon } from 'lucide-react';
import { Button } from '../ui/button';

export type FlightCardProps = {
  flight: Flight;
  selectTicket: (args: { flight: Flight; flightType: FlightType }) => void;
};

export const FlightCard = ({ flight, selectTicket }: FlightCardProps) => {
  return (
    <Card className='p-4 max-w-lg flex-grow my-2'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col flex-grow'>
          <div className='flex justify-between flex-grow'>
            <div className='text-3xl font-bold'>
              {getDateTimeFromTimestamp(flight.departureTime)}
            </div>
            <div className='text-3xl font-bold'>
              {getDateTimeFromTimestamp(flight.arrivalTime)}
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm'>{flight.departureAirport}</p>
            <p className='text-sm text-muted-foreground'>
              {`----------------- ${getDurationBetweenTimestamps({
                timestamp1: flight.departureTime,
                timestamp2: flight.arrivalTime,
              })} -----------------`}
            </p>
            <p className='text-sm'>{flight.arrivalAirport}</p>
          </div>
          <p className='text-sm'>
            {flight.airlineCode} {flight.flightNumber} ({flight.airplaneName} -{' '}
            {flight.airplaneIataTypeCode})
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between mt-4 gap-2'>
        <Card className='w-full max-w-2xl flex items-center justify-between border-b flex-col gap-2 py-2'>
          <div className='flex items-center gap-2'>
            <PiggyBankIcon className='h-6 w-6' />
            <h2 className='text-xl font-semibold'>Basic Economy</h2>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                selectTicket({ flight, flightType: 'economy' });
              }}
            >
              <TicketIcon className='h-4 w-4 mr-2' />
              Book ${flight.economyPrice}
            </Button>
          </div>
        </Card>
        <Card className='w-full max-w-2xl flex items-center justify-between border-b flex-col gap-2 py-2'>
          <div className='flex items-center gap-2'>
            <BriefcaseBusinessIcon className='h-6 w-6' />
            <h2 className='text-xl font-semibold'>Business Class</h2>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                selectTicket({ flight, flightType: 'business' });
              }}
            >
              <TicketIcon className='h-4 w-4 mr-2' />
              Book ${flight.businessPrice}
            </Button>
          </div>
        </Card>
      </div>
    </Card>
  );
};
