import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue, RFPercentage as rf } from "react-native-responsive-fontsize";
import { MapPin, Star, Heart, Share2 } from "lucide-react-native";
import axios from "axios";
import Share from 'react-native-share';

// components
import Header from "../../Components/Headers/Header";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomText from "../../Components/Texts/CustomText";
import ImageSliderNormal from "../../Components/Sliders/ImageSliderNormal";

// utils
import { navigate } from "../../Utils/NavigationUtil";
import { API_URL } from "../../Services/Api";
import FeedbackComponent from "../../Components/Reviews/FeedbackComponent";
import { Nunito_Bold } from "../../Constants/FontFamily";
import TurfHoursDiscount from "./TurfHoursDiscount";

// icons
import { ChevronDown } from 'lucide-react-native'
import PriceModal from "./Modals/PriceModal";

// data's
import { priceData } from "../../Constants/Datas";
import BulkEnquiryModal from "./Modals/BulkEnquiryModal";


const defaultImage = "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg";

const TurfDetailsScreen = ({ route }) => {
  const { turfData } = route?.params || {};
  const [turfDetails, setTurfDetails] = useState({"selectedAmenities" :["chatroom", "cricket", "foot ball"]})

  // Check if images exist, else use default image
  const imagesToDisplay = turfData?.images?.length > 0 ? turfData.images : [defaultImage];


  const [feedbackData, setFeedbackData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [bulkEnquiryModal, setBulkEnquiryModal] = useState(false);


  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback/all`);
      const data = response.data
      setFeedbackData(data);
      console.log('feedback data', data)

    } catch (error) {
      console.log("Error from fetching feedback data ", error)
    }
  }

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const sections = [{ id: '1' }];

  // bulk enquiry modal
  const handleModalSubmit = (selectedOption) => {
    console.log('Selected option:', selectedOption);
  };

  // share page link
  const shareLink = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Check this out!',
      url: 'https://turfify.com/turfDetails', // Your app link (important!)
    };
    await Share.open(shareOptions);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }} 
        renderItem={() => (
          <>
            {/* Header */}
            <View style={{ marginHorizontal: hp(2) }}>
              <Header title="Turf Details" onPress={() => navigate("WelcomeScreen")} />
            </View>


            {/* Image Slider */}
            <View className="relative">
              <ImageSliderNormal images={imagesToDisplay} />

              <View className={`flex-row absolute right-8 mt-3`}>
                <TouchableOpacity style={styles.backButton}  onPress={shareLink}>
                  <Share2 color="white" size={hp(2.5)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart color="white" size={hp(2.5)} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Turf Info */}
            <View style={styles.infoContainer}>
              <View className={`flex-row justify-between`} >
                {/* <CustomText size={2.5} MB={.5} fontFamily={Nunito_Bold}>{turfDetails?.turfName}</CustomText> */}
                <CustomText size={2.5} MB={.5} fontFamily={Nunito_Bold}>STRIKERS Academy</CustomText>
                <View className={`flex-row items-center`} style={{ marginTop: hp(0.5) }}>
                  <Star size={hp(2)} color="#FFD700" />
                  <CustomText > (4.8)</CustomText>
                  <View style={styles.middleBorder} />
                  <CustomText >Distance</CustomText>
                  <CustomText > (1.5km)</CustomText>
                </View>
              </View>

              <View style={styles.locationRow}>
                <MapPin color="gray" size={hp(2)} />
                <CustomText style={{ paddingLeft: hp(1) }}>Purasaiwakkam, Chennai</CustomText>
                <CustomText> (1.5km)</CustomText>
              </View>

              {/* Pricing */}
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <CustomText style={{ paddingLeft: hp(.8) }}>₹ Price Start From 800/hr</CustomText>
                <TouchableOpacity style={styles.row} onPress={() => setModalVisible(true)}>
                  <CustomText>Price Details</CustomText>
                  <ChevronDown size={hp(2)} />
                </TouchableOpacity>
              </View>

              <PriceModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                priceData={priceData}
              />

              {/* Price Details */}
              <TurfHoursDiscount />

              {/* Amenities */}
              <View>
                <CustomText size={2.5} fontFamily={Nunito_Bold} MB={1} MT={3}>Amenities</CustomText>
                <View style={styles.amenitiesContainer}>
                  {turfDetails?.selectedAmenities?.map((item, index) => (
                    <View key={index} style={{ marginRight: hp(1.5), marginBottom: hp(1) }}>
                      <CustomText style={{ backgroundColor: "#e0ffe0", padding: hp(.5), borderRadius: hp(1), paddingHorizontal: hp(1) }}>
                        {item}
                      </CustomText>
                    </View>
                  ))}
                </View>
              </View>


              {/* Bulk Enquiry */}
              <View>

                <TouchableOpacity style={[styles.row, {backgroundColor: "#fff", justifyContent: "center", height: hp(6), borderWidth: 1 , borderRadius: hp(1)}]} onPress={() => setBulkEnquiryModal(true)}>
                  <CustomText size={2} MR={1}>Bulk Enquiry</CustomText>
                  <ChevronDown size={hp(2)} />
                </TouchableOpacity>

                <BulkEnquiryModal
                  visible={bulkEnquiryModal}
                  onClose={() => setBulkEnquiryModal(false)}
                  onSubmit={handleModalSubmit}
                />
              </View>

              {/* About Us */}
              <CustomText size={2.5} fontFamily={Nunito_Bold} MT={2} style={{ marginVertical: hp(1) }}>About Us</CustomText>
              <CustomText >• 500mm grass</CustomText>
              <CustomText >• Sound Setup for commentary and music</CustomText>
              <CustomText >• Tournament and event friendly</CustomText>

              {/* Available Sports */}
              <CustomText size={2.5} fontFamily={Nunito_Bold} MT={1} style={{ marginVertical: hp(1) }}>Available Sports</CustomText>
              <View className={`flex-row`}>
                <Text style={styles.sportIcon}>⚽</Text>
                <Text style={styles.sportIcon}>🏏</Text>
              </View>

              {/* Rating & Reviews */}
              <CustomText size={2.5} fontFamily={Nunito_Bold} MT={2} style={{ marginVertical: hp(1), }}>Rating & Review</CustomText>
              <View className={`flex-row items-baseline`}>
                <CustomText size={5}>4.0</CustomText>
                <CustomText ML={1}>Based on {feedbackData.length} reviews</CustomText>
              </View>

              {/* Review */}
              <View style={{ marginBottom: hp(1) }}>
                {feedbackData.length > 0 ? (
                  <FeedbackComponent data={feedbackData} />
                ) : (
                  <CustomText style={{ marginVertical: 10, textAlign: "center" }}>
                    No reviews available.
                  </CustomText>
                )}
              </View>
            </View>
          </>
        )}
      />

      {/* Fixed Book Now Button */}
      <View style={styles.fixedButtonContainer}>
        <CustomButton
          height={hp(6)}
          title={'Book Now'}
          className={`rounded-md`}
          onPress={() => navigate("BookingDateTimeScreen",{turfDatas : turfDetails})}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  infoContainer: { 
    paddingVertical: wp("5%"), 
    paddingHorizontal: hp(2) 
  },
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
  backButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: hp(50)
  },
  favoriteButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: hp(50),
    marginLeft: hp(1)
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default TurfDetailsScreen;