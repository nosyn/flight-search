import { create } from 'zustand';

export const useBookingCartStore = create((set) => ({
  departureFlight: null,
  returnFlight: null,
  setDepartureFlight: (flight: Flight) => set({ departureFlight: flight }),
  setReturnFlight: (flight: Flight) => set({ returnFlight: flight }),
  reset: () => set({ departureFlight: null }),
}));
