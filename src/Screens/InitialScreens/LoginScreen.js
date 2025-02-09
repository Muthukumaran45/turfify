import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// components
import CustomInput from '../../Components/Inputs/CustomInput'
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';

const LoginScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }} className='dark:bg-black'>
            <View style={{ padding: hp(3), paddingTop: hp(7) }}>

                {/* skip btn */}
                <TouchableOpacity onPress={() => navigation.replace("BottomNavigation")} className='flex-row justify-end'>
                    <CustomText>Skip</CustomText>
                </TouchableOpacity>

                <View style={{ marginVertical: hp(8), marginTop: hp(10) }}>
                    <CustomText className={`font-medium`} size={25}>Log in</CustomText>
                    <CustomText>Dorem ipsum dolor sit amet</CustomText>
                </View>

                <CustomInput
                    isPhoneNumber
                    keyboardType="phone-pad"
                    placeholder=""
                    maxLength={10}
                    className='rounded-full bg-white border-0'
                />

                <CustomButton
                    title={"Send OTP"}
                    className='bg-primary rounded-full'
                    style={styles.otpBtn}
                    size={20}
                    onPress={() => navigation.replace('OtpScreen')}
                />
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    otpBtn: {
        marginTop: hp(6)
    }
}) 