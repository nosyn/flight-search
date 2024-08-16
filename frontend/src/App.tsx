import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookingCard } from './components/booking/booking-card';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='border-b-2 min-h-screen p-4'>
        <BookingCard />
        <Toaster />
      </main>
    </QueryClientProvider>
  );
}

export default App;
