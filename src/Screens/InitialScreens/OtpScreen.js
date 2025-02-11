import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { RFValue as rf } from "react-native-responsive-fontsize";

// components
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';

const OtpScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        if (text.length > 1) {
            text = text[text.length - 1]; // Take only the last digit
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move focus to the next input
        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (text, index) => {
        if (!text && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ padding: hp(3), paddingTop: hp(7) }}>
                <View style={{ marginVertical: hp(8), marginTop: hp(12) }}>
                    <CustomText className={`font-medium`} size={25}>OTP Verification Code</CustomText>
                    <CustomText size={12} className={`text-neutral-400 my-2`}>
                        We have sent the code to 91+ 9840247340
                    </CustomText>
                </View>

                {/* OTP Input Fields */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputs.current[index] = el)}
                            style={styles.otpInput}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={({ nativeEvent }) =>
                                nativeEvent.key === 'Backspace' && handleBackspace(digit, index)
                            }
                        />
                    ))}
                </View>

                <View className={`flex-row`} style={{ marginVertical: hp(3) }}>
                    <CustomText className={`text-neutral-400`}>Didn't receive a code?</CustomText>
                    <TouchableOpacity style={{ marginLeft: hp(1) }}>
                        <Text className={`text-red-400`}>Resend code</Text>
                    </TouchableOpacity>
                </View>

                <CustomButton
                    title={"Confirm"}
                    size={20}
                    className='bg-primary rounded-full'
                    style={styles.confirmBtn}
                    onPress={() => navigation.replace('BottomNavigation')}
                    height={hp(6)}
                />
            </View>
        </SafeAreaView>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    confirmBtn: {
        marginTop: hp(6),
    },
    otpContainer: {
        flexDirection: 'row',
    },
    otpInput: {
        width: wp(15),
        height: hp(7),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: rf(20),
        marginRight: hp(2)
    },
});
