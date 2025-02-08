import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const CustomButton = ({ 
  title, 
  onPress, 
  size = 16, 
  className = "", 
  style = {}, 
  textStyle = {}, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className={`bg-green-600 dark:bg-green-400 px-4 py-3 rounded-lg ${className} ${disabled ? "opacity-50" : ""}`}
      style={style}
    >
      <Text 
        className="text-white text-center"
        style={[{ fontSize: RFValue(size) }, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
