import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { __DEV__, HOST, PORT, CORS_ORIGIN } from './libs/constants';
import { apiRouter } from './routes';
import { logger } from 'libs/logger';

const main = async () => {
  const app = express();

  // Middlewares
  app.use(
    express.json({
      limit: '10mb',
    })
  );
  app.use(morgan(__DEV__ ? 'dev' : 'combined'));
  app.use(express.text());

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
  app.use('/api', apiRouter);

  app.listen(PORT, HOST, () => {
    console.log(`Server is up and ready at ${HOST}:${PORT} 🚀🚀🚀`);
  });
};

main().catch((error) => {
  logger.error('Unepxected error: ' + error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  process.exit(0);
});
