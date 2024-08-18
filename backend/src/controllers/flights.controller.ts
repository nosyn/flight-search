import { Request, Response } from 'express';
import { db } from '../libs/db';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { flightsScheduleTable } from '../libs/db/schema';

const getFlightQuery = z.object({
  origin: z.string(),
  destination: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

export const getFlights = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = getFlightQuery.safeParse(req.query);

    if (!success) {
      console.error('Error while getting flights: ', error.message);
      res.status(400).json({
        message: `Invalid query parameters.`,
      });
      return;
    }

    const airports = await db.query.flightsScheduleTable.findMany({
      where: and(
        eq(flightsScheduleTable.departureAirport, data.origin),
        eq(flightsScheduleTable.arrivalAirport, data.destination)
      ),
    });

    res.status(200).json(airports);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
