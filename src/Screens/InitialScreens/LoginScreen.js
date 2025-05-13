import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import GetLocation from "react-native-get-location";


// Components
import CustomInput from '../../Components/Inputs/CustomInput';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import { errorAlert, successAlert } from "../../Components/Toast/ToastServices";

// Utils
import { navigate, resetAndNavigate } from '../../Utils/NavigationUtil';
import { API_URL } from '../../Services/Api';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

// Zustand
import useFcmStore from '../../Zustand/useFcmStore';
import useLocationStore from '../../Zustand/useLocationStore';
import useUserStore from "../../Zustand/Zustand"
import { COLORS } from '../../Constants/Colors';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState(""); // Error state
    const [loading, setLoading] = useState(false); // Loading state


    // zustand
    const fcmToken = useFcmStore(state => state.fcmToken)


    const handleSkip = useCallback(() => resetAndNavigate("BottomNavigation"), []);


    // get latitude 
    const getCurrentLocation = async () => {
        try {
            const loc = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            });

            useLocationStore.getState().setLocation(loc.latitude, loc.longitude);


        } catch (error) {
            console.warn("Error fetching current location:", error);
        }
    };


    useEffect(() => {
        getCurrentLocation()
    }, [])

    const { latitude, longitude } = useLocationStore();

    console.log("login page latitude", latitude);
    console.log("login page longitude", longitude);

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


            const myMobileNumber = "9840247340"
            const payload = {
                mobileNumber: myMobileNumber,

                fcmToken: fcmToken,
                latitude: latitude,
                longitude: longitude
            };
            console.log("payload :", payload)

            const response = await axios.post(`${API_URL}/users/register`, payload);

            if (response) {
                console.log("login res :", response.data)

                useUserStore.getState().setToken(response.data.token);
                useUserStore.getState().setUser(response.data.userId);
                // navigate("OtpScreen")
                navigate("BottomNavigation")
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
                    <CustomText size={2.5}>Skip</CustomText>
                </TouchableOpacity>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <CustomHeaderText size={4.5}>Log in</CustomHeaderText>
                    <CustomText size={2.3}>Enter your phone number to continue</CustomText>
                </View>

                {/* phone number input field */}
                <CustomInput
                    isPhoneNumber
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={handleInputChange}
                    className="rounded-full bg-white border-0"
                    error={phoneError}
                    style={{ backgroundColor: "#fff" }}
                />

                {/* Referal code input field */}
                <CustomInput
                    style={{ backgroundColor: "#fff", marginTop: hp(2), paddingLeft: hp(2) }}
                    placeholder="REFERAL code"
                    className="rounded-full bg-white border-0"
                />

                {/* OTP Button */}
                <CustomButton
                    title="Send OTP"

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
        backgroundColor: COLORS.primary,
        borderRadius: hp(100)
    },
});
