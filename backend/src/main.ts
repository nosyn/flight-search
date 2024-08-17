import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { __DEV__, HOST, PORT, CORS_ORIGIN } from './constants';
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
    console.warn(
      `Running in development mode - allowing CORS for domain: ${CORS_ORIGIN}`
    );
    app.use(
      cors({
        origin: CORS_ORIGIN,
        credentials: true,
      })
    );
  } else if (CORS_ORIGIN) {
    console.log(
      `Running in production mode - allowing CORS for domain: ${CORS_ORIGIN}`
    );
    const corsOptions = {
      origin: CORS_ORIGIN, // Restrict to production domain
      credentials: true,
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
