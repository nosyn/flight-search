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

    if (payment && payment.paymentStatus) {
      return res.redirect(303, `/ticket?ticketId=${ticketId}`); // Ticket already paid. Don't process again
    }

    const ticket = await db.query.ticketsTable.findFirst({
      where: eq(ticketsTable.id, ticketId),
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const ticketPrice =
      (ticket.departureFlightPrice + ticket.returnFlightPrice) * 100; // Minimum at least 10.00 baht.

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: ticketPrice,
      currency: 'thb',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!payment) {
      await db.insert(paymentTable).values({
        amount: ticketPrice,
        ticketId,
        paymentIntentId: paymentIntent.id,
        paymentStatus: false,
      });
    }

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error while creating payment intent: ', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
