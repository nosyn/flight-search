import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookTab } from './tabs/book-tab';
import { FlightStatusTab } from './tabs/flight-status-tab';
import { MyTripsTab } from './tabs/my-trips-tab';

export const BookingCard = () => {
  return (
    <Tabs defaultValue='book' className='max-w-[640px]'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='book'>Book</TabsTrigger>
        <TabsTrigger value='flight-status'>Flight Status</TabsTrigger>
        <TabsTrigger value='my-trips'>My trips</TabsTrigger>
      </TabsList>
      <TabsContent value='book'>
        <BookTab />
      </TabsContent>
      <TabsContent value='flight-status'>
        <FlightStatusTab />
      </TabsContent>
      <TabsContent value='my-trips'>
        <MyTripsTab />
      </TabsContent>
    </Tabs>
  );
};
