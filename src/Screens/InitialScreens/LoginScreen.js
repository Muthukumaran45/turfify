import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Components
import CustomInput from '../../Components/Inputs/CustomInput';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';

// Utils
import { navigate, resetAndNavigate } from '../../Utils/NavigationUtil';

const LoginScreen = () => {
    const handleSkip = useCallback(() => resetAndNavigate("BottomNavigation"), []);
    const handleSendOtp = useCallback(() => navigate('OtpScreen'), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Skip Button */}
                <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
                    <CustomText>Skip</CustomText>
                </TouchableOpacity>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <CustomText className="font-medium" size={25}>Log in</CustomText>
                    <CustomText>Dorem ipsum dolor sit amet</CustomText>
                </View>

                {/* Input Field */}
                <CustomInput
                    isPhoneNumber
                    keyboardType="phone-pad"
                    placeholder=""
                    maxLength={10}
                    className="rounded-full bg-white border-0"
                />

                {/* OTP Button */}
                <CustomButton
                    title="Send OTP"
                    className="bg-primary rounded-full"
                    style={styles.otpBtn}
                    size={20}
                    onPress={handleSendOtp}
                    height={hp(6)}
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
