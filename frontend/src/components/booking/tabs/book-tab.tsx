import { RoundtripCalendar } from '@/components/booking/roundtrip-calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LocationInput } from '../location-input';

const FormSchema = z.object({
  origin: z
    .string({
      required_error: 'Origin required',
    })
    .length(3, 'Incorrect origin.'),
  destination: z
    .string({
      required_error: 'Destination required',
    })
    .length(3, 'Incorrect destination.'),
  date: z.object({
    from: z.date({
      required_error: 'A flight departure day is required.',
    }),
    to: z.date({
      required_error: 'A flight return day is required.',
    }),
  }),
});

export const BookTab = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: 'BKK',
      destination: 'DAD',
      date: {
        from: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
        to: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card>
          <CardContent className='p-4 flex flex-col gap-4'>
            <LocationInput />
            <RoundtripCalendar />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button type='submit'>Find Flights</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
