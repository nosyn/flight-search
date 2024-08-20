import { Request, Response } from 'express';
import { db } from '../libs/db';
import { clerkClient, type WithAuthProp } from '@clerk/clerk-sdk-node';
import { eq } from 'drizzle-orm';
import { usersTable } from '../libs/db/schema';
import { stripeClient } from '../libs/stripe/client';

export const getMe = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as WithAuthProp<Request>).auth as {
      userId: string;
    }; // We are sure there is an userId here because we use RequireAuthMiddleware. Otherwise, the middleware would have thrown an error earlier.

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.clerk_id, userId),
      columns: {
        id: true,
        clerk_id: true,
      },
    });

    if (user) {
      return res.status(200).json(user);
    }

    // Maybe it's a first time the user login after sign up an account with Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    const stripeUser = await stripeClient.customers.create({
      email: clerkUser.primaryEmailAddress?.emailAddress,
    });

    const newUser = (
      await db
        .insert(usersTable)
        .values({
          clerk_id: userId,
          stripe_id: stripeUser.id,
        })
        .returning()
    )[0];

    // Strip out the stripe id because we don't need it in the response
    res.status(200).json({
      id: newUser.id,
      clerk_id: newUser.clerk_id,
    });
  } catch (error) {
    console.error('Error in getMe', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
