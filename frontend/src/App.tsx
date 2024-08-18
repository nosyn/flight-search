import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { queryClient } from './lib/apis';
import { ChooseFlightPage } from './pages/choose-flight-page';
import { HomePage } from './pages/home-page';

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
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
