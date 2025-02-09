import React from "react";
import { Text } from "react-native";

// packages
import { RFValue } from "react-native-responsive-fontsize";

const CustomText = ({ className, style, size = 16, children, ...props }) => {
  return (
    <Text className={`text-neutral-700 dark:text-white ${className}`} style={[{ fontSize: RFValue(size) }, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
