import { Request, Response } from 'express';
import { db } from '../libs/db';
import { logger } from 'libs/logger';

export const getAirports = async (req: Request, res: Response) => {
  try {
    const airports = await db.query.airportsTable.findMany({});

    res.status(200).json(airports);
  } catch (error) {
    logger.error('getAirports: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
