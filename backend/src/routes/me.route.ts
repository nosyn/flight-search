import express, { Router } from 'express';
import { getMe } from '../controllers/me.controller';

const meRouter: Router = express.Router();

meRouter.route('/').get(getMe);

export { meRouter };
