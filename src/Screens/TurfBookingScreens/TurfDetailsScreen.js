import React, { useState, useEffect, useId } from "react";
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
import Ionicons from "react-native-vector-icons/Ionicons"


import PriceModal from "./Modals/PriceModal";

// data's
import { priceData } from "../../Constants/Datas";
import BulkEnquiryModal from "./Modals/BulkEnquiryModal";

// services
import { ForegroundNotification } from "../../Services/ForegroundNotification";

// zustand
import useTurfDetails from "../../Zustand/useTurfDetails";
import useUserStore from "../../Zustand/Zustand"


const defaultImage = "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg";

const TurfDetailsScreen = ({ route }) => {

  const { turfData } = route?.params || {};
  useTurfDetails.getState().setTurfDetails(turfData)
  const token = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.user);



  // Check if images exist, else use default image
  const imagesToDisplay = turfData?.images?.length > 0 ? turfData.images : [defaultImage];

  const [feedbackData, setFeedbackData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [bulkEnquiryModal, setBulkEnquiryModal] = useState(false);
  const [discountData, setDiscountData] = useState([]);

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback/all`);
      const data = response.data
      setFeedbackData(data);
      // console.log('feedback data', data)

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

  // average rating
  const rating = turfData?.averageRating ?? 0;
  const displayRating = rating > 0 ? Math.round(rating) : 1;

  // wishlist api
  const handleWishlistToggle = async () => {
    const isWishlisted = wishlist.includes(turfData?._id);
  
    const payload = {
      userId: userId,
      turfId: turfData?._id
    };
  
    try {
      if (isWishlisted) {
        const response = await axios.post(`${API_URL}/favorites/remove`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Removed from wishlist:", response.data);
        // Update state
        setWishlist(prev => prev.filter(id => id !== turfData?._id));
      } else {
        const response = await axios.post(`${API_URL}/favorites/add`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Added to wishlist:", response.data);
        // Update state
        setWishlist(prev => [...prev, turfData?._id]);
      }
    } catch (error) {
      console.log("Wishlist toggle error:", error);
    }
  };
  

  // fetch wish list 
  const [wishlist, setWishlist] = useState([]);
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data
      setWishlist(data);
      console.log("fetch user wishlist =", data)
    } catch (error) {
      console.log("Error from  wishlist", error)
    }

  }

  useEffect(() => {
    fetchWishlist()
  }, [])

 
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
              <Header title="Turf Details" />
            </View>


            {/* Image Slider */}
            <View style={{ position: "relative" }}>
              <ImageSliderNormal images={imagesToDisplay} />

              <View style={{ flexDirection: "row", position: "absolute", right: hp(3), top: hp(1) }}>
                <TouchableOpacity style={styles.backButton} onPress={shareLink}>
                  <Share2 color="white" size={hp(3)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton} onPress={handleWishlistToggle}>
                  <Ionicons
                    name={wishlist.includes(turfData?._id) ? "heart" : "heart-outline"}
                    size={hp(3)}
                    color={wishlist.includes(turfData?._id) ? "red" : "white"}
                  />
                </TouchableOpacity>

              </View>
            </View>

            {/* Turf Info */}
            <View style={styles.infoContainer}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                {/* <CustomText size={2.5} MB={.5} fontFamily={Nunito_Bold}>{turfDetails?.turfName}</CustomText> */}
                <CustomText size={2.5} MB={.5} fontFamily={Nunito_Bold}>{turfData?.turfName}</CustomText>
                <View style={{ marginTop: hp(0.5), flexDirection: "row", alignItems: "center", }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {Array.from({ length: displayRating }).map((_, index) => (
                      <Star key={index} size={hp(2)} color="#FFD700" />
                    ))}
                  </View>
                  <View style={styles.middleBorder} />
                  <CustomText >Distance </CustomText>
                  <CustomText>- {(turfData?.distance / 1000).toFixed(2)} km</CustomText>
                </View>
              </View>

              <View style={styles.locationRow}>
                <MapPin color="gray" size={hp(2)} />
                <CustomText style={{ paddingLeft: hp(1) }}>{turfData?.address}</CustomText>
                {/* <CustomText> (1.5km)</CustomText> */}
              </View>

              {/* Pricing */}
              <View style={[styles.row, { justifyContent: "space-between", }]}>
                <CustomText style={{ paddingLeft: hp(.8) }}>₹ Price Start From <CustomText style={{ fontWeight: "bold" }}>{turfData?.startingAmount}</CustomText>/hr</CustomText>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} onPress={() => setModalVisible(true)}>
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
                <CustomText size={2.5} fontFamily={Nunito_Bold} MT={3}>Amenities</CustomText>
                <View style={styles.amenitiesContainer}>
                  {turfData?.selectedAmenities?.map((item, index) => (
                    <View key={index} style={{ marginBottom: hp(1), flexDirection: "row", marginRight: hp(1) }} >
                      {/* <Image source={{ uri: item.url }} style={styles.iconImage} resizeMode="contain" /> */}

                      <CustomText style={{ padding: hp(.5), borderRadius: hp(1), paddingHorizontal: hp(1), backgroundColor: "#e0ffe0", }}>
                        {item.name}
                      </CustomText>
                    </View>
                  ))}
                </View>
              </View>


              {/* Bulk Enquiry */}
              <View >
                <TouchableOpacity style={[styles.row, { backgroundColor: "#fff", justifyContent: "center", height: hp(6), borderWidth: 1, borderRadius: hp(1) }]} onPress={() => setBulkEnquiryModal(true)}>
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
              <View>
                <CustomText size={2.5} fontFamily={Nunito_Bold} MT={2} style={{ marginVertical: hp(1.5) }}>About Us</CustomText>
                <CustomText >• {turfData?.aboutUs}</CustomText>
              </View>



              {/* Available Sports */}
              <View style={{ marginTop: hp(2) }}>
                <CustomText size={2.5} fontFamily={Nunito_Bold} MT={1} style={{ marginVertical: hp(1) }}>Available Sports</CustomText>
                <View style={styles.amenitiesContainer}>
                  {turfData?.selectedSports?.map((item, index) => (
                    <View key={index} style={{ marginBottom: hp(1), flexDirection: "row", marginRight: hp(1) }} >
                      {/* <Image source={{ uri: item.url }} style={styles.iconImage} resizeMode="contain" /> */}

                      <CustomText style={{ padding: hp(.5), borderRadius: hp(1), paddingHorizontal: hp(1), backgroundColor: "#e0ffe0", }}>
                        {item.name}
                      </CustomText>
                    </View>
                  ))}
                </View>
              </View>

              {/* Rating & Reviews */}
              <CustomText size={2.5} fontFamily={Nunito_Bold} MT={2} style={{ marginVertical: hp(1), }}>Rating & Review</CustomText>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <CustomText size={5}>{feedbackData[0]?.rating}.0</CustomText>
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
          height={hp(7)}
          title={'Book Now'}
          style={{ elevation: 3, borderRadius: hp(1) }}
          onPress={() => navigate("BookingDateTimeScreen", { turfDatas: turfData })}
        // onPress={ForegroundNotification}
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
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: hp(1.5) },
  distanceText: { fontSize: RFValue(12), color: "gray", marginLeft: 5 },
  amenitiesContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: hp(1) },
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
    marginTop: hp(1.5)
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
    bottom: hp(4),
    left: 0,
    right: 0,
    marginHorizontal: hp(2)


  },
  iconImage: {
    width: '30%',
    height: '30%',
  }
});

export default TurfDetailsScreen;