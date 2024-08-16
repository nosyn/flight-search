import { defineConfig } from 'drizzle-kit';
import { DB_CONNECTION_STRING } from './src/constant';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_CONNECTION_STRING,
  },
  schema: './src/libs/db/schema.ts',
  out: './drizzle',
});
