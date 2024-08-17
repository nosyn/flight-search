import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const airportsTable = pgTable('airports_table', {
  iataCode: varchar('iata_code', { length: 3 }).primaryKey(),
  name: text('name').notNull(),
});

export const insertAirportsSchema = createInsertSchema(airportsTable);

export const flightsScheduleTable = pgTable('flights_schedule_table', {
  id: serial('id').primaryKey(),
  flightNumber: varchar('flight_number', { length: 6 }).notNull().unique(),
  departureAirport: varchar('departure_airport')
    .notNull()
    .references(() => airportsTable.iataCode),
  arrivalAirport: varchar('arrival_airport')
    .notNull()
    .references(() => airportsTable.iataCode),
  departureTime: timestamp('departure_time', { withTimezone: true }).notNull(),
  arrivalTime: timestamp('arrival_time', { withTimezone: true }).notNull(),
  price: numeric('price', { precision: 5, scale: 2 }).notNull(),
});

export const insertFlightsScheduleSchema =
  createInsertSchema(flightsScheduleTable);

export const ticketsTable = pgTable('tickets_table', {
  id: serial('id').primaryKey(),
  flightId: integer('flight_id')
    .notNull()
    .references(() => flightsScheduleTable.id),
  passengerName: text('passenger_name').notNull(),
  passengerEmail: text('passenger_email').notNull(),
  seatNumber: varchar('seat_number', { length: 3 }).notNull(),
  recordLocator: varchar('record_locator', { length: 6 }).notNull(),
});
