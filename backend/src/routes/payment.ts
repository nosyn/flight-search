import express, { Router } from 'express';
import { createPaymentIntent } from '../controllers/payment.controller';

const paymentRouter: Router = express.Router();

paymentRouter.route('/create-payment-intent').post(createPaymentIntent);

export { paymentRouter };
