// storage.js
import MMKVStorage from 'react-native-mmkv-storage';

const storage = new MMKVStorage.Loader().initialize(); // Initializes MMKVStorage

export default storage;
