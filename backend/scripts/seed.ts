import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DB_CONNECTION_STRING } from '../src/constants';
import * as schema from '../src/libs/db/schema';

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
  const airports = faker.definitions.airline.airport.map((airport) => ({
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
  for (const departureAirport of airports) {
    for (const arrivalAirport of airports) {
      if (departureAirport.iataCode === arrivalAirport.iataCode) continue;

      const flightSchedule = {
        flightNumber: faker.airline.flightNumber({ length: 6 }),
        departureAirport: departureAirport.iataCode,
        arrivalAirport: arrivalAirport.iataCode,
        departureTime: faker.date.future(),
        arrivalTime: faker.date.future(),
        price: faker.commerce.price({ min: 100, max: 200 }),
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
};

seed();
