import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";

const WelcomeScreen = () => {
    const navigation = useNavigation();

    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, {
            duration: 1500,
            easing: Easing.ease,
        });

        setTimeout(() => navigation.replace("OnboardingScreen"), 2500);
    }, []);

    const fadeInStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    return (
        <LinearGradient
            colors={["#16351D", "#0F0D0D"]} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 0.5, y: 1 }} 
            locations={[0.2, 1]} 
            style={styles.gradientBackground}
        >
            {/* Animated Logo */}
            <Animated.View style={fadeInStyle}>
                <Image
                    source={require("../../Assets/logo.png")}
                    style={{ width: wp(75), height: hp(20) }}
                    resizeMode='contain'
                />
            </Animated.View>
        </LinearGradient>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
