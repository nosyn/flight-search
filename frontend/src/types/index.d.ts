type Flight = {
  id: number;
  airplaneName: string;
  airplaneIataTypeCode: string;
  airlineCode: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  economyPrice: number;
  businessPrice: number;
};

type FlightsScheduleType = 'departure' | 'return';
