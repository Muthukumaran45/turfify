import React from "react";
import { Text } from "react-native";

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Inter_Bold } from "../../Constants/FontFamily";
import { COLORS } from "../../Constants/Colors";

const CustomHeaderText = (
  { style,
    size = 2.5,
    children,
    fontWight = "700",
    fontFamily = Inter_Bold || "",
    color = COLORS.textHeader,
    ML = 0,
    MR = 0,
    MT = 0,
    MB = 0,
    MX = 0,
    MY = 0
  }) => {
  return (
    <Text style={[
      {
        fontSize: hp(size),
        fontWeight: fontWight,
        color: color,
        fontFamily: fontFamily,
        marginLeft: hp(ML),
        marginRight: hp(MR),
        marginTop: hp(MT),
        marginBottom: hp(MB),
        marginVertical: hp(MY),
        marginHorizontal: hp(MX),
        
      },
      style]}>
      {children}
    </Text>
  );
};

export default CustomHeaderText;
