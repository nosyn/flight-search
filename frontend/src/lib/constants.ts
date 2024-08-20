export const WEB_URL = import.meta.env.VITE_WEB_URL || 'http://localhost:5173';
export const SERVER_URL = 'http://localhost:8000' as const;
export const API_AIRPORTS = SERVER_URL + '/airports';
export const API_FLIGHTS = SERVER_URL + '/flights';
export const API_TICKET = SERVER_URL + '/ticket';
export const API_PAYMENT = SERVER_URL + '/payment';
export const API_CREATE_PAYMENT_INTENT = API_PAYMENT + '/create-payment-intent';
export const API_ME = SERVER_URL + '/me';

export const GENDERS = [
  { label: 'Male (M)', value: 'm' },
  { label: 'Female (F)', value: 'f' },
  { label: 'Unspecified (U)', value: 'u' },
  { label: 'Undisclosed (X)', value: 'x' },
] as const;
