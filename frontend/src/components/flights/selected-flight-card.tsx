import { Card } from '@/components/ui/card';
import {
  cn,
  getDateTimeFromTimestamp,
  getDurationBetweenTimestamps,
} from '@/lib/utils';
import { Flight, FlightsSchedule, FlightType } from '@/schemas';
import {
  BriefcaseBusinessIcon,
  ChevronsUpDown,
  PencilIcon,
  PiggyBankIcon,
} from 'lucide-react';
import { Button } from '../ui/button';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

type SelectedFlightCardProps = {
  flight: Flight;
  flightType: FlightType;
  type: FlightsSchedule;
  onEdit: () => void;
};

export const SelectedFlightCard = ({
  flight,
  flightType,
  type,
  onEdit,
}: SelectedFlightCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-full space-y-2'
    >
      <div className='flex items-center justify-start space-x-4'>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='sm' className='w-9 p-0'>
            <ChevronsUpDown
              className={cn('h-4 w-4', isOpen ?? 'bg-slate-500')}
            />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <h4 className='text-sm font-semibold'>
          Selected {type === 'departure' ? 'Departure' : 'Return'} Flight
        </h4>
      </div>
      <CollapsibleContent className='space-y-2'>
        <Card className='p-4 max-w-lg flex-grow my-2'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col flex-grow'>
              <div className='text-sm font-semibold'>
                Date: {new Date(flight.departureTime).toLocaleDateString()}
              </div>
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
                {flight.airlineCode} {flight.flightNumber} (
                {flight.airplaneName} - {flight.airplaneIataTypeCode})
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between mt-4 gap-2'>
            <Card className='w-full max-w-2xl flex items-center justify-between border-b flex-col gap-2 py-2'>
              {flightType === 'economy' ? (
                <div className='flex items-center gap-2'>
                  <PiggyBankIcon className='h-6 w-6' />
                  <h2 className='text-xl font-semibold'>
                    Basic Economy ${flight.economyPrice}
                  </h2>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <BriefcaseBusinessIcon className='h-6 w-6' />
                  <h2 className='text-xl font-semibold'>
                    Business Class ${flight.businessPrice}
                  </h2>
                </div>
              )}
            </Card>
            <Button
              className='justify-items-end'
              size='lg'
              type='button'
              onClick={() => {
                onEdit();
              }}
            >
              <PencilIcon className='h-6 w-6' />
            </Button>
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};
