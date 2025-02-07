import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import Icon2 from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../Constants/Colors";
import { FONTS } from "../../Constants/Fonts";
import { useTheme } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { useCustomColorScheme } from "../../Navigation/Theme";


const CustomRadioInput = ({
  label,
  error,
  disabled,
  selected,
  disabledBackground,
  onSelect,
  options,
  ...props
}) => {
  const { colors } = useTheme();

  const theme = useCustomColorScheme();
  return (
    <View style={styles.inputMainContainer}>
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              { color: Colors.white, opacity: theme == "dark" ? 1 : 0.4 },
            ]}
          >
            {label}
          </Text>
        </View>
      )}

      <View style={styles.radioContainer}>
        {options?.map((text, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.radioitem}
              onPress={() => onSelect(text)}
            >
              <Icons
                name={
                  selected == text
                    ? "circle-slice-8"
                    : "checkbox-blank-circle-outline"
                }
                color={selected == text ? colors.primary : colors.text}
                size={RFValue(14)}
              />
              <Text >{text.toLocaleUpperCase()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Icon2
            size={RFValue(13)}
            name="information-circle"
            style={styles.errorText}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomRadioInput;

const styles = StyleSheet.create({
  radioitem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor:Colors.Button_color_Yellow
  },


  text:{
    color:Colors.white,
    fontSize:RFValue(13)

  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  inputMainContainer: {
    marginVertical: 8,
    // backgroundColor:"red"
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    gap: 5,
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(11),
    fontFamily: FONTS.Medium,
  },
  label: {
    fontSize: Platform.OS === "ios" ? RFValue(9) : RFValue(9),
    fontFamily: FONTS.Regular,
    color:Colors.white
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 2,
  },
});