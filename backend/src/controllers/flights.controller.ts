import { and, eq, gte, lt } from 'drizzle-orm';
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../libs/db';
import { flightsScheduleTable } from '../libs/db/schema';
import { getDateTimestampFromQuery } from '../libs/utils';

const flightsQuery = z.object({
  origin: z.string(),
  destination: z.string(),
  date: z.string(),
});

export const getFlights = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = flightsQuery.safeParse(req.query);

    if (!success) {
      console.error('Error while getting flights: ', error.message);
      res.status(400).json({
        message: `Invalid query parameters.`,
      });
      return;
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
    console.error('Error while getting flights: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFlight = async (req: Request, res: Response) => {
  try {
    const flightId = parseInt(req.params.id);

    if (!flightId) {
      res.status(400).json({
        message: `Invalid flight id parameter.`,
      });
      return;
    }

    const flight = await db.query.flightsScheduleTable.findFirst({
      where: and(eq(flightsScheduleTable.id, flightId)),
    });

    if (!flight) {
      res.status(404).json({
        message: `Flight not found.`,
      });
      return;
    }

    res.status(200).json(flight);
  } catch (error) {
    console.error('Error while getting flights: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
