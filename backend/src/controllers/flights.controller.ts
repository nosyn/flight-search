import { and, eq, gte, lt } from 'drizzle-orm';
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../libs/db';
import { flightsScheduleTable } from '../libs/db/schema';
import { getDateTimestampFromQuery } from '../libs/utils';
import { logger } from 'libs/logger';

const flightsQuery = z.object({
  origin: z.string(),
  destination: z.string(),
  date: z.string(),
});

export const getFlights = async (req: Request, res: Response) => {
  try {
    const { success, data } = flightsQuery.safeParse(req.query);

    if (!success) {
      return res.status(400).send('Invalid query parameters.');
    }

    const dateFromTimestamp = getDateTimestampFromQuery(data.date);
    const flights = await db.query.flightsScheduleTable.findMany({
      where: and(
        eq(flightsScheduleTable.departureAirport, data.origin),
        eq(flightsScheduleTable.arrivalAirport, data.destination),
        gte(flightsScheduleTable.departureTime, dateFromTimestamp.start),
        lt(flightsScheduleTable.departureTime, dateFromTimestamp.end)
      ),
    });

    res.status(200).json(flights);
  } catch (error) {
    logger.error('getFlights: ', error);
    return res.status(500).send('Internal server error');
  }
};

export const getFlight = async (req: Request, res: Response) => {
  try {
    const flightId = parseInt(req.params.id);

    if (!flightId) {
      return res.status(400).send('Invalid flight id parameter.');
    }

    const flight = await db.query.flightsScheduleTable.findFirst({
      where: and(eq(flightsScheduleTable.id, flightId)),
    });

    if (!flight) {
      return res.status(400).send(`Flight not found.`);
    }

    res.status(200).json(flight);
  } catch (error) {
    logger.error('getFlight: ', error);
    return res.status(500).send('Internal server error');
  }
};
