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

export const getDurationBetweenTimestamps = ({
  timestamp1,
  timestamp2,
}: {
  timestamp1: string;
  timestamp2: string;
}) => {
  // Calculate the duration in milliseconds
  const durationInMilliseconds =
    Number(new Date(timestamp2)) - Number(new Date(timestamp1));

  // Convert the duration into hours, minutes, and seconds
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;

  const hours = Math.floor(durationInMilliseconds / millisecondsInHour);
  const minutes = Math.floor(
    (durationInMilliseconds % millisecondsInHour) / millisecondsInMinute
  );

  return `${hours} hours, ${minutes} minutes`;
};
