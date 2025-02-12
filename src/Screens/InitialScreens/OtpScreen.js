import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from 'react-native-responsive-fontsize';

// Components
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';

// Utils
import { resetAndNavigate } from '../../Utils/NavigationUtil';

const OtpScreen = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputs = useRef([]);

    const handleChange = useCallback((text, index) => {
        const lastChar = text.slice(-1); 

        setOtp((prevOtp) => {
            const newOtp = [...prevOtp];
            newOtp[index] = lastChar;
            return newOtp;
        });

        
        if (lastChar && index < otp.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    }, []);

    const handleBackspace = useCallback((text, index) => {
        if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <CustomText className="font-medium" size={25}>OTP Verification Code</CustomText>
                    <CustomText size={12} className="text-neutral-400 my-2">
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

                {/* Resend Code Section */}
                <View style={styles.resendContainer}>
                    <CustomText className="text-neutral-400">Didn't receive a code?</CustomText>
                    <TouchableOpacity>
                        <CustomText className="text-red-400 ml-2">Resend code</CustomText>
                    </TouchableOpacity>
                </View>

                {/* Confirm Button */}
                <CustomButton
                    title="Confirm"
                    size={20}
                    className="bg-primary rounded-full"
                    style={styles.confirmBtn}
                    onPress={() => resetAndNavigate('BottomNavigation')}
                    height={hp(6)}
                />
            </View>
        </SafeAreaView>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: hp(3),
        paddingTop: hp(7),
    },
    titleContainer: {
        marginVertical: hp(8),
        marginTop: hp(12),
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
        marginRight: hp(2),
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(3),
    },
    confirmBtn: {
        marginTop: hp(6),
    },
});
