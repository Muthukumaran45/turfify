import { create } from 'zustand';

const useNearTurfStore = create((set) => ({
  latitude: null,
  longitude: null,
  setNearByTurf: (data) => set([data]),
}));

export default useNearTurfStore;
