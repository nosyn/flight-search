import express, { Router } from 'express';
import { buyTicket, getTicket } from '../controllers/ticket.controller';

const ticketRouter: Router = express.Router();

ticketRouter.route('/').post(buyTicket);
ticketRouter.route('/:id').get(getTicket);

export { ticketRouter };
