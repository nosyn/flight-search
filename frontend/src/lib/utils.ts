import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSearchParamsFormattedDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const getDateFromTimestamp = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString('en-US');

export const getDateTimeFromTimestamp = (timestamp: string) =>
  new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
