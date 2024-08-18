import { Card } from '@/components/ui/card';
import {
  getDateTimeFromTimestamp,
  getDurationBetweenTimestamps,
} from '@/lib/utils';
import { BriefcaseBusinessIcon, PiggyBankIcon, TicketIcon } from 'lucide-react';
import { Button } from '../ui/button';

type FlightCardProps = {
  flightSchedule: FlightSchedule;
};

export function FlightScheduleCard({ flightSchedule }: FlightCardProps) {
  return (
    <Card className='p-4 max-w-lg flex-grow'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col flex-grow'>
          <div className='flex justify-between flex-grow'>
            <div className='text-3xl font-bold'>
              {getDateTimeFromTimestamp(flightSchedule.departureTime)}
            </div>
            <div className='text-3xl font-bold'>
              {getDateTimeFromTimestamp(flightSchedule.arrivalTime)}
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm'>{flightSchedule.departureAirport}</p>
            <p className='text-sm text-muted-foreground'>
              {`----------------- ${getDurationBetweenTimestamps({
                timestamp1: flightSchedule.departureTime,
                timestamp2: flightSchedule.arrivalTime,
              })} -----------------`}
            </p>
            <p className='text-sm'>{flightSchedule.arrivalAirport}</p>
          </div>
          <p className='text-sm'>
            {flightSchedule.airlineCode} {flightSchedule.flightNumber} (
            {flightSchedule.airplaneName} -{' '}
            {flightSchedule.airplaneIataTypeCode})
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
            <Button variant='outline' size='sm'>
              <TicketIcon className='h-4 w-4 mr-2' />
              Book ${flightSchedule.economyPrice}
            </Button>
          </div>
        </Card>
        <Card className='w-full max-w-2xl flex items-center justify-between border-b flex-col gap-2 py-2'>
          <div className='flex items-center gap-2'>
            <BriefcaseBusinessIcon className='h-6 w-6' />
            <h2 className='text-xl font-semibold'>Business Class</h2>
          </div>
          <div className='flex items-center gap-2'>
            <Button size='sm' variant='outline'>
              <TicketIcon className='h-4 w-4 mr-2' />
              Book ${flightSchedule.businessPrice}
            </Button>
          </div>
        </Card>
      </div>
    </Card>
  );
}
