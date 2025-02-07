import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../Constants/Colors";
import { FONTS } from "../../Constants/Fonts";
import { useTheme } from "@react-navigation/native";
import { useCustomColorScheme } from "../../Navigation/Theme";

const CustomInput = ({
  label,
  iconName,
  error,
  rightIcon,
  leftIcon,
  disabled,
  disabledBackground,
  password,
  rightText,
  textTop,
  required,
  containerStyle,
  textInputStyle,
  placeholderText,
  numeric,
  onFocus = () => { },
  onSubmitEditing = () => { },
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [hideEyeIcon, setHideEyeIcon] = useState(true);
  const theme = useCustomColorScheme();

  return (
    <View style={styles.inputMainContainer}>
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              { color: colors.text, opacity: theme == "dark" ? 1 : 0.4 },
            ]}
          >
            {label} {required && "*"}
          </Text>
          {rightText}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? Colors.errorColor
              : isFocused
                ? Colors.profit
                : Colors.dark_border,
            borderWidth: isFocused ? 2 : 1,
          },
          containerStyle,
        ]}
      >
        {leftIcon}
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={theme == "dark" ? "#dadbde" : "#cfd0d3"}
          style={[
            styles.textInput,
            {
              textAlignVertical: textTop ? "top" : "center",
              color: Colors.black,
            },
            textInputStyle,
          ]}
          secureTextEntry={password ? hideEyeIcon : false}
          autoCorrect={false}
          keyboardType={numeric ? "phone-pad" : "default"}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          maxLength={256}
          editable={!disabled}
          onBlur={() => {
            setIsFocused(false);
          }}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={true}
          {...props}
        />
        {rightIcon}
        {password && (
          <Icon
            size={RFValue(24)}
            onPress={() => {
              setHideEyeIcon(!hideEyeIcon);
            }}
            name={!hideEyeIcon ? "eye" : "eye-off"}
            style={styles.password}
            color={Colors.black}
          />
        )}
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

export default CustomInput;

const styles = StyleSheet.create({
  inputMainContainer: {
    marginVertical: 8,
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
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    justifyContent: "space-between",
    borderRadius: 5,
  },
  textInput: {
    fontFamily: FONTS.Regular,
    fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(13),
    alignItems: "flex-start",
    height: 60,
    width: "82%",
    paddingVertical: 5,
    marginLeft: "3%",
  },
  password: {
    right: 10,
    opacity: 0.8,
  },
});
