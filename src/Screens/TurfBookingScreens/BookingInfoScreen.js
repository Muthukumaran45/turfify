import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import Header from '../../Components/Headers/Header';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomInput from '../../Components/Inputs/CustomInput';
import { navigate } from '../../Utils/NavigationUtil';
import SwipeButton from 'rn-swipe-button';
import { COLORS } from '../../Constants/Colors';

// components
import ImageSliderNormal from "../../Components/Sliders/ImageSliderNormal";

// zustand
import useTurfDetails from "../../Zustand/useTurfDetails";
import useBookingStore from "../../Zustand/useBookingStore"; // Import our new store

const BookingInfoScreen = () => {
    // Get turf data from store
    const turfData = useTurfDetails((state) => state.turfDetails);
    
    // Get booking info from our new store
    const bookingInfo = useBookingStore((state) => state.bookingInfo);
    
    // State for coupon
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);
    
    // Calculate final payment amount
    const finalPaymentAmount = bookingInfo.advanceAmount - couponDiscount;
    
    // Swipe button completion callback
    const onSwipeSuccess = () => {
        // Here you would typically make an API call to process payment
        // After successful payment:
        navigate('BottomNavigation');
    };

    // Custom thumb icon component
    const renderThumbIcon = () => {
        return (
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.primary, fontSize: hp(3) }}>»</Text>
            </View>
        );
    };

    // Apply coupon handler
    const applyCoupon = () => {
        // Here you would typically validate the coupon with an API call
        // For demo, let's assume a 10% discount if coupon code is "SAVE10"
        if (couponCode === "SAVE10") {
            const discount = Math.round(finalPaymentAmount * 0.1);
            setCouponDiscount(discount);
        }
    };

    const defaultImage = "https://via.placeholder.com/400";
    const imagesToDisplay = turfData?.images?.length > 0 ? turfData.images : [defaultImage];

    // Get pitch details
    const selectedPitch = turfData?.pitches?.find(pitch => pitch.name === bookingInfo.selectedTurf);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: hp(2) }}
            showsVerticalScrollIndicator={false}
        >
            {/* header */}
            <View>
                <Header title={'Booking Info'} />
            </View>

            {/* Image */}
            <ImageSliderNormal images={imagesToDisplay} />

            {/* Booking Details */}
            <CustomText MB={1} MT={2}>Visiting Date : <CustomText fontWight='700'>{bookingInfo.selectedDate}</CustomText></CustomText>

            {/* Box Info */}
            <View style={{ flexDirection: "row" }}>
                <CustomButton
                    height={hp(4.5)}
                    className={` rounded-lg`}
                    title={bookingInfo.selectedTurf}
                    style={{ backgroundColor: "#1E3932" }}
                />
            </View>

            {/* Timing and Price */}
            {bookingInfo.selectedTimeSlots.map((timeSlot, index) => (
                <View key={index} style={{ backgroundColor: 'white', paddingHorizontal: hp(2), borderRadius: wp(3), marginTop: hp(2), paddingVertical: hp(1) }}>
                    <CustomText fontWight='700'>Check in - Check out</CustomText>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <CustomText>☀️ {timeSlot}</CustomText>
                        <CustomText fontWight='700'>₹ {bookingInfo.selectedTimeSlotDetails[index]?.pricing?.weekdays?.discountPrice || 'N/A'}</CustomText>
                    </View>
                </View>
            ))}

            {/* Price Breakdown */}
            <View style={{ marginTop: hp(2), marginRight: hp(2) }}>
                <CustomText fontWight='700' style={{ textAlign: "right" }}>₹ {bookingInfo.totalPrice?.toFixed(2)}</CustomText>

                <View style={{ marginVertical: hp(1), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <CustomText fontWight='700'>GST Amount (10%)</CustomText>
                    <CustomText fontWight='700'>₹ {bookingInfo.gstAmount?.toFixed(2)}</CustomText>
                </View>
            </View>

            <View style={{ height: hp(5), marginTop: hp(1), paddingHorizontal: hp(2), flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "black", borderRadius: hp(1) }}>
                <CustomText color='#fff' fontWight='700'>Total Amount</CustomText>
                <CustomText color='#fff' fontWight='700'>₹ {bookingInfo.finalAmount?.toFixed(2)}</CustomText>
            </View>

            {/* Advance Payment Toggle */}
            <View className={` border rounded-md`} style={{ marginTop: hp(2), height: hp(5), paddingHorizontal: hp(1.5), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <CustomText fontWight='700'>Pay Advance Only</CustomText>
                <CustomText fontWight='700'>₹ {bookingInfo.advanceAmount?.toFixed(2)}</CustomText>
            </View>

            {/* Coupon Section */}
            <View style={{ marginTop: hp(2), marginLeft: hp(.5) }}>
                <CustomText className={'font-medium'}>Apply Coupon</CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(1), }}>
                <CustomInput 
                    placeholder='Enter Coupon code' 
                    className={`bg-white border-0 rounded-tl-md rounded-bl-md`} 
                    style={{ flex: 1, height: hp(6), width: wp(72) }} 
                    value={couponCode}
                    onChangeText={setCouponCode}
                />
                <CustomButton 
                    title={'APPLY'}
                    height={hp(6)} 
                    className='bg-white rounded-tr-md rounded-br-md' 
                    textStyle={{ color: "#29BE26", }}
                    onPress={applyCoupon}
                />
            </View>
            
            {couponDiscount > 0 && (
                <View style={{ marginTop: hp(1), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <CustomText fontWight='700'>Coupon Discount</CustomText>
                    <CustomText fontWight='700' style={{ color: 'green' }}>- ₹ {couponDiscount.toFixed(2)}</CustomText>
                </View>
            )}

            {/* Payment Method */}
            <View className={` border-t border-dashed`} style={{ paddingTop: hp(10), marginTop: hp(2), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={require("../../Assets/gPay.png")}
                        style={{ width: wp(10), height: hp(5) }}
                        resizeMode='cover'
                        className={`bg-black rounded-md`}
                    />
                    <View className='ml-2'>
                        <CustomText>Pay using</CustomText>
                        <CustomText>Google Pay</CustomText>
                    </View>
                </View>

                <TouchableOpacity>
                    <CustomText>{"Change >"}</CustomText>
                </TouchableOpacity>
            </View>

            {/* New Swipe Button */}
            <View style={{ marginTop: hp(3), marginBottom: hp(5) }}>
                <SwipeButton
                    thumbIconComponent={renderThumbIcon}
                    title={`Slide to Pay | ₹ ${finalPaymentAmount.toFixed(2)}`}
                    onSwipeSuccess={onSwipeSuccess}
                    railBackgroundColor="green"
                    railFillBackgroundColor={"#FFF"}
                    railBorderColor="green"
                    thumbIconBorderColor="black"
                    titleColor="white"
                    titleFontSize={rf(2.5)}
                    height={50}
                    width={wp(91)}
                    railStyles={{
                        borderRadius: hp(50),
                    }}
                    thumbIconStyles={{
                        borderRadius: hp(50),
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default BookingInfoScreen;