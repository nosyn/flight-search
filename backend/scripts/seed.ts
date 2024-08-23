import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { faker } from '@faker-js/faker';
import * as schema from '../src/libs/db/schema';

const MAX_AIRPORTS = 10;
const MAX_FLIGHTS_PER_DAY_FROM_EACH_AIRPORT_TO_OTHER_AIRPORT = 10;
const IN_THE_NEXT_X_MONTH = 2;
const DB_CONNECTION_STRING =
  process.env.NODE_ENV === 'production' && process.env.DB_CONNECTION_STRING
    ? process.env.DB_CONNECTION_STRING
    : `postgresql://db_user:db_password@$localhost:5432/flight-search-db`;

interface Flight {
  departureTime: Date;
  arrivalTime: Date;
}

// Generate a random flight for a given day
function generateFlight(day: Date): Flight {
  const departureHour = faker.number.int({ min: 0, max: 23 });
  const departureMinute = faker.number.int({ min: 0, max: 59 });

  const departureTime = new Date(day);
  departureTime.setHours(departureHour, departureMinute, 0, 0);

  // Random flight duration between 1 and 12 hours
  const flightDurationInMinutes = faker.number.int({ min: 60, max: 12 * 60 });
  const arrivalTime = new Date(
    departureTime.getTime() + flightDurationInMinutes * 60 * 1000
  );

  return {
    departureTime,
    arrivalTime,
  };
}

const truncateTable = async (tableName: string) => {
  const client = postgres(DB_CONNECTION_STRING);

  try {
    console.log(`Truncating table tableName with cascade...`);

    await client`TRUNCATE TABLE ${client(tableName)} CASCADE`;

    console.log(`Table ${tableName} truncated successfully.`);
  } catch (error) {
    console.error(`Error truncating table ${tableName}:`, error);
  } finally {
    await client.end();
  }
};

const seed = async () => {
  const client = postgres(DB_CONNECTION_STRING);

  console.log('Seeding database 🌱🌱🌱');

  const db = drizzle(client, {
    schema,
  });

  await truncateTable('flights_schedule_table'); // Replace with your actual table name
  await truncateTable('airports_table'); // Replace with your actual table name

  console.log('Seeding airports table');
  const airports = faker.definitions.airline.airport
    .slice(0, MAX_AIRPORTS)
    .map((airport) => ({
      iataCode: airport.iataCode,
      name: airport.name,
    }));

  try {
    await db.insert(schema.airportsTable).values(airports);
  } catch (error) {
    console.error(error);
    return;
  }

  console.log('Seeding flights schedule table');
  // Generate 5 flights each day for the next 1 month
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + IN_THE_NEXT_X_MONTH); // Set the end date to 1 months from now

  const flights: Flight[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    for (
      let i = 0;
      i < MAX_FLIGHTS_PER_DAY_FROM_EACH_AIRPORT_TO_OTHER_AIRPORT;
      i++
    ) {
      const flight = generateFlight(new Date(d));
      flights.push(flight);
    }
  }

  const totalIterations = airports.length ** 2;
  let currentIteration = 0;
  for (let i = 0; i < airports.length; i++) {
    const departureAirport = airports[i];
    for (let j = 0; j < airports.length; j++) {
      // Update the current iteration count
      currentIteration++;

      // Calculate progress
      let progress = (currentIteration / totalIterations) * 100;
      console.log(`Flights schedule table - progress: ${progress.toFixed(0)}%`);

      if (i === j) continue; // Skip the same airport
      const arrivalAirport = airports[j];

      // Output the generated flights
      for (const flight of flights) {
        const airplane = faker.airline.airplane();
        const economyPrice = faker.number.int({
          max: 300,
          min: 150,
        });
        const businessPrice = faker.number.int({
          max: 1500,
          min: 600,
        });
        const flightSchedule = {
          airplaneName: airplane.name,
          airplaneIataTypeCode: airplane.iataTypeCode,
          airlineCode: 'CL', // Hardcode
          flightNumber: faker.airline.flightNumber({ length: 4 }),
          departureAirport: departureAirport.iataCode,
          arrivalAirport: arrivalAirport.iataCode,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          economyPrice,
          businessPrice,
        };

        try {
          await db.insert(schema.flightsScheduleTable).values(flightSchedule);
        } catch (error) {
          console.error(error);
          console.log(flightSchedule);
          return;
        }
      }
    }
  }

  client.end();
};

seed().finally(() => {
  console.log('Seeding completed ✅✅✅');
});
