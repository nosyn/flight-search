import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_CONNECTION_STRING,
  },
  schema: './src/libs/db/schema.ts',
  out: './drizzle',
});
