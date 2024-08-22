export const WEB_URL = import.meta.env.VITE_WEB_URL || 'http://localhost:5173';
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';
export const SERVER_API = SERVER_URL + '/api';
export const API_AIRPORTS = SERVER_API + '/airports';
export const API_FLIGHTS = SERVER_API + '/flights';
export const API_TICKET = SERVER_API + '/ticket';
export const API_PAYMENT = SERVER_API + '/payment';
export const API_CREATE_PAYMENT_INTENT = API_PAYMENT + '/create-payment-intent';
export const API_ME = SERVER_API + '/me';

export const GENDERS = [
  { label: 'Male (M)', value: 'm' },
  { label: 'Female (F)', value: 'f' },
  { label: 'Unspecified (U)', value: 'u' },
  { label: 'Undisclosed (X)', value: 'x' },
] as const;
