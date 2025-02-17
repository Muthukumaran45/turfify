import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import Header from '../../Components/Headers/Header';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomInput from '../../Components/Inputs/CustomInput';
import { navigate } from '../../Utils/NavigationUtil';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';

const BookingInfoScreen = () => {

    const [scrollEnabled, setScrollEnabled] = useState(true);
    const translateX = useSharedValue(0);
    const BUTTON_WIDTH = wp(80) - 50; // Adjust for the slider width

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (event) => {
            runOnJS(setScrollEnabled)(false); // Disable scrolling
            if (event.x <= BUTTON_WIDTH * 0.4) {
                translateX.value = withSpring(event.x, { damping: 10, stiffness: 100 });
            }
        },
        onActive: (event) => {
            translateX.value = Math.min(Math.max(0, event.translationX), BUTTON_WIDTH);
        },
        onEnd: () => {
            if (translateX.value > BUTTON_WIDTH / 2) {
                runOnJS(navigate)('BottomNavigation');
            } else {
                translateX.value = withSpring(0, { damping: 10, stiffness: 100 });
            }
            runOnJS(setScrollEnabled)(true); // Re-enable scrolling
        },
    });


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: hp(2) }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={scrollEnabled}
            >

                {/* header */}
                <View>
                    <Header title={'Booking Info'} />
                </View>

                {/* Image */}
                <Image
                    source={{ uri: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg' }}
                    style={{ width: '100%', height: hp(25), borderRadius: wp(3), marginTop: hp(2) }}
                />

                {/* Booking Details */}
                <CustomText size={15} style={{ marginTop: hp(2), marginBottom: hp(1) }}>Visiting Date : <CustomText size={15} className={`font-medium`}>17-12-2024</CustomText></CustomText>

                {/* Box Info */}
                <View className='flex-row'>
                    <CustomButton
                        height={hp(4.5)}
                        className={` rounded-lg`}
                        title={'BOX - 1 (11v11)'}
                        style={{ backgroundColor: "#1E3932" }}
                    />
                </View>

                {/* Timing and Price */}
                <View style={{ backgroundColor: 'white', paddingHorizontal: hp(2), borderRadius: wp(3), marginTop: hp(2), paddingVertical: hp(1) }}>
                    <CustomText size={14} className={`font-medium`}>Check in - Check out</CustomText>
                    <View className={`flex-row items-center justify-between`}>
                        <CustomText>☀️ 10am - 11:30am</CustomText>
                        <CustomText className={`font-medium`}>₹ 550</CustomText>
                    </View>
                </View>

                {/* Price Breakdown */}
                <View style={{ marginTop: hp(2), marginRight: hp(2) }}>
                    <CustomText size={13} className={`text-right font-medium`}>₹ 950.00</CustomText>

                    <View className={`flex-row items-center justify-between`} style={{ marginVertical: hp(1) }}>
                        <CustomText size={14} className={`font-medium`}>GST Amount (10%)</CustomText>
                        <CustomText size={14} className={`font-medium`}> ₹ 95.00</CustomText>
                    </View>
                </View>

                <View className='bg-neutral-800 rounded-lg flex-row items-center justify-between' style={{ height: hp(5), marginTop: hp(1), paddingHorizontal: hp(2) }}>
                    <CustomText size={13} className={`font-medium text-white`}>Total Amount</CustomText>
                    <CustomText size={13} className={`font-medium text-white`}>1045.00</CustomText>
                </View>

                {/* Advance Payment Toggle */}
                <View className={`flex-row items-center justify-between border rounded-md`} style={{ marginTop: hp(2), height: hp(5), paddingHorizontal: hp(1.5) }}>
                    <CustomText size={13} className={`font-medium`}>Pay Advance Only</CustomText>
                    <CustomText size={13} className={`font-medium`}>₹ 550.00</CustomText>
                </View>

                {/* Coupon Section */}

                <View style={{ marginTop: hp(2), marginLeft: hp(.5) }}>
                    <CustomText className={'font-medium'}>Apply Coupon</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(1), }}>
                    <CustomInput placeholder='Enter Coupon code' className={`bg-white border-0 rounded-tl-md rounded-bl-md`} style={{ flex: 1, height: hp(6), width: wp(72) }} />
                    <CustomButton title={'APPLY'} height={hp(6)} className='bg-white rounded-tr-md rounded-br-md' textStyle={{ color: "#29BE26" }} />
                </View>

                {/* Payment Method */}
                <View className={`flex-row justify-between items-center border-t border-dashed`} style={{ paddingTop: hp(10), marginTop: hp(2) }}>
                    <View className={`flex-row  items-center`} >
                        <Image
                            source={require("../../Assets/gPay.png")}
                            style={{ width: wp(10), height: hp(5) }}
                            resizeMode='cover'
                            className={`bg-black rounded-md`}
                        />
                        <View className='ml-2'>
                            <CustomText size={12}>Pay using</CustomText>
                            <CustomText size={14} className={`font-medium`}>Google Pay</CustomText>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <CustomText>{"Change >"}</CustomText>
                    </TouchableOpacity>
                </View>


                {/* Pay Button */}
                <View
                    style={{
                        width: wp(91),
                        backgroundColor: 'green',
                        borderRadius: 50,
                        padding: hp(1),
                        position: 'relative',
                        height: 50,
                        justifyContent: 'center',
                        marginTop: hp(3)
                    }}
                >
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Animated.View
                            style={[
                                {
                                    position: 'absolute',
                                    left: 0,
                                    backgroundColor: 'black',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                animatedStyle,
                            ]}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>»</Text>
                        </Animated.View>
                    </PanGestureHandler>

                    <Text style={{ textAlign: 'center', color: 'white', fontSize: rf(2.5) }}>
                        Slide to Pay | ₹ 550
                    </Text>
                </View>


                <View style={{ marginBottom: hp(5) }} />
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default BookingInfoScreen;
