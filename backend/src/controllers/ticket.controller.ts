import { Request, Response } from 'express';
import { db } from '../libs/db';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import { ticketsTable } from '../libs/db/schema';

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

    const airports = await db.insert(ticketsTable).values({
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
    });

    res.status(200).json(airports);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
