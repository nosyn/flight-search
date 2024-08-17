import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookingCard } from './components/booking/booking-card';
import { Layout } from './components/layout';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <BookingCard />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
