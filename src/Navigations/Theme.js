import { useColorScheme } from 'react-native';
import { Colors } from '../Constants/Colors';

// Define light and dark themes
export const lightTheme = {
  dark: false,
  colors: {
    background: Colors.light_background,
    border: Colors.light_border,
    card: Colors.light_card,
    notification: Colors.noti_card_light,
    primary: Colors.themeColor,
    text: Colors.light_text,
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    background: Colors.dark_background,
    border: Colors.dark_border,
    card: Colors.dark_card,
    notification: Colors.noti_card_dark,
    primary: Colors.themeColor,
    text: Colors.dark_text,
  },
};

// Hook to get the current theme based on the system's color scheme
export const useCustomTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};

// Hook to get the current color scheme as a string
export const useCustomColorScheme = () => {
  const scheme = useColorScheme();
  return scheme;
};
