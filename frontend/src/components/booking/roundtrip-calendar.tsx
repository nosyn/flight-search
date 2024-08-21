'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { BookingForm } from './booking-card';

export const RoundtripCalendar = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const form = useFormContext<BookingForm>();
  return (
    <div>
      <FormField
        control={form.control}
        name='date'
        render={({ field, formState }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Dates*</FormLabel>
            <div className={cn('grid gap-2', className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id='date'
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, 'LLL dd, y')} -{' '}
                          {format(field.value.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(field.value.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    initialFocus
                    mode='range'
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <p className='text-red-600'>
              {formState.errors.date?.from?.message ||
                formState.errors.date?.to?.message}
            </p>
          </FormItem>
        )}
      />
    </div>
  );
};
