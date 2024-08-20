import 'dotenv/config';

export const __DEV__ = process.env.NODE_ENV === 'development';

export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT || '8000');
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  'postgresql://db_user:db_password@localhost:5432/flight-search-db';

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
