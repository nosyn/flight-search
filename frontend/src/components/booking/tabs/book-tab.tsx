import { OneWayCalendar } from '@/components/calendars/one-way';
import { RoundtripCalendar } from '@/components/calendars/roundtrip';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import { ArrowRightLeftIcon } from 'lucide-react';

export const BookTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <RadioGroup defaultValue='roundtrip'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='default' id='r1' />
              <Label htmlFor='r1'>Default</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='roundtrip' id='r2' />
              <Label htmlFor='r2'>Roundtrip</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='one-way' id='r3' />
              <Label htmlFor='r3'>One-way</Label>
            </div>
          </RadioGroup>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex space-y-1'>
          <div className='flex-grow'>
            <Label htmlFor='name'>From*</Label>
          </div>
          <div className='w-4' />
          <div className='flex-grow'>
            <Label htmlFor='username'>To*</Label>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Input id='name' defaultValue='Pedro Duarte' />
          <ArrowRightLeftIcon size={48} />
          <Input id='username' defaultValue='@peduarte' />
        </div>
        <div>
          <OneWayCalendar />
          <RoundtripCalendar />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Find Flights</Button>
      </CardFooter>
    </Card>
  );
};
