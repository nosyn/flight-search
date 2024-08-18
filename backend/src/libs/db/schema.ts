import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const airportsTable = pgTable('airports_table', {
  iataCode: varchar('iata_code', { length: 3 }).primaryKey(),
  name: text('name').notNull(),
});

export const insertAirportsSchema = createInsertSchema(airportsTable);

export const flightsScheduleTable = pgTable('flights_schedule_table', {
  id: serial('id').primaryKey(),
  airplaneName: text('airplane_name').notNull(),
  airplaneIataTypeCode: varchar('airplane_iata_type_code', {
    length: 3,
  }).notNull(),
  airlineCode: varchar('airline_code', { length: 2 }).notNull(),
  flightNumber: varchar('flight_number', { length: 4 }).notNull(),
  departureAirport: varchar('departure_airport')
    .notNull()
    .references(() => airportsTable.iataCode),
  arrivalAirport: varchar('arrival_airport')
    .notNull()
    .references(() => airportsTable.iataCode),
  departureTime: timestamp('departure_time', { withTimezone: true }).notNull(),
  arrivalTime: timestamp('arrival_time', { withTimezone: true }).notNull(),
  economyPrice: integer('economy_price').notNull(),
  businessPrice: integer('business_price').notNull(),
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
