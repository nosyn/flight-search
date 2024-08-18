import { Card } from '@/components/ui/card';
import { getDateTimeFromTimestamp } from '@/lib/utils';
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
          <p className='text-sm font-medium'>NONSTOP</p>
          <div className='flex justify-between flex-grow'>
            <div className='text-3xl font-bold'>
              {getDateTimeFromTimestamp('2024-10-14T16:27:25.792Z')}
            </div>
            <div className='text-3xl font-bold'>
              {getDateTimeFromTimestamp('2025-05-20T15:30:55.869Z')}
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm'>{flightSchedule.departureAirport}</p>
            <p className='text-sm text-muted-foreground'>
              -----------------4H, 28M-----------------
            </p>
            <p className='text-sm'>{flightSchedule.arrivalAirport}</p>
          </div>
          <p className='text-sm'>
            UA {flightSchedule.flightNumber} (Boeing 757-300)
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
              Book ${flightSchedule.price}
            </Button>
          </div>
        </Card>
        <Card className='w-full max-w-2xl flex items-center justify-between border-b flex-col gap-2 py-2'>
          <div className='flex items-center gap-2'>
            <BriefcaseBusinessIcon className='h-6 w-6' />
            <h2 className='text-xl font-semibold'>Business Class</h2>
          </div>
          <div className='flex items-center gap-2'>
            <Button size='sm' className='bg-yellow-700'>
              <TicketIcon className='h-4 w-4 mr-2' />
              Book ${flightSchedule.price}
            </Button>
          </div>
        </Card>
      </div>
    </Card>
  );
}
