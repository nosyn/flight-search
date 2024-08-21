import { RoundtripCalendar } from '@/components/booking/roundtrip-calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LocationInput } from './location-input';
import { useNavigate } from 'react-router-dom';
import { getSearchParamsFormattedDate } from '@/lib/utils';

export const BookingFormSchema = z.object({
  origin: z
    .string({
      required_error: 'Origin required',
    })
    .length(3, 'Origin required.'),
  destination: z
    .string({
      required_error: 'Destination required',
    })
    .length(3, 'Destination required.'),
  date: z
    .object({
      from: z.date({
        required_error: 'A flight departure day is required.',
        invalid_type_error: 'Invalid departure date',
      }),
      to: z.date({
        required_error: 'A flight return day is required.',
        invalid_type_error: 'Invalid return date',
      }),
    })
    .required({
      from: true,
      to: true,
    }),
});

export type BookingForm = z.infer<typeof BookingFormSchema>;

export const BookingCard = () => {
  const form = useForm<BookingForm>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      origin: '',
      destination: '',
      date: {
        from: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
        to: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
      },
    },
  });
  const navigate = useNavigate();

  function onSubmit(data: BookingForm) {
    navigate({
      pathname: '/choose-flight',
      search: new URLSearchParams({
        origin: data.origin,
        destination: data.destination,
        dateFrom: getSearchParamsFormattedDate(data.date.from),
        dateTo: getSearchParamsFormattedDate(data.date.to),
      }).toString(),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-3xl'
      >
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
