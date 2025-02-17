import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

// Components
import CustomInput from '../../Components/Inputs/CustomInput';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import { errorAlert, successAlert } from "../../Components/Toast/ToastServices";

// Utils
import { navigate, resetAndNavigate } from '../../Utils/NavigationUtil';
import { API_URL } from '../../Services/Api';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState(""); // Error state
    const [loading, setLoading] = useState(false); // Loading state


    const handleSkip = useCallback(() => resetAndNavigate("BottomNavigation"), []);


    const handleInputChange = (text) => {
        setPhoneNumber(text);
        if (phoneError) setPhoneError("");
    };

    const handleSendOtp = async () => {
        if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneError("Please enter a valid 10-digit phone number.");
            return;
        }

        setLoading(true);
        try {
            const otp = Math.floor(1000 + Math.random() * 9000);
            console.log("Generated OTP:", otp);

            const payload = {
                username: "heKK",
                mobileNumber: phoneNumber,
            };
            const response = await axios.post(`${API_URL}/users/create`, payload);

            const data = response.data.user
            console.log("login data", data)

            if (response.status === 201) {
                successAlert({ message: "OTP sent successfully!" });
                navigate("OtpScreen", { data, otp });
                setPhoneError("");
            } else {
                errorAlert({ message: "Something went wrong" });
            }
        } catch (error) {
            console.log("Error sending login data:", error);
            errorAlert({ message: error.message });
        } finally {
            setLoading(false);
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Skip Button */}
                <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
                    <CustomText>Skip</CustomText>
                </TouchableOpacity>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <CustomHeaderText size={3.5}>Log in</CustomHeaderText>
                    <CustomText>Enter your phone number to continue</CustomText>
                </View>

                {/* Input Field */}
                <CustomInput
                    isPhoneNumber
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={handleInputChange}
                    className="rounded-full bg-white border-0"
                    error={phoneError}
                />

                {/* OTP Button */}
                <CustomButton
                    title="Send OTP"
                    className="bg-primary rounded-full"
                    style={styles.otpBtn}
                    size={20}
                    onPress={handleSendOtp}
                    height={hp(6)}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: hp(3),
        paddingTop: hp(7),
    },
    skipBtn: {
        alignSelf: 'flex-end',
    },
    titleContainer: {
        marginVertical: hp(8),
        marginTop: hp(10),
    },
    otpBtn: {
        marginTop: hp(4),
    },
});
