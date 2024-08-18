import { defineSteps, Stepper, useStepper } from '@stepperize/react';
import { FlightsSchedule } from '../flights/flights-schedule';
import { Button } from '../ui/button';

const steps = defineSteps(
  {
    id: 'first',
    description: 'Select departure flights',
    title: 'Departure flights',
  },
  {
    id: 'second',
    description: 'Select return flights',
    title: 'Return flights',
  },
  { id: 'third' },
  { id: 'last' }
);

export type Steps = typeof steps;

export const MySteps = () => {
  const {
    when,
    goToNextStep,
    goToPrevStep,
    isLastStep,
    reset,
    isFirstStep,
    currentStep,
  } = useStepper<Steps>();

  return (
    <div className='flex flex-col gap-4 bg-gray-3 p-4 my-4 rounded-md'>
      {!isLastStep ? (
        <div className='flex items-center gap-2'>
          <Button onClick={goToPrevStep} disabled={isFirstStep}>
            Previous
          </Button>
          <Button onClick={goToNextStep}>
            {currentStep.id === 'third' ? 'Finish' : 'Next'}
          </Button>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          <Button onClick={reset}>Reset</Button>
        </div>
      )}
      {when('first').render((step) => (
        <FlightsSchedule type='departure' />
      ))}

      {when('second').render((step) => (
        <FlightsSchedule type='return' />
      ))}

      {when('third').render((step) => (
        <p>This is the {step.id}</p>
      ))}

      {when('last').render(() => (
        <p>You have reached the end of the stepper</p>
      ))}
    </div>
  );
};

export const BookingSteppers = () => {
  return (
    <Stepper steps={steps}>
      <MySteps />
    </Stepper>
  );
};
