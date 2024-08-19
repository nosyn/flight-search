import { buyFlightTicket } from '@/lib/apis';
import {
  BuyingFlightTicketSchema,
  FlightSchema,
  FlightTypeSchema,
} from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { defineSteps, Stepper, useStepper } from '@stepperize/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SelectedFlightCard } from '../flights/selected-flight-card';
import { Form } from '../ui/form';
import { FirstStep } from './first-step';
import { FourthStep } from './fourth-step';
import { LastStep } from './last-step';
import { SecondStep } from './second-step';
import ThirdStep from './third-step';

export const FlightTicketFormSchema = z.object({
  name: z
    .string()
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
  { id: 'fourth' },
  { id: 'last' }
);

export type Steps = typeof steps;

const BookingSteps = () => {
  const { when, currentStep, goToStep } = useStepper<Steps>();
  const form = useForm<FlightTicketForm>({
    resolver: zodResolver(FlightTicketFormSchema),
  });
  const mutation = useMutation({
    mutationKey: ['buyFlightTicket'],
    mutationFn: buyFlightTicket,
  });
  const departureFlight = form.watch('departureFlight');
  const returnFlight = form.watch('returnFlight');

  async function onSubmit(data: FlightTicketForm) {
    const {
      success,
      data: parsedData,
      error,
    } = BuyingFlightTicketSchema.safeParse({
      departureFlightId: data.departureFlight.flight.id,
      departureFlightType: data.departureFlight.flightType,
      returnFlightId: data.returnFlight.flight.id,
      returnFlightType: data.returnFlight.flightType,
      passengerName: data.name,
      passengerDOB: data.dob,
      passengerGender: data.gender,
    });

    if (!success) {
      console.error('Error while buying flight ticket: ', error.message);
      return;
    }

    await mutation.mutateAsync(parsedData);
    goToStep('last');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col items-start gap-4 bg-gray-3 rounded-md'>
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
            {when('first').render((step) => (
              <FirstStep />
            ))}

            {when('second').render((step) => (
              <SecondStep />
            ))}

            {when('third').render((step) => (
              <ThirdStep />
            ))}

            {when('fourth').render((step) => (
              <FourthStep />
            ))}

            {when('last').render(() => (
              <LastStep data={mutation.data} />
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
