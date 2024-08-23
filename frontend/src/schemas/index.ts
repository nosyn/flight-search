import { z } from 'zod';

export const AirportSchema = z.object({
  iataCode: z.string().length(3),
  name: z.string(),
});
export type Airport = z.infer<typeof AirportSchema>;

export const AirportsSchema = AirportSchema.array();
export type Airports = z.infer<typeof AirportsSchema>;

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

export const FlightsSchema = FlightSchema.array();
export type Flights = z.infer<typeof FlightsSchema>;

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
  clerkId: z.string(),
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
});
export type Ticket = z.infer<typeof TicketSchema>;

export const MeSchema = z.object({
  id: z.number(),
  clerk_id: z.string(),
});
export type Me = z.infer<typeof MeSchema>;

export const PaymentIntentSchema = z.object({
  clientSecret: z.string(),
  amount: z.number({
    coerce: true,
  }),
});
export type PaymentIntent = z.infer<typeof PaymentIntentSchema>;

export const FlightsScheduleSchema = z.enum(['departure', 'return']);
export type FlightsSchedule = z.infer<typeof FlightsScheduleSchema>;
