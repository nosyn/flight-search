import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  pgEnum,
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

export const genderEnum = pgEnum('genders', ['m', 'f', 'x', 'u']);
export const flightType = pgEnum('flight_types', ['economy', 'business']);

export const ticketsTable = pgTable('tickets_table', {
  id: serial('id').primaryKey(),
  departureFlightId: integer('departure_flight_id')
    .notNull()
    .references(() => flightsScheduleTable.id),
  departureFlightType: flightType('departure_flight_type').notNull(),
  departureFlightSeatNumber: varchar('departure_flight_seat_number', {
    length: 3,
  }).notNull(),
  departureFlightRecordLocator: varchar('departure_flight_record_locator', {
    length: 6,
  }).notNull(),
  returnFlightId: integer('return_flight_id')
    .notNull()
    .references(() => flightsScheduleTable.id),
  returnFlightType: flightType('return_flight_type').notNull(),
  returnFlightSeatNumber: varchar('return_flight_seat_number', {
    length: 3,
  }).notNull(),
  returnFlightRecordLocator: varchar('return_flight_record_locator', {
    length: 6,
  }).notNull(),
  passengerName: text('passenger_name').notNull(),
  passengerDOB: timestamp('passenger_dob', { withTimezone: true }).notNull(),
  passengerGender: genderEnum('passenger_gender'),
});
