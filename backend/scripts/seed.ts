import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DB_CONNECTION_STRING } from '../src/constants';
import * as schema from '../src/libs/db/schema';

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

const seed = async () => {
  console.log('Seeding database 🌱🌱🌱');

  const client = new Pool({
    connectionString: DB_CONNECTION_STRING,
  });
  const db = drizzle(client, {
    schema,
  });

  await db.delete(schema.flightsScheduleTable);
  await db.delete(schema.airportsTable);

  console.log('Seeding airports table');
  const airports = faker.definitions.airline.airport
    .slice(0, 10)
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
  endDate.setMonth(endDate.getMonth() + 1); // Set the end date to 1 months from now

  const flights: Flight[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    for (let i = 0; i < 10; i++) {
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
          max: 900,
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
};

seed().finally(() => {
  console.log('Seeding completed ✅✅✅');
});
