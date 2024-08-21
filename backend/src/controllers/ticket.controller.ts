import { WithAuthProp } from '@clerk/clerk-sdk-node';
import { faker } from '@faker-js/faker';
import { and, eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../libs/db';
import { paymentTable, ticketsTable } from '../libs/db/schema';
import { stripeClient } from '../libs/stripe/client';

export const flightTypeSchema = z.enum(['economy', 'business']);
export const passengerGenderSchema = z.enum(['m', 'f', 'x', 'u']);
export const buyTicketParams = z.object({
  departureFlightId: z.number(),
  departureFlightType: flightTypeSchema,
  departureFlightPrice: z.number(),
  returnFlightId: z.number(),
  returnFlightType: flightTypeSchema,
  returnFlightPrice: z.number(),
  passengerName: z.string(),
  passengerDOB: z.date({
    coerce: true,
  }),
  passengerGender: passengerGenderSchema,
});

export const buyTicket = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as WithAuthProp<Request>).auth as {
      userId: string;
    };

    const { success, data, error } = await buyTicketParams.safeParseAsync(
      req.body
    );

    if (!success) {
      console.error('Error while buying flight ticket: ', error.message);
      res.status(400).json({
        message: `Invalid body parameters.`,
      });
      return;
    }

    try {
      const ticket = await db
        .insert(ticketsTable)
        .values({
          clerkId: userId,
          departureFlightId: data.departureFlightId,
          departureFlightType: data.departureFlightType,
          departureFlightPrice: data.departureFlightPrice,
          departureFlightSeatNumber: faker.airline.seat({
            aircraftType: 'widebody',
          }),
          departureFlightRecordLocator: faker.airline.recordLocator(),
          returnFlightId: data.returnFlightId,
          returnFlightType: data.returnFlightType,
          returnFlightPrice: data.returnFlightPrice,
          returnFlightSeatNumber: faker.airline.seat({
            aircraftType: 'widebody',
          }),
          returnFlightRecordLocator: faker.airline.recordLocator(),
          passengerName: data.passengerName,
          passengerDOB: new Date(data.passengerDOB),
          passengerGender: data.passengerGender,
        })
        .returning();

      return res.status(200).json(ticket[0]);
    } catch (error) {
      console.error(
        'Error while inserting into data flight ticket: ',
        error.message
      );
      throw new Error('Error while buying flight ticket');
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as WithAuthProp<Request>).auth as {
      userId: string;
    };

    const ticketId = parseInt(req.params.id);

    if (!ticketId) {
      res.status(400).json({
        message: `Invalid ticket id parameter.`,
      });
      return;
    }

    const ticket = await db.query.ticketsTable.findFirst({
      where: and(
        eq(ticketsTable.id, ticketId),
        eq(ticketsTable.clerkId, userId)
      ),
    });

    if (!ticket) {
      res.status(400).json({
        message: `Ticket not found.`,
      });
      return;
    }

    const payment = await db.query.paymentTable.findFirst({
      where: eq(paymentTable.ticketId, ticketId),
    });

    if (!payment) {
      // Note: Maybe we can create a payment intent here and redirect the user to the payment page. For now, we will just return an error.
      return res.status(400).json({
        message: 'No payment method found for this ticket.',
      });
    }

    if (payment.paymentStatus) {
      return res.status(200).json(ticket);
    }

    // Ticket has not already paid.
    // Case 1: Look up from stripe
    const paymentIntent = await stripeClient.paymentIntents.retrieve(
      payment.paymentIntentId
    );
    if (paymentIntent.status === 'succeeded') {
      await db
        .update(paymentTable)
        .set({
          paymentStatus: true,
        })
        .where(eq(paymentTable.ticketId, ticketId));

      return res.status(200).json(ticket);
    }

    // Case 2: Navigate to payment page
    return res.status(402).json({
      message: 'You have not paid for the ticket.',
    }); //
  } catch (error) {
    console.error('Error while getting ticket: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
