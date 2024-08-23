import { BookingCard } from '@/components/booking/booking-card';
import { MyTickets } from '@/components/tickets/my-tickets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const HomePage = () => {
  return (
    <div>
      <h3 className='font-bold my-2'>Welcome to Flight Search</h3>
      <Tabs defaultValue='book' className='max-w-3xl'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='book'>Book</TabsTrigger>
          <TabsTrigger value='my-tickets'>My Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value='book'>
          <BookingCard />
        </TabsContent>
        <TabsContent value='my-tickets'>
          <MyTickets />
        </TabsContent>
      </Tabs>
    </div>
  );
};
