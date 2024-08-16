import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { __DEV__, HOST, PORT, PROD_CORS_ORIGIN } from './constants';
import { apiRouter } from './routes';

const main = async () => {
  const app = express();

  // Middlewares
  app.use(
    express.json({
      limit: '10mb',
    })
  );
  app.use(morgan(__DEV__ ? 'dev' : 'combined'));

  if (__DEV__) {
    console.warn('Running in development mode - allowing CORS for all origins');
    app.use(cors());
  } else if (PROD_CORS_ORIGIN) {
    console.log(
      `Running in production mode - allowing CORS for domain: ${PROD_CORS_ORIGIN}`
    );
    const corsOptions = {
      origin: PROD_CORS_ORIGIN, // Restrict to production domain
    };
    app.use(cors(corsOptions));
  } else {
    console.warn('Production CORS origin not set, defaulting to no CORS.');
  }

  // Router
  app.use('/', apiRouter);

  app.listen(PORT, HOST, () => {
    console.log(`Server is up and ready at ${HOST}:${PORT} 🚀🚀🚀`);
  });
};

main();
