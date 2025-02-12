import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

// packages
import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue, RFPercentage as rf } from "react-native-responsive-fontsize";
import { MapPin, Star, Heart, Share2 } from "lucide-react-native";

// components
import Header from "../../Components/Headers/Header";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomText from "../../Components/Texts/CustomText";

// Mock image URL (replace with actual image source)
const turfImage = "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg";

const TurfDetailsScreen = () => {
    const navigation = useNavigation();

    const data = [
        { hours: "1HR", discount: "50" },
        { hours: "2HR", discount: "100" },
        { hours: "4HR", discount: "150" },
        { hours: "5HR", discount: "200" },
        { hours: "6HR", discount: "250" },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* header */}
            <View>
                <Header title={'Turf Details'} />
            </View>

            {/* Header Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: turfImage }} style={styles.turfImage} />
                <View className={`flex-row absolute right-5 mt-3`}>
                    <TouchableOpacity style={styles.backButton}>
                        <Share2 color="white" size={RFValue(18)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favoriteButton}>
                        <Heart color="white" size={RFValue(18)} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Turf Info */}
            <View style={styles.infoContainer}>
                <View className={`flex-row justify-between`} >
                    <CustomText size={20} className={`font-medium`} style={{ marginBottom: hp(.5) }}>Strikers Academy </CustomText>
                    <View className={`flex-row items-center`} style={{ marginTop: hp(0.5) }}>
                        <Star size={16} color="#FFD700" />
                        <CustomText size={13}> (4.8)</CustomText>
                        <View style={styles.middleBorder} />
                        <CustomText size={13} >Distance</CustomText>
                        <CustomText size={13}> (1.5km)</CustomText>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <MapPin color="gray" size={RFValue(14)} />
                    <CustomText size={13} style={{ paddingLeft: hp(1) }}>Purasaiwakkam, Chennai</CustomText>
                    <CustomText size={13}> (1.5km)</CustomText>
                </View>

                {/* Pricing */}
                <CustomText size={13} style={{ paddingLeft: hp(.8) }}>₹ Price Start From 800/hr</CustomText>

                {/* Price Details */}
                <View style={styles.priceContainer}>
                    {/* Table Header */}
                    <View style={styles.row}>
                        <View style={styles.headerCell}>
                            <Text style={styles.headerText}>Hours</Text>
                        </View>
                        {data.map((item, index) => (
                            <View key={index} style={styles.cell}>
                                <Text style={styles.headerText}>{item.hours}</Text>
                            </View>
                        ))}
                        <CustomText size={12} style={{ marginLeft: hp(1) }}>Half Day</CustomText>
                    </View>

                    {/* Discount Row */}
                    <View style={styles.row}>
                        <View style={styles.headerCell}>
                            <Text style={styles.headerText} >Discount</Text>
                        </View>

                        {data.map((item, index) => (
                            <View key={index} style={[styles.cell,]}>
                                <Text style={styles.discountText}>{item.discount}</Text>
                            </View>
                        ))}

                        <CustomText size={12} style={{ marginLeft: hp(2.8) }}>50</CustomText>
                    </View>
                </View>


                {/* Amenities */}
                <View>
                    <CustomText size={20} className={`font-medium`} style={{ marginVertical: hp(1), marginTop: hp(3) }}>Amenities</CustomText>
                    <View style={styles.amenitiesContainer}>
                        {["Washroom", "Changing Room", "Drinking Water", "Cafe", "Parking", "Prayer Room"].map((item, index) => (
                            <View key={index} style={{ marginRight: hp(1.5), marginBottom: hp(1) }}>
                                <CustomText size={13} className={`rounded-md p-2 text-neutral-600`} style={{ backgroundColor: "#e0ffe0" }}>{item}</CustomText>
                            </View>
                        ))}
                    </View>
                </View>


                {/* Bulk Enquiry */}
                <View>
                    <CustomButton
                        height={hp(6)}
                        title={'Bulk Enquiry'}
                        className={`bg-white rounded-md border border-neutral-400`}
                        textStyle={{ color: "#4a4a4a" }} />
                </View>

                {/* About Us */}
                <CustomText size={20} className={`font-medium`} style={{ marginVertical: hp(1), marginTop: hp(2) }}>About Us</CustomText>
                <CustomText size={13}>• 500mm grass</CustomText>
                <CustomText size={13}>• Sound Setup for commentary and music</CustomText>
                <CustomText size={13}>• Tournament and event friendly</CustomText>

                {/* Available Sports */}
                <CustomText size={20} className={`font-medium`} style={{ marginVertical: hp(1), marginTop: hp(2) }}>Available Sports</CustomText>
                <View className={`flex-row`}>
                    <Text style={styles.sportIcon}>⚽</Text>
                    <Text style={styles.sportIcon}>🏏</Text>
                </View>

                {/* Rating & Reviews */}
                <CustomText size={20} className={`font-medium`} style={{ marginVertical: hp(1), marginTop: hp(2) }}>Rating & Review</CustomText>
                <View className={`flex-row items-center`}>
                    <CustomText size={20} className={`font-medium`}>4.0</CustomText>
                    <CustomText className={'pl-2'} size={13}>Based on 20 reviews</CustomText>
                </View>

                {/* Review */}
                <View className={`flex-row my-4`}>
                    <View className={`bg-neutral-300 rounded-lg`} style={{ width: wp(15), height: hp(7) }} />

                    <View className={`flex-col`} style={{ paddingLeft: hp(2) }}>
                        <View className={`flex-row`}>
                            <CustomText size={20} className={`font-medium text-neutral-400`}>Martin Luather</CustomText>
                            <CustomText className={`mt-1`} size={13} style={{ paddingLeft: hp(10) }}>2 days ago</CustomText>
                        </View>
                        <CustomText>⭐⭐⭐⭐</CustomText>
                    </View>
                </View>



                <CustomText size={13} style={{ marginBottom: hp(2) }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</CustomText>


                {/* Book Now Button */}
                <View>
                    <CustomButton
                        height={hp(6)}
                        title={'Book Now'}
                        className={`rounded-md`}
                        onPress={() => navigation.navigate("BookingDateTimeScreen")}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default TurfDetailsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: hp(2) },
    imageContainer: { position: "relative", marginTop: hp(2) },
    turfImage: { width: "100%", height: hp("25%"), borderRadius: 20 },
    backButton: { backgroundColor: "rgba(0,0,0,0.5)", padding: 8, borderRadius: hp(50) },
    favoriteButton: { backgroundColor: "rgba(0,0,0,0.5)", padding: 8, borderRadius: hp(50), marginLeft: hp(1) },
    infoContainer: { paddingVertical: wp("5%") },
    ratingText: { fontSize: RFValue(14), marginLeft: 5 },
    locationRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
    distanceText: { fontSize: RFValue(12), color: "gray", marginLeft: 5 },


    amenitiesContainer: { flexDirection: "row", flexWrap: "wrap" },

    bulkEnquiryText: { fontSize: RFValue(14), fontWeight: "bold" },

    aboutText: { fontSize: RFValue(12), color: "gray" },

    sportIcon: { fontSize: RFValue(24), marginRight: 10 },
    ratingNumber: { fontSize: RFValue(18), fontWeight: "bold" },
    reviewCount: { fontSize: RFValue(12), color: "gray", marginLeft: 10 },
    middleBorder: { width: wp('0.3%'), height: hp('2%'), backgroundColor: 'gray', marginHorizontal: wp('2%') },

    priceContainer: {
        borderRadius: wp("2%"),
        overflow: "hidden",
        alignSelf: "center",
        backgroundColor: "#fff",
        marginTop: hp(2),
        paddingRight: hp(2)
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    cell: {
        width: wp("11%"),
        height: hp("5%"),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E2F2FF",
        margin: wp("0.5%"),
        borderRadius: wp("1%"),
    },
    headerText: {
        fontSize: rf(1.7),
        fontWeight: "bold",
        color: "#333",
    },
    discountText: {
        fontSize: rf(1.7),
        color: "#000",
    },
    headerCell: {
        width: wp("16%"),
        height: hp("5%"),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: wp("1%"),
    },

});
