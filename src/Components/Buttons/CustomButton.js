import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { Inter } from "../../Constants/FontFamily";

const CustomButton = ({ 
  title, 
  onPress, 
  size = 16, 
  className = "", 
  style = {}, 
  textStyle = {}, 
  disabled = false,
  loading = false,
  height,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={`bg-primary px-4 items-center justify-center ${className} `}
      style={[style, { height: height || hp(5) }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text 
          className="text-white"
          style={[{ fontSize: RFValue(size), fontFamily: Inter }, textStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
