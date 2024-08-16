import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const airportsTable = pgTable('airports_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  iataCode: varchar('iata_code', { length: 3 }).notNull(),
});
