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
      where: eq(usersTable.clerkId, userId),
      columns: {
        clerkId: true,
      },
    });

    if (user) {
      return res.status(200).json({
        id: user.clerkId,
      });
    }

    // Maybe it's a first time the user login after sign up an account with Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    const stripeUser = await stripeClient.customers.create({
      email: clerkUser.primaryEmailAddress?.emailAddress,
      metadata: {
        clerk_id: userId,
      },
    });

    const newUser = (
      await db
        .insert(usersTable)
        .values({
          clerkId: userId,
          stripeId: stripeUser.id,
        })
        .returning()
    )[0];

    // Strip out the stripe_id because we don't need to expose it to client
    res.status(200).json({
      id: newUser.clerkId,
    });
  } catch (error) {
    console.error('Error in getMe', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
