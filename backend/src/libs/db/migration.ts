import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { DB_CONNECTION_STRING } from '../../constants';
import { sleep } from '../utils';

export const dbMigration = async () => {
  // This will run migrations on the database, skipping the ones already applied
  console.log('Applying migrations. Sleeping for 1 second');
  const migrationClient = postgres(DB_CONNECTION_STRING, { max: 1 });
  migrate(drizzle(migrationClient), {
    migrationsFolder: 'drizzle',
  });
  await sleep(1000); // We will wait for 1 seconds before starting server
  console.log('Migration applied successfully');
};
