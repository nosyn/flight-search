export const __DEV__ = process.env.NODE_ENV === 'development';

export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT || '8000');
export const PROD_CORS_ORIGIN = process.env.PROD_CORS_ORIGIN || '';

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  'postgresql://db_user:db_password@localhost:5432/flight-search-db';
