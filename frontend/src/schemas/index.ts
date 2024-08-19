import { z } from 'zod';

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

export const BuyingFlightTicketSchema = z.object({
  departureFlightId: z.number(),
  departureFlightType: z.string(),
  returnFlightId: z.number(),
  returnFlightType: z.string(),
  passengerName: z.string(),
  passengerDOB: z.date(),
  passengerGender: z.string(),
});
export type BuyingFlightTicket = z.infer<typeof BuyingFlightTicketSchema>;
