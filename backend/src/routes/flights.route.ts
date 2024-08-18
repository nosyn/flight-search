import express, { Router } from 'express';
import { getFlights } from '../controllers/flights.controller';

const flightsRouter: Router = express.Router();

flightsRouter.route('/').get(getFlights);

export { flightsRouter };
