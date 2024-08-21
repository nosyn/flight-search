import { useFormContext } from 'react-hook-form';
import { FlightTicketForm } from '.';
import { SelectedFlightCard } from '../flights/selected-flight-card';
import { FlightsSchedule } from '../flights/flights-schedule';
import { Separator } from '../ui/separator';
import { TravelerInfo } from './traveler-info-form';

export const SimpleBookingForm = () => {
  const form = useFormContext<FlightTicketForm>();
  const departureFlight = form.watch('departureFlight');
  const returnFlight = form.watch('returnFlight');

  return (
    <div>
      {departureFlight ? (
        <SelectedFlightCard
          flight={departureFlight.flight}
          flightType={departureFlight.flightType}
          type='departure'
        />
      ) : (
        <FlightsSchedule
          type={'departure'}
          onSelectTicket={({ flight, flightType }) => {
            form.setValue('departureFlight', { flight, flightType });
          }}
        />
      )}
      <Separator />
      {returnFlight ? (
        <SelectedFlightCard
          flight={returnFlight.flight}
          flightType={returnFlight.flightType}
          type='return'
        />
      ) : (
        <FlightsSchedule
          type='return'
          onSelectTicket={({ flight, flightType }) => {
            form.setValue('returnFlight', { flight, flightType });
          }}
        />
      )}
      <Separator />
      <TravelerInfo />
      <Separator />
    </div>
  );
};
