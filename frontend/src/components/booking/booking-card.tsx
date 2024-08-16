import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookTab } from './tabs/book-tab';
import { CheckInTab } from './tabs/check-in-tab';

export const BookingCard = () => {
  return (
    <Tabs defaultValue='book' className='w-[640px]'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='book'>Book</TabsTrigger>
        <TabsTrigger value='check-in'>Check-in</TabsTrigger>
        <TabsTrigger value='my-trips'>My trips</TabsTrigger>
      </TabsList>
      <TabsContent value='book'>
        <BookTab />
      </TabsContent>
      <TabsContent value='check-in'>
        <CheckInTab />
      </TabsContent>
    </Tabs>
  );
};
