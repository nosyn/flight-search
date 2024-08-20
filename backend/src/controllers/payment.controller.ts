import { Request, Response } from 'express';
import { stripeClient } from '../libs/stripe/client';

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: 1000,
      currency: 'thb',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error while creating payment intent: ', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
