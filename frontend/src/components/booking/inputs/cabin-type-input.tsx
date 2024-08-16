import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CabinTypeInput() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name='cabinType'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cabin Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder='Select a cabin type'
                  defaultValue='economy'
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value='economy'>Economy</SelectItem>
              <SelectItem value='business'>Business</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
