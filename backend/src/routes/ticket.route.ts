import express, { Router } from 'express';
import { reserveTicket, getTicket } from '../controllers/ticket.controller';

const ticketRouter: Router = express.Router();

ticketRouter.route('/').post(reserveTicket);
ticketRouter.route('/:id').get(getTicket);

export { ticketRouter };
