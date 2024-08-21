import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/protected-layout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { reactQueryClient } from './lib/react-query-client';
import { ChooseFlightPage } from './pages/choose-flight-page';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import { PaymentPage } from './pages/payment-page';
import { TicketPage } from './pages/ticket-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'choose-flight',
        element: <ChooseFlightPage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: 'ticket',
        element: <TicketPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
