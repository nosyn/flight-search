import { useReserveTicketMutation } from '@/hooks/use-reserve-ticket-mutation';
import {
  FlightSchema,
  FlightTypeSchema,
  ReserveFlightTicketSchema,
} from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { SimpleBookingForm } from './simple-book-form';

export const FlightTicketFormSchema = z.object({
  name: z
    .string({
      coerce: true,
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  gender: z.enum(['m', 'f', 'x', 'u']),
  departureFlight: z
    .object({
      flight: FlightSchema,
      flightType: FlightTypeSchema,
    })
    .nullable(),
  returnFlight: z
    .object({
      flight: FlightSchema,
      flightType: FlightTypeSchema,
    })
    .nullable(),
});

export type FlightTicketForm = z.infer<typeof FlightTicketFormSchema>;

export const BookingForm = () => {
  const form = useForm<FlightTicketForm>({
    resolver: zodResolver(FlightTicketFormSchema),
    defaultValues: {
      name: '',
    },
  });
  const mutation = useReserveTicketMutation();
  const navigate = useNavigate();

  async function onSubmit(data: FlightTicketForm) {
    if (!data.departureFlight) {
      form.setError('departureFlight', {
        type: 'manual',
        message: 'Departure flight is required.',
      });
      return;
    }

    if (!data.returnFlight) {
      form.setError('returnFlight', {
        type: 'manual',
        message: 'Return flight is required.',
      });
      return;
    }

    const {
      success,
      data: parsedData,
      error,
    } = await ReserveFlightTicketSchema.safeParseAsync({
      departureFlightId: data.departureFlight.flight.id,
      departureFlightType: data.departureFlight.flightType,
      departureFlightPrice:
        data.departureFlight.flightType === 'business'
          ? data.departureFlight.flight.businessPrice
          : data.departureFlight.flight.economyPrice,
      returnFlightId: data.returnFlight.flight.id,
      returnFlightType: data.returnFlight.flightType,
      returnFlightPrice:
        data.returnFlight.flightType === 'business'
          ? data.returnFlight.flight.businessPrice
          : data.returnFlight.flight.economyPrice,
      passengerName: data.name,
      passengerDOB: data.dob,
      passengerGender: data.gender,
    });

    if (!success) {
      console.error('Error while reserving flight ticket: ', error.message);
      return;
    }

    const ticket = await mutation.mutateAsync(parsedData);

    navigate({
      pathname: '/payment',
      search: new URLSearchParams({
        ticketId: String(ticket.id),
      }).toString(),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-lg space-y-2'
      >
        <SimpleBookingForm />

        <div className='my-2'>
          <Button type='submit'>Process to payment</Button>
        </div>
      </form>
    </Form>
  );
};
