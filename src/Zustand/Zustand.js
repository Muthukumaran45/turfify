import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { navigate, resetAndNavigate } from '../Utils/NavigationUtil';

// Initialize MMKV storage
const mmkv = new MMKVLoader().initialize(); // This initializes MMKVStorage

// Define the Zustand store with immer middleware
const User = immer((set, get) => ({

    user: null,

    //  user access the app set logic
    setUser: (user) => set((state) => { state.user = user }),
    clearUser: () => set((state) => { state.user = null, navigate("LoginScreen") }),

}));

// Define the storage object using MMKVStorage
const storage = {
    getItem: async (name) => {
        const value = await mmkv.getString(name);
        return value ? JSON.parse(value) : null;
    },
    setItem: async (name, value) => {
        await mmkv.setString(name, JSON.stringify(value));
    },
    removeItem: async (name) => {
        await mmkv.removeItem(name);
    },
};

// Create the Zustand store with devtools and persist middleware
const setUser = create(devtools(
    persist(User, {
        name: "Home_tech",
        storage,
    })
));

export default setUser;
