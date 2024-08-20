import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

import { PlaneIcon } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <nav className='font-medium flex flex-row items-center gap-5 text-sm lg:gap-6'>
          <a
            href='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <PlaneIcon className='h-6 w-6' />
            <span className='sr-only'>Flight Search</span>
          </a>
        </nav>
        <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <div className='ml-auto flex-1 sm:flex-initial' />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <SignedOut>
          <div>Click Sign In Button On The Top Right To Get Started</div>
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </main>
    </div>
  );
}
