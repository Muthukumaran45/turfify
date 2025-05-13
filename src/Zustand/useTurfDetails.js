import { create } from 'zustand';

const useTurfDetails = create((set) => ({
  turfDetails: null,
  setTurfDetails: (data) => set({ turfDetails: data }),
}));

export default useTurfDetails;
