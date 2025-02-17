import { SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GetLocation from "react-native-get-location";
import axios from 'axios';

// Components
import CustomText from '../../Components/Texts/CustomText';
import SearchBar from '../../Components/SearchBars/SearchBar';
import ImageSlider from '../../Components/Sliders/ImageSlider';
import HorizontalCardList from '../../Components/Cards/HorizontalCardList';
import HorizontalIconList from '../../Components/Cards/HorizontalIconList';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import LocationComponent from '../../Components/map/Map';
import UpcomingBooking from '../../Components/Cards/UpcomingBooking';
import RewardsCard from '../../Components/Cards/RewardsCard';

// Icons
import { Heart } from "lucide-react-native";

// Constants
import { COLORS } from '../../Constants/Colors';

// data's
import { data, perfectData, sportsData, bookingData, slides, rewardData } from '../../Constants/Datas';

// utils
import { navigate } from '../../Utils/NavigationUtil';
import Zustand from '../../Zustand/Zustand'
import { API_URL } from '../../Services/Api';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

const HomeScreen = () => {
  const { user } = Zustand()

  console.log(user, 'useruseruser')

  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  })

  const [bannerImg, setBannerImg] = useState([]);
  const [nearbyTurf, setNearbyTurf] = useState([])

  const handleNavigation = useCallback((screen) => {
    if (screen) navigate(screen);
  }, []);


  const handleView = () => Alert.alert('View Booking', `Viewing ${bookingData.title}`);
  const handleDelete = () => Alert.alert('Delete Booking', `Deleting ${bookingData.title}`);

  // fetch latitude, longitude
  const getCurrentLocation = async () => {
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      console.log("location", loc);
      setLocation({ latitude: loc.latitude, longitude: loc.longitude })
      fetchBannerSlide(loc.latitude, loc.longitude);
      fetchNearbyTurf(loc.latitude, loc.longitude)
    } catch (error) {
      console.warn("Error fetching current location:", error);
    }
  };

  // getting banner slide
  const fetchBannerSlide = async (latitude, longitude) => {
    const payload = {
      lat1: latitude,
      lon1: longitude
    }

    try {
      const response = await axios.post(`${API_URL}/banners/nearest`, payload);
      const Data = response.data.images
      setBannerImg(Data)

    } catch (error) {
      console.log("Error from getting bannerSlide image", error)
    }
  }

  // getting nearby court
  const fetchNearbyTurf = async (latitude, longitude) => {
    const payload = {
      lat1: latitude,
      lon1: longitude
    }

    try {
      const response = await axios.post(`${API_URL}/turfs/getnearestturfs`, payload);
      const Data = response.data.turfs
      setNearbyTurf(Data)
    } catch (error) {
      console.log("Error from getting nearbyTurf ", error)
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Location & Wishlist */}
        <View style={styles.row}>
          <View>
            {/* <LocationComponent /> */}
          </View>

          <TouchableOpacity onPress={() => navigate("WishListScreen")}>
            <Heart size={hp(3.5)} fill={COLORS.likedColor} color={COLORS.likedColor} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={{marginHorizontal: hp(2)}}>
          <SearchBar placeholder="Search here..." />
        </View>

        {/* Banner Slider */}
        <View style={styles.marginVertical}>
          <ImageSlider
            slides={bannerImg?.length ? bannerImg : slides}
            inactiveDotColor={"#ccc"}
            activeDotColor={COLORS.primary}
          />
        </View>


        {/* upcoming booking */}
        <View>
          <UpcomingBooking booking={bookingData} onView={handleView} onDelete={handleDelete} />
        </View>

        {/* Horizontal Icon List */}
        <HorizontalIconList data={sportsData} onPressItem={handleNavigation} />

        {/* Reward card */}
        <View style={styles.section}>
          <CustomHeaderText ML={2} MB={.5}>🎁 Reward your Booking !</CustomHeaderText>
          <RewardsCard data={rewardData} onPress={() => navigate("TurfDetailsScreen")} onPressBtn={() => navigate("TurfDetailsScreen")} />
        </View>

        {/* Nearby Court */}
        <View style={styles.section}>
          <CustomHeaderText ML={2}>Near By Court</CustomHeaderText>
          <HorizontalCardList data={data} onPressItem={() => navigate("TurfDetailsScreen")} />
        </View>

        {/* Perfect Pick for You */}
        <View style={styles.section}>
          <CustomHeaderText ML={2}>Perfect pick for you</CustomHeaderText>

          <HorizontalCardList data={perfectData} onPressItem={() => navigate("TurfDetailsScreen")} />
        </View>

        {/* Bottom Image List */}
        <HorizontalImageList data={data} />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: hp(2),

  },
  marginVertical: {
    marginVertical: hp(3),
  },
  fadeSlider: {
    borderRadius: hp(2),
  },
  section: {
    marginTop: hp(4),
  },
  bottomSpacing: {
    marginBottom: hp(14),
  },
});
