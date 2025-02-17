import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";

// Packages
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Icons
import { Eye, EyeOff } from "lucide-react-native";
import { Nunito_Bold, Nunito_Regular } from "../../Constants/FontFamily";

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
  maxLength,
  error, // 🔴 New error prop
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  return (
    <View style={{ }}>
      <View
        className={`flex-row items-center border px-3 ${className} ${error ? 'border-red-500' : 'border-gray-300'}`} // 🔴 Change border color if error exists
        style={[{ height }, style]} 
      >
        {/* Left Icon or Country Code */}
        {isPhoneNumber ? (
          <View className="pr-2">
            <TextInput
              value={countryCode}
              editable={false}
              style={{ fontSize: RFValue(16), fontFamily: Nunito_Bold }}
              className="text-neutral-600"
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
          maxLength={maxLength}
          style={[{ fontSize: RFValue(16), flex: 1, fontFamily: Nunito_Regular }, inputStyle]}
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

      {/* 🔴 Show Error Message */}
      {error && <Text style={{ color: "red", marginTop: 5, fontSize: RFValue(12), fontFamily: Nunito_Regular }}>{error}</Text>}
    </View>
  );
};

export default CustomInput;
