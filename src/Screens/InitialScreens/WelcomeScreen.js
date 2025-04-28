import { StyleSheet } from "react-native";
import React, { useEffect, useCallback } from "react";

// Packages
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MMKVStorage from 'react-native-mmkv-storage';

// Utils
import { resetAndNavigate } from "../../Utils/NavigationUtil";
import Zustand from '../../Zustand/Zustand'
const MMKV = new MMKVStorage.Loader().initialize();

const WelcomeScreen = () => {
    const opacity = useSharedValue(0);
    const { user } = Zustand()

    console.log("userData ", user)

    const navigateToNextScreen = () => {

        if (user) {
            resetAndNavigate("BottomNavigation");
        } else {
            resetAndNavigate("OnboardingScreen");
        }
    };

    useEffect(() => {
        opacity.value = withDelay(
            300,
            withTiming(1, { duration: 1000, easing: Easing.ease })
        );

        const timer = setTimeout(navigateToNextScreen, 1500);
        return () => clearTimeout(timer);
    }, [navigateToNextScreen]);

    const fadeInStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

    return (
        <LinearGradient
            colors={["#16351D", "#0F0D0D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0.2, 1]}
            style={styles.gradientBackground}
        >
            <Animated.Image source={require("../../Assets/logo.png")} style={[styles.logo, fadeInStyle]} resizeMode="contain" />
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
    logo: {
        width: wp(75),
        height: hp(20),
    },
});
