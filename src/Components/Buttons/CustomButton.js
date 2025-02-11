import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const CustomButton = ({ 
  title, 
  onPress, 
  size = 16, 
  className = "", 
  style = {}, 
  textStyle = {}, 
  disabled = false ,
  height,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className={`bg-green-600 px-4 items-center justify-center ${className} ${disabled ? "opacity-50" : ""}`}
      style={[style, {height: height || hp(5)}]}
    >
      <Text 
        className="text-white"
        style={[{ fontSize: RFValue(size) }, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({})
