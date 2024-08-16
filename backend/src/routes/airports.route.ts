import express, { Router } from 'express';
import { getAirports } from '../controllers/airports.controller';

const airportsRouter: Router = express.Router();

airportsRouter.route('/').get(getAirports);

export { airportsRouter };
