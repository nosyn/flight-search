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
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightLeftIcon, Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { getAirports } from '@/lib/apis';

export function LocationInput() {
  const form = useFormContext();
  const { data: airports, isLoading } = useQuery({
    queryKey: ['airports'],
    queryFn: getAirports,
    initialData: [],
  });

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
                      {field.value
                        ? airports.find(
                            (airport) => airport.iataCode === field.value
                          ).iataCode
                        : 'Select origin'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[400px] drop-shadow-lg'>
                  <Command>
                    <CommandInput placeholder='Search origins...' />
                    <CommandList>
                      <CommandEmpty>No airport found.</CommandEmpty>
                      <CommandGroup>
                        {airports.map((airport) => (
                          <CommandItem
                            value={airport.iataCode}
                            key={airport.iataCode}
                            onSelect={() => {
                              form.setValue('origin', airport.iataCode);
                            }}
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
                      {field.value
                        ? airports.find(
                            (airport) => airport.iataCode === field.value
                          ).iataCode
                        : 'Select destination'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[400px] drop-shadow-lg'>
                  <Command>
                    <CommandInput placeholder='Search destination...' />
                    <CommandList>
                      <CommandEmpty>No airports found.</CommandEmpty>
                      <CommandGroup>
                        {airports.map((airport) => (
                          <CommandItem
                            value={airport.iataCode}
                            key={airport.iataCode}
                            onSelect={() => {
                              form.setValue('destination', airport.iataCode);
                            }}
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
