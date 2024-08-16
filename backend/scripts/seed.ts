import { Pool } from 'pg';
import { DB_CONNECTION_STRING } from '../src/constant';
import * as schema from '../src/libs/db/schema';
import { airportsTable } from '../src/libs/db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { allLocales } from '@faker-js/faker';

const seed = async () => {
  console.log('Seeding database 🌱🌱🌱');

  const client = new Pool({
    connectionString: DB_CONNECTION_STRING,
  });
  const db = drizzle(client, {
    schema,
  });

  console.log('Seeding airports table');
  await db.delete(airportsTable);
  await db.insert(airportsTable).values(allLocales.en.airline?.airport || []);
};

seed();
