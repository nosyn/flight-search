import { useFormContext } from 'react-hook-form';
import { FlightTicketForm } from '.';
import { SelectedFlightCard } from '../flights/selected-flight-card';
import { FlightsScheduleForm } from './flights-schedule-form';
import { Separator } from '../ui/separator';
import { TravelerInfo } from './traveler-info-form';

export const SimpleBookingForm = () => {
  const form = useFormContext<FlightTicketForm>();
  const departureFlight = form.watch('departureFlight');
  const returnFlight = form.watch('returnFlight');

  return (
    <div className='space-y-2'>
      {departureFlight ? (
        <SelectedFlightCard
          flight={departureFlight.flight}
          flightType={departureFlight.flightType}
          onEdit={() => form.setValue('departureFlight', null)}
          type='departure'
        />
      ) : (
        <div>
          <FlightsScheduleForm
            type={'departure'}
            onSelectTicket={({ flight, flightType }) => {
              form.clearErrors('departureFlight');
              form.setValue('departureFlight', { flight, flightType });
            }}
          />
          {form.formState.errors.departureFlight && (
            <p className='text-red-500 font-semibold'>
              {form.formState.errors.departureFlight.message}
            </p>
          )}
        </div>
      )}
      <Separator />
      {returnFlight ? (
        <SelectedFlightCard
          flight={returnFlight.flight}
          flightType={returnFlight.flightType}
          type='return'
          onEdit={() => form.setValue('returnFlight', null)}
        />
      ) : (
        <div>
          <FlightsScheduleForm
            type='return'
            onSelectTicket={({ flight, flightType }) => {
              form.clearErrors('returnFlight');
              form.setValue('returnFlight', { flight, flightType });
            }}
          />
          {form.formState.errors.returnFlight && (
            <p className='text-red-500 font-semibold p-2 mb-4'>
              {form.formState.errors.returnFlight.message}
            </p>
          )}
        </div>
      )}
      <Separator />
      <TravelerInfo />
      <Separator />
    </div>
  );
};
