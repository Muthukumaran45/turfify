import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";

// Packages
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Icons
import { Eye, EyeOff } from "lucide-react-native";

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style = {},
  inputStyle = {},
  className = "",
  iconSize = 22,
  isPhoneNumber = false,
  countryCode = "+91",
  height = hp(7), 
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  return (
    <View
      className={`flex-row items-center border border-gray-300 rounded-lg px-3 ${className}`}
      style={[{ height }, style]} 
    >
      {/* Left Icon or Country Code */}
      {isPhoneNumber ? (
        <View className="pr-2">
          <TextInput
            value={countryCode}
            editable={false}
            style={{ fontSize: RFValue(16), fontWeight: "bold" }}
          />
        </View>
      ) : (
        leftIcon && (
          <TouchableOpacity onPress={onLeftPress} className="pr-2">
            {leftIcon}
          </TouchableOpacity>
        )
      )}

      {/* Input Field */}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordVisible}
        keyboardType={keyboardType}
        style={[{ fontSize: RFValue(16), flex: 1 }, inputStyle]}
        {...props}
      />

      {/* Right Icon (Password Toggle or Custom) */}
      {secureTextEntry ? (
        <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} className="pl-2">
          {isPasswordVisible ? <EyeOff size={iconSize} /> : <Eye size={iconSize} />}
        </TouchableOpacity>
      ) : (
        rightIcon && (
          <TouchableOpacity onPress={onRightPress} className="pl-2">
            {rightIcon}
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default CustomInput;
