import express, { Request, Response, Router } from 'express';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

// Routes
import { airportsRouter } from './airports.route';
import { flightsRouter } from './flights.route';

export const apiRouter: Router = express.Router();

apiRouter.get('/', (_req: Request, res: Response) => {
  res.send('Flight Search Express Server');
});

apiRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server is up and running',
  });
});

apiRouter.use('/airports', airportsRouter);
apiRouter.use('/flights', flightsRouter);
