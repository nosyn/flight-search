import express, { Router } from 'express';
import {
  reserveTicket,
  getTicket,
  getTickets,
} from '../controllers/tickets.controller';

const ticketsRouter: Router = express.Router();

ticketsRouter.route('/').post(reserveTicket);
ticketsRouter.route('/').get(getTickets);
ticketsRouter.route('/:id').get(getTicket);

export { ticketsRouter };
