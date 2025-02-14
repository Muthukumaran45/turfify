import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';
import MMKVStorage from 'react-native-mmkv-storage';

// Components
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import { successAlert, errorAlert } from "../../Components/Toast/ToastServices";

// Utils
import { resetAndNavigate } from '../../Utils/NavigationUtil';

const MMKV = new MMKVStorage.Loader().initialize();

const OtpScreen = () => {
    const route = useRoute();
    const phoneNumber = route.params?.phoneNumber || "Unknown";
    const sentOtp = route.params?.otp || "";

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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

        setError(""); // Clear error on input change
    }, []);

    const handleBackspace = useCallback((text, index) => {
        if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        const enteredOtp = otp.join(""); // Convert array to string
    
        if (enteredOtp.length < 4) {
            setError("Please enter the full OTP.");
            setLoading(false);
            return;
        }
    
        if (enteredOtp !== sentOtp.toString()) {
            setError("Invalid OTP. Please try again.");
            errorAlert({ message: "Incorrect OTP. Try again!" });
            setLoading(false);
            return;
        }
    
        try {
            MMKV.setString('userPhoneNumber', phoneNumber);
            successAlert({ message: "OTP verified! Welcome to TURFIFY" });
            resetAndNavigate('BottomNavigation');
        } catch (error) {
            console.error("Error storing user data:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <CustomText className="font-medium" size={25}>OTP Verification Code</CustomText>
                    <CustomText size={12} className="text-neutral-400 my-2">
                        We have sent the code to +91 {phoneNumber}
                    </CustomText>
                </View>

                {/* OTP Input Fields */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputs.current[index] = el)}
                            style={[styles.otpInput, error ? styles.errorBorder : null]}
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

                {/* Error Message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
                    onPress={handleLogin}
                    height={hp(6)}
                    loading={loading}
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
    errorBorder: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: rf(12),
        marginTop: hp(1),
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
