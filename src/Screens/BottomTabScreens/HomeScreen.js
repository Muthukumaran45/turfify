import { SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GetLocation from "react-native-get-location";
import axios from 'axios';

// Components
import SearchBar from '../../Components/SearchBars/SearchBar';
import ImageSlider from '../../Components/Sliders/ImageSlider';
import HorizontalCardList from '../../Components/Cards/HorizontalCardList';
import HorizontalIconList from '../../Components/Cards/HorizontalIconList';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import LocationComponent from '../../Components/map/Map';
import UpcomingBooking from '../../Components/Cards/UpcomingBooking';
import RewardsCard from '../../Components/Cards/RewardsCard';
import ReferalCard from '../../Components/Cards/ReferalCard';
import Footer from '../../Components/Footer/Footer';
import CoinHeartHeader from '../../Components/Headers/CoinHeartHeader';

// Icons
import { Heart, Filter } from "lucide-react-native";

// Constants
import { COLORS } from '../../Constants/Colors';

// data's
import { data, perfectData, sportsData, bookingData, slides, rewardData, bottomSlides } from '../../Constants/Datas';
import { nearByturf } from '../../Constants/nearByData';

// utils
import { navigate } from '../../Utils/NavigationUtil';
import Zustand from '../../Zustand/Zustand'
import { API_URL } from '../../Services/Api';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

// store
import useLocationStore from '../../Zustand/useLocationStore';
import useNearTurfStore from '../../Zustand/useNearTurfStore';
import Card from '../../Components/Cards/Card';

const HomeScreen = () => {
  const { user } = Zustand()

  console.log(user, 'useruseruser')

  const [bannerImg, setBannerImg] = useState([]);
  const [nearByTurfData, setNearByTurfData] = useState([])


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
      useLocationStore.getState().setLocation(loc.latitude, loc.longitude);
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

  // Fetch nearby Turf
  const fetchNearbyTurf = async (latitude, longitude) => {
    const payload = {
      lat1: latitude,
      lon1: longitude
    }

    try {
      const response = await axios.post(`${API_URL}/turfs/getnearestturfs`, payload);
      const data = response.data.turfs
      setNearByTurfData(data);
      useNearTurfStore().getState().setNearByTurf(data);
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
            <LocationComponent />
          </View>

          <CoinHeartHeader />
        </View>

        {/* Search Bar */}
        <View style={{ marginHorizontal: hp(2) }}>
          <SearchBar placeholder="Search here..." />
        </View>

        {/* Banner Slider */}
        <View style={[styles.marginVertical]}>
          <ImageSlider
            slides={bannerImg?.length ? bannerImg : slides}
            inactiveDotColor={"#fff"}
            activeDotColor={COLORS.primary}
            interval={5000}
          />
        </View>

        {/* upcoming booking */}
        <View>
          <UpcomingBooking booking={bookingData} onView={handleView} onDelete={handleDelete} />
        </View>

        {/* Horizontal Icon List */}
        <View style={{ marginTop: hp(1.7) }}>
          <HorizontalIconList data={sportsData} onPressItem={() => navigate('CricketScreen')} />
        </View>

        {/* Rewards your booking card */}
        <View style={styles.section}>
          <CustomHeaderText ML={2} MB={.5}>🎁 Reward your Booking !</CustomHeaderText>
          <RewardsCard data={rewardData} onPress={() => navigate("TurfDetailsScreen")} onPressBtn={() => navigate("TurfDetailsScreen")} />
        </View>

        {/* Nearby by turf */}
        <View style={styles.section}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: hp(3), alignItems: "center" }}>
            <CustomHeaderText ML={2} >Near By Court</CustomHeaderText>
            <TouchableOpacity>
              <Filter size={hp(3)} color="green" />
            </TouchableOpacity>
          </View>
          <HorizontalCardList data={nearByTurfData?.length ? nearByTurfData : nearByturf} />
        </View>

        {/* Perfect Pick for You */}
        <View style={styles.section}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: hp(3), alignItems: "center" }}>
            <CustomHeaderText ML={2}>Best Deals for you</CustomHeaderText>
            <TouchableOpacity>
              <Filter size={hp(3)} color="green" />
            </TouchableOpacity>
          </View>

          <Card data={data} onPressItem={() => navigate("TurfDetailsScreen")} />
        </View>

        {/* Bottom Image List */}
        <HorizontalImageList data={bottomSlides} />


        {/* referal code */}
        <View
          style={[styles.commonHorizontalPadding,
          {
            backgroundColor: "#fff",
            borderRadius: hp(2),
            elevation: 2
          }]}>
          <ReferalCard />
        </View>


        {/* footer */}
        <View style={{ paddingHorizontal: hp(2), marginTop: hp(4) }}>
          <Footer />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor
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
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    marginLeft: 16,
  },
  bottomSpacing: {
    marginBottom: hp(14),
  },
  commonHorizontalPadding: {
    marginHorizontal: hp(2),
    marginTop: hp(3),
    padding: hp(1.5),

  }
});
