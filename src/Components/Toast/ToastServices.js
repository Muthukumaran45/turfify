

import Toast from "react-native-toast-message";
import { Text, View, Dimensions } from "react-native";
import { truncateText } from "../../Utils/Scaling";
import { COLORS } from "../../Constants/Colors";

// Get screen width
const SCREEN_WIDTH = Dimensions.get("window").width;

// Custom Toast UI (without titles, just background color)
const toastConfig = {
  success: ({ text2 }) => (
    <View
      style={{
        width: SCREEN_WIDTH * 0.9,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        alignSelf: "center",
      }}
    >
      <Text style={{ fontSize: 18, color: "#fff" }}>{text2}</Text>
    </View>
  ),
  error: ({ text2 }) => (
    <View
      style={{
        width: SCREEN_WIDTH * 0.9,
        padding: 15,
        backgroundColor: "#dc3545",
        borderRadius: 10,
        alignSelf: "center",
      }}
    >
      <Text style={{ fontSize: 18, color: "#fff" }}>{text2}</Text>
    </View>
  ),
  info: ({ text2 }) => (
    <View
      style={{
        width: SCREEN_WIDTH * 0.9,
        padding: 15,
        backgroundColor: "#17a2b8",
        borderRadius: 10,
        alignSelf: "center",
      }}
    >
      <Text style={{ fontSize: 18, color: "#fff" }}>{text2}</Text>
    </View>
  ),
};

// Success Toast
const successAlert = ({ message }) => {
  Toast.show({
    type: "success",
    text2: truncateText(message, 200), // Apply truncation only here
    position: "top",
  });
};

// Error Toast
const errorAlert = ({ message }) => {
  Toast.show({
    type: "error",
    text2: truncateText(message, 200),
    position: "top",
  });
};

// Info Toast
const infoAlert = ({ message }) => {
  Toast.show({
    type: "info",
    text2: truncateText(message, 200),
    position: "top",
  });
};

// Custom Toast Component (with config)
const CustomToast = () => <Toast config={toastConfig} />;

export { successAlert, errorAlert, infoAlert, CustomToast };
