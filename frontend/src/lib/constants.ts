export const SERVER_URL = 'http://localhost:8000' as const;
export const API_AIRPORTS = SERVER_URL + '/airports';
export const API_FLIGHTS = SERVER_URL + '/flights';
export const API_TICKET = SERVER_URL + '/ticket';

export const GENDERS = [
  { label: 'Male (M)', value: 'm' },
  { label: 'Female (F)', value: 'f' },
  { label: 'Unspecified (U)', value: 'u' },
  { label: 'Undisclosed (X)', value: 'x' },
] as const;
