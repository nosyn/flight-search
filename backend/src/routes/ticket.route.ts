import express, { Router } from 'express';
import { buyTicket } from '../controllers/ticket.controller';

const ticketRouter: Router = express.Router();

ticketRouter.route('/').post(buyTicket);

export { ticketRouter };
