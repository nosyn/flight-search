import { Request, Response } from 'express';
import { stripeClient } from '../libs/stripe/client';
import { db } from '../libs/db';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { paymentTable, ticketsTable } from '../libs/db/schema';

const PaymentIntentParamsSchema = z.object({
  ticketId: z.number({
    coerce: true, // casting string to number
  }),
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { data, success } = await PaymentIntentParamsSchema.safeParseAsync(
      req.body
    );

    if (!success) {
      return res
        .status(400)
        .json({ message: 'Invalid request body for ticketId' });
    }

    const { ticketId } = data;

    const payment = await db.query.paymentTable.findFirst({
      where: eq(paymentTable.ticketId, ticketId),
    });

    // If payment has already exists
    if (payment) {
      // Case 1: Ticket already paid. Don't process again
      if (payment.paymentStatus) {
        return res.status(303).json({ message: 'Ticket is already paid' });

        // Case 2: Return old payment secret
      } else {
        const paymentIntent = await stripeClient.paymentIntents.retrieve(
          payment.paymentIntentId
        );

        return res.send({
          clientSecret: paymentIntent.client_secret,
          amount: payment.amount,
        });
      }
    }

    const ticket = await db.query.ticketsTable.findFirst({
      where: eq(ticketsTable.id, ticketId),
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const amount =
      (ticket.departureFlightPrice + ticket.returnFlightPrice) * 100; // Minimum at least 10.00 baht.

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: 'thb',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!payment) {
      await db.insert(paymentTable).values({
        amount,
        ticketId,
        paymentIntentId: paymentIntent.id,
        paymentStatus: false,
      });
    }

    res.send({
      clientSecret: paymentIntent.client_secret,
      amount,
    });
  } catch (error) {
    console.error('Error while creating payment intent: ', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
