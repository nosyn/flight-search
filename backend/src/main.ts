import express from 'express';
import { PORT } from './constant';

const main = () => {
  const app = express();

  app.get('/', (_, res) => {
    res.send('Welcome to flight search');
  });

  app.listen(PORT, () => {
    console.log('Server is up and ready 🚀🚀🚀');
  });
};

main();
