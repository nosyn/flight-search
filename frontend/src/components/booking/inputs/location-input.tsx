import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRightLeftIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export function LocationInput() {
  const form = useFormContext();

  return (
    <div className='flex gap-2 w-full'>
      <div className='flex-grow'>
        <FormField
          control={form.control}
          name='origin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>From*</FormLabel>
              <FormControl>
                <Input placeholder='Origin' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='flex items-end w-6 flex-grow-0'>
        <ArrowRightLeftIcon size={24} className='mb-2' />
      </div>
      <div className='flex-grow'>
        <FormField
          control={form.control}
          name='destination'
          render={({ field }) => (
            <FormItem>
              <FormLabel>To*</FormLabel>
              <FormControl>
                <Input placeholder='Destination' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
