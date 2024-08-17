import { Request, Response } from 'express';
import { db } from '../libs/db';

export const getAirports = async (req: Request, res: Response) => {
  try {
    console.log('Auth: ', req.auth);
    const airports = await db.query.airportsTable.findMany({});

    res.status(200).json(airports);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
