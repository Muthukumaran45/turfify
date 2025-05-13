import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { Inter } from "../../Constants/FontFamily";
import CustomText from "../Texts/CustomText";
import { COLORS } from "../../Constants/Colors";

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
  color,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={` ${className} `}
      style={[style, { height: height || hp(5), backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", paddingHorizontal: hp(2),  }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <CustomText  style={[{ fontSize: RFValue(size), fontFamily: Inter, color: color || "#fff"}, textStyle]}>
        {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
