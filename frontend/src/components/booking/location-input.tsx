import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useGetAirports } from '@/hooks/use-get-airports';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { ArrowRightLeftIcon, Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { BookingForm } from './booking-card';

export function LocationInput() {
  const form = useFormContext<BookingForm>();
  const { data: airports, isLoading } = useGetAirports();

  return (
    <div className='flex gap-2 w-full'>
      <div className='flex-grow'>
        <FormField
          control={form.control}
          name='origin'
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>From*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value || 'Select origin'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[400px] drop-shadow-lg'>
                  <Command>
                    <CommandInput placeholder='Search origins...' />
                    <CommandList>
                      <CommandEmpty>No airport found.</CommandEmpty>
                      <CommandGroup>
                        {airports
                          .filter(
                            (a) => a.iataCode !== form.getValues('destination')
                          )
                          .map((airport) => (
                            <CommandItem
                              value={airport.iataCode}
                              key={airport.iataCode}
                              onSelect={field.onChange}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  airport.iataCode === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${airport.iataCode} - ${airport.name}`}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='mt-8'>
        <ArrowRightLeftIcon size={24} className='mb-2' />
      </div>
      <div className='flex-grow'>
        <FormField
          control={form.control}
          name='destination'
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>From*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value || 'Select destination'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[400px] drop-shadow-lg'>
                  <Command>
                    <CommandInput placeholder='Search destination...' />
                    <CommandList>
                      <CommandEmpty>No airports found.</CommandEmpty>
                      <CommandGroup>
                        {airports
                          .filter(
                            (a) => a.iataCode !== form.getValues('origin')
                          )
                          .map((airport) => (
                            <CommandItem
                              value={airport.iataCode}
                              key={airport.iataCode}
                              onSelect={field.onChange}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  airport.iataCode === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {`${airport.iataCode} - ${airport.name}`}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
