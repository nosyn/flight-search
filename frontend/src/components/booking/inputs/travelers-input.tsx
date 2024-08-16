import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function TravelersInput() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name='travelers'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Travelers</FormLabel>
          <FormControl>
            <Input
              placeholder='Number of travelers'
              {...field}
              type='number'
              min={1}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
