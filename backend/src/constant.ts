export const __DEV__ = process.env.NODE_ENV === 'development';

export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT || '8000');
export const PROD_CORS_ORIGIN = process.env.PROD_CORS_ORIGIN || '';
