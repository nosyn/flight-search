import express, { Router } from 'express';
import { getFlight, getFlights } from '../controllers/flights.controller';

const flightsRouter: Router = express.Router();

flightsRouter.route('/').get(getFlights);
flightsRouter.route('/:id').get(getFlight);

export { flightsRouter };
