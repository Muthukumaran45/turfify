// useBookingStore.js
import { create } from 'zustand'; // Make sure to import it like this

// Modified Zustand store to handle booking data
const useBookingStore = create((set) => ({
  // Turf details (already existing in your code)
  turfDetails: null,
  setTurfDetails: (details) => set({ turfDetails: details }),
 
  // New booking information
  bookingInfo: {
    selectedDate: null,
    selectedTurf: '',
    selectedTimeSlots: [],
    selectedTimeSlotDetails: [],
    totalPrice: 0,
    gstAmount: 0,
    finalAmount: 0,
    advanceAmount: 0,
  },
 
  // Method to update booking info
  setBookingInfo: (info) => set((state) => ({
    bookingInfo: {
      ...state.bookingInfo,
      ...info
    }
  })),
 
  // Method to clear booking info
  clearBookingInfo: () => set({
    bookingInfo: {
      selectedDate: null,
      selectedTurf: '',
      selectedTimeSlots: [],
      selectedTimeSlotDetails: [],
      totalPrice: 0,
      gstAmount: 0,
      finalAmount: 0,
      advanceAmount: 0,
    }
  }),
}));

export default useBookingStore;