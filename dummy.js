import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { HEADER_COLORS, WELCOME_SCREEN_COLORS } from '../theme/colors';

// colors

const WelcomeScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {

        setTimeout(() => navigation.navigate("HomeScreen"), 2500)
    }, [])

    return (
        <>
            <View className='flex-1 justify-center items-center' style={{ backgroundColor: "#0F0D0D" }}>

                {/* logo*/}
                <Animated.View className='rounded-full' >
                    <Image
                        source={require("../../assets/logo/logo.png")}
                        style={{ width: wp(40), height: hp(20) }}
                        className='rounded-full'
                    />
                </Animated.View>

                {/* title and punchline */}
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <Text className='text-white' style={{ fontWeight: "bold", fontSize: hp(7) }}>Help Hub</Text>
                    <Text className='text-white' style={{ fontWeight: "500", fontSize: hp(2) }}>Find Help, Fast and Easy</Text>
                </View>

            </View>
        </>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({

})