import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const DB_CONNECTION_STRING =
  process.env.NODE_ENV === 'production' && process.env.DB_CONNECTION_STRING
    ? process.env.DB_CONNECTION_STRING
    : `postgresql://db_user:db_password@$localhost:5432/flight-search-db`;

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_CONNECTION_STRING,
  },
  schema: './src/libs/db/schema.ts',
  out: './drizzle',
});
