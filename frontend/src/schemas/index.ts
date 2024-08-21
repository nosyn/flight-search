import { z } from 'zod';

export const AirportSchema = z.object({
  iataCode: z.string().length(3),
  name: z.string(),
});
export type Airport = z.infer<typeof AirportSchema>;

export const PassengerGenderSchema = z.enum(['m', 'f', 'x', 'u']);
export type PassengerGender = z.infer<typeof PassengerGenderSchema>;

export const FlightSchema = z.object({
  id: z.number(),
  airplaneName: z.string(),
  airplaneIataTypeCode: z.string(),
  airlineCode: z.string(),
  flightNumber: z.string(),
  departureAirport: z.string(),
  arrivalAirport: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  economyPrice: z.number(),
  businessPrice: z.number(),
});
export type Flight = z.infer<typeof FlightSchema>;

export const FlightTypeSchema = z.enum(['economy', 'business']);
export type FlightType = z.infer<typeof FlightTypeSchema>;

export const ReserveFlightTicketSchema = z.object({
  departureFlightId: z.number(),
  departureFlightType: FlightTypeSchema,
  departureFlightPrice: z.number(),
  returnFlightId: z.number(),
  returnFlightType: FlightTypeSchema,
  returnFlightPrice: z.number(),
  passengerName: z.string(),
  passengerDOB: z.date(),
  passengerGender: PassengerGenderSchema,
});

export type ReserveFlightTicket = z.infer<typeof ReserveFlightTicketSchema>;

export const TicketSchema = z.object({
  id: z.number(),
  departureFlightId: z.number(),
  departureFlightType: FlightTypeSchema,
  departureFlightPrice: z.number(),
  departureFlightSeatNumber: z.string(),
  departureFlightRecordLocator: z.string(),
  returnFlightId: z.number(),
  returnFlightType: FlightTypeSchema,
  returnFlightPrice: z.number(),
  returnFlightSeatNumber: z.string(),
  returnFlightRecordLocator: z.string(),
  passengerName: z.string(),
  passengerDOB: z.string(),
  passengerGender: z.string(),
  payment_status: z.boolean(),
});
export type Ticket = z.infer<typeof TicketSchema>;

export const MeSchema = z.object({
  id: z.number(),
  clerk_id: z.string(),
});
export type Me = z.infer<typeof MeSchema>;
