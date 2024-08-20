import express, { Request, Response, Router } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Routes
import { airportsRouter } from './airports.route';
import { flightsRouter } from './flights.route';
import { ticketRouter } from './ticket.route';
import { paymentRouter } from './payment';
import { meRouter } from './me.route';

export const apiRouter: Router = express.Router();

apiRouter.get('/', (_req: Request, res: Response) => {
  res.send('Flight Search Express Server');
});

apiRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server is up and running',
  });
});

// All routes below this line will require authentication from Clerk
apiRouter.use(
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  })
);
apiRouter.use('/airports', airportsRouter);
apiRouter.use('/flights', flightsRouter);
apiRouter.use('/ticket', ticketRouter);
apiRouter.use('/payment', paymentRouter);
apiRouter.use('/me', meRouter);

// Error handling
apiRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});
