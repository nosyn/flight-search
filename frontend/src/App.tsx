import { BookingCard } from './components/booking/booking-card';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <main className='border-b-2 min-h-screen p-4'>
      <BookingCard />
      <Toaster />
    </main>
  );
}

export default App;
