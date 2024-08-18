import { and, eq, gte, lt } from 'drizzle-orm';
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../libs/db';
import { flightsScheduleTable } from '../libs/db/schema';
import { getDateTimestampFromQuery } from '../libs/utils';

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

    const queryTimestamp = getDateTimestampFromQuery(data.dateFrom);
    const airports = await db.query.flightsScheduleTable.findMany({
      where: and(
        eq(flightsScheduleTable.departureAirport, data.origin),
        eq(flightsScheduleTable.arrivalAirport, data.destination),
        gte(flightsScheduleTable.departureTime, queryTimestamp.start),
        lt(flightsScheduleTable.departureTime, queryTimestamp.end)
      ),
    });

    res.status(200).json(airports);
  } catch (error) {
    console.error('Error while getting flights: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
