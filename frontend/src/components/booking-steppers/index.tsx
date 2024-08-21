import { useReserveTicket } from '@/hooks/use-reserve-ticket';
import {
  FlightSchema,
  FlightTypeSchema,
  ReserveFlightTicketSchema,
} from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { defineSteps, Stepper, useStepper } from '@stepperize/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SelectedFlightCard } from '../flights/selected-flight-card';
import { Form } from '../ui/form';
import { FirstStep } from './first-step';
import { FourthStep } from './fourth-step';
import { SecondStep } from './second-step';
import ThirdStep from './third-step';

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
  departureFlight: z.object({
    flight: FlightSchema,
    flightType: FlightTypeSchema,
  }),
  returnFlight: z.object({
    flight: FlightSchema,
    flightType: FlightTypeSchema,
  }),
});

export type FlightTicketForm = z.infer<typeof FlightTicketFormSchema>;

const steps = defineSteps(
  {
    id: 'first',
    title: 'Departure flights',
    description: 'Choose your departure flight',
  },
  {
    id: 'second',
    title: 'Return flights',
    description: 'Choose your return flight',
  },
  { id: 'third' },
  { id: 'fourth' }
);

export type Steps = typeof steps;

const BookingSteps = () => {
  const { when, currentStep } = useStepper<Steps>();
  const form = useForm<FlightTicketForm>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(FlightTicketFormSchema),
  });
  const mutation = useReserveTicket();
  const departureFlight = form.watch('departureFlight');
  const returnFlight = form.watch('returnFlight');
  const navigate = useNavigate();

  async function onSubmit(data: FlightTicketForm) {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 bg-gray-3 rounded-md max-w-2xl'>
          {(currentStep.id === 'first' ||
            currentStep.id === 'second' ||
            currentStep.id === 'third') && (
            <div>
              {departureFlight && (
                <SelectedFlightCard
                  flight={departureFlight.flight}
                  flightType={departureFlight.flightType}
                  type='departure'
                />
              )}
              {returnFlight && (
                <SelectedFlightCard
                  flight={returnFlight.flight}
                  flightType={returnFlight.flightType}
                  type='return'
                />
              )}
            </div>
          )}
          <div>
            {when('first').render(() => (
              <FirstStep />
            ))}

            {when('second').render(() => (
              <SecondStep />
            ))}

            {when('third').render(() => (
              <ThirdStep />
            ))}

            {when('fourth').render(() => (
              <FourthStep />
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
};

export const BookingSteppers = () => {
  return (
    <Stepper steps={steps}>
      <BookingSteps />
    </Stepper>
  );
};
