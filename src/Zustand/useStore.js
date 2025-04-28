// Zustand/Zustand.js
import create from 'zustand';

const useStore = create((set) => ({
  user: {
    profileImage: null,
  },
  setProfileImage: (image) => set((state) => ({
    user: {
      ...state.user,
      profileImage: image,
    },
  })),
  clearUser: () => set({ user: { profileImage: null } }),
}));

export default useStore;
