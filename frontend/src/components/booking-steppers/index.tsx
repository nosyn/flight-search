import { FlightSchema, FlightType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { defineSteps, Stepper, useStepper } from '@stepperize/react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { SelectedFlightCard } from '../flights/selected-flight-card';
import { Form } from '../ui/form';
import { toast } from '../ui/use-toast';
import { FirstStep } from './first-step';
import { SecondStep } from './second-step';
import ThirdStep from './third-step';
import { FourthStep } from './fourth-step';
import { Button } from '../ui/button';
import { LastStep } from './last-step';

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
  const { when, currentStep } = useStepper<Steps>();

  const form = useFormContext();
  const departureFlight = form.watch('departureFlight');
  const returnFlight = form.watch('returnFlight');

  return (
    <div className='flex flex-col items-start gap-4 bg-gray-3 p-4 my-4 rounded-md'>
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
          <LastStep />
        ))}
      </div>
    </div>
  );
};

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
  departureFlight: z.object({ flight: FlightSchema, flightType: FlightType }),
  returnFlight: z.object({ flight: FlightSchema, flightType: FlightType }),
});

export type FlightTicketForm = z.infer<typeof FlightTicketFormSchema>;

export const BookingSteppers = () => {
  const form = useForm<FlightTicketForm>({
    resolver: zodResolver(FlightTicketFormSchema),
  });

  function onSubmit(data: FlightTicketForm) {
    toast({
      title: 'Submitting.',
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
        <Stepper steps={steps}>
          <BookingSteps />
        </Stepper>
      </form>
    </Form>
  );
};
