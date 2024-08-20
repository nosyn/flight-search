import { Request, Response } from 'express';
import { db } from '../libs/db';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import { ticketsTable } from '../libs/db/schema';
import { stripeClient } from '../libs/stripe/client';

export const flightTypeSchema = z.enum(['economy', 'business']);
export const passengerGenderSchema = z.enum(['m', 'f', 'x', 'u']);
export const buyTicketParams = z.object({
  departureFlightId: z.number(),
  departureFlightType: flightTypeSchema,
  returnFlightId: z.number(),
  returnFlightType: flightTypeSchema,
  passengerName: z.string(),
  passengerDOB: z.string(),
  passengerGender: passengerGenderSchema,
});

export const buyTicket = async (req: Request, res: Response) => {
  try {
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
          departureFlightId: data.departureFlightId,
          departureFlightType: data.departureFlightType,
          departureFlightSeatNumber: faker.airline.seat({
            aircraftType: 'widebody',
          }),
          departureFlightRecordLocator: faker.airline.recordLocator(),
          returnFlightId: data.returnFlightId,
          returnFlightType: data.returnFlightType,
          returnFlightSeatNumber: faker.airline.seat({
            aircraftType: 'widebody',
          }),
          returnFlightRecordLocator: faker.airline.recordLocator(),
          passengerName: data.passengerName,
          passengerDOB: new Date(data.passengerDOB),
          passengerGender: data.passengerGender,
        })
        .returning();

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: 500,
        currency: 'thb',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return res.status(200).json({
        ticket: ticket[0],
        payment: {
          clientSecret: paymentIntent.client_secret,
        },
      });
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
