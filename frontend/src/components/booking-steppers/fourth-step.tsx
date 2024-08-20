import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GENDERS } from '@/lib/constants';
import { useFormContext } from 'react-hook-form';
import { FlightTicketForm } from '.';
import { SelectedFlightCard } from '../flights/selected-flight-card';
import { Button } from '../ui/button';

export const FourthStep = () => {
  const form = useFormContext<FlightTicketForm>();
  const { departureFlight, returnFlight, name, dob, gender } = form.getValues();

  return (
    <div>
      <p className='font-semibold text-xl'>
        Review traveler and flight information
      </p>
      <SelectedFlightCard
        flight={departureFlight.flight}
        flightType={departureFlight.flightType}
        type='departure'
      />
      <SelectedFlightCard
        flight={returnFlight.flight}
        flightType={returnFlight.flightType}
        type='return'
      />
      <Card>
        <CardHeader>
          <CardTitle>Traveler Information</CardTitle>
          <CardDescription>Please double check the information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Name: {name}</p>
          <p>Date of birth: {new Date(dob).toDateString()}</p>
          <p>Gender: {GENDERS.find((g) => g.value === gender)?.label}</p>
        </CardContent>
      </Card>
      <div className='my-2'>
        <Button type='submit'>Process to payment</Button>
      </div>
    </div>
  );
};
