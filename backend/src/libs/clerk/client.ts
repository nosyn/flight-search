import { createClerkClient } from '@clerk/clerk-sdk-node';
import { CLERK_SECRET_KEY } from '../constants';

export const clerkClient = createClerkClient({
  secretKey: CLERK_SECRET_KEY,
});
