import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <App />
  </ClerkProvider>
);
