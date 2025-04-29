import { SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView, Text, Modal, Animated } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';

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
import { Heart, Filter, ArrowDownCircle, ArrowUpCircle, DollarSign, SlidersHorizontal, Star } from "lucide-react-native";

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
import CustomText from '../../Components/Texts/CustomText';

const HomeScreen = () => {
  const { user } = Zustand()
  
  const [bannerImg, setBannerImg] = useState([]);
  const [nearByTurfData, setNearByTurfData] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterMenuPosition, setFilterMenuPosition] = useState({ top: 0, right: 0 });
  const [activeFilter, setActiveFilter] = useState(null);
  
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleView = () => Alert.alert('View Booking', `Viewing ${bookingData.title}`);
  const handleDelete = () => Alert.alert('Delete Booking', `Deleting ${bookingData.title}`);

  // fetch latitude, longitude
  const getCurrentLocation = async () => {
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

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

  const handleFilterPress = (event, section) => {
    // Get the position of the filter button to position the dropdown
    const { pageY, pageX } = event.nativeEvent;
    setFilterMenuPosition({ top: pageY + 15, right: wp(100) - pageX - wp(5) });
    setShowFilterOptions(true);
    
    // Animate the menu sliding in
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const closeFilterMenu = () => {
    // Animate the menu sliding out
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowFilterOptions(false);
    });
  }

  const handleFilterOption = (option) => {
    // Handle the filter option selection
    setActiveFilter(option);
    
    let sortedData = [...nearByTurfData];
    
    switch(option) {
      case 'ratingHigh':
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      case 'ratingLow':
        sortedData.sort((a, b) => a.rating - b.rating);
        break;
      case 'priceLow':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        sortedData.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setNearByTurfData(sortedData);
    closeFilterMenu();
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const FilterOption = ({ icon, text, onPress, active, option }) => (
    <TouchableOpacity 
      style={[
        styles.filterOption, 
        activeFilter === option && styles.activeFilterOption
      ]}
      onPress={onPress}
    >
      <View style={styles.filterIconContainer}>
        {icon}
      </View>
     
      <CustomText
      size={2}
        style={[
        styles.filterOptionText,
        activeFilter === option && styles.activeFilterText
      ]}>{text}</CustomText>
    </TouchableOpacity>
  );

  const FilterMenu = () => (
    <Animated.View 
      style={[
        styles.filterMenu, 
        { 
          top: filterMenuPosition.top, 
          right: filterMenuPosition.right,
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
          opacity: slideAnimation,
        }
      ]}
    >
      <View style={styles.filterHeader}>
        <SlidersHorizontal size={hp(2)} color={COLORS.primary} />
        <Text style={styles.filterHeaderText}>Sort Options</Text>
      </View>
      <View style={styles.filterDivider} />
      
      <FilterOption 
        icon={<Star size={hp(2.2)} color={COLORS.primary} strokeWidth={activeFilter === 'ratingHigh' ? 3 : 2} />} 
        text="Rating (High to Low)" 
        onPress={() => handleFilterOption('ratingHigh')}
        active={activeFilter === 'ratingHigh'}
        option="ratingHigh"
      />
      <FilterOption 
        icon={<Star size={hp(2.2)} color={COLORS.primary} />} 
        text="Rating (Low to High)" 
        onPress={() => handleFilterOption('ratingLow')}
        active={activeFilter === 'ratingLow'}
        option="ratingLow"
      />
      <FilterOption 
        icon={<DollarSign size={hp(2.2)} color={COLORS.primary} />} 
        text="Price (Low to High)" 
        onPress={() => handleFilterOption('priceLow')}
        active={activeFilter === 'priceLow'}
        option="priceLow"
      />
      <FilterOption 
        icon={<DollarSign size={hp(2.2)} color={COLORS.primary} strokeWidth={activeFilter === 'priceHigh' ? 3 : 2} />} 
        text="Price (High to Low)" 
        onPress={() => handleFilterOption('priceHigh')}
        active={activeFilter === 'priceHigh'}
        option="priceHigh"
      />
    </Animated.View>
  );

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
            <CustomHeaderText ML={2}>Near By Court</CustomHeaderText>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={(event) => handleFilterPress(event, 'nearBy')}
            >
              <Filter size={hp(2.3)} color="#fff" />
            </TouchableOpacity>
          </View>
          <HorizontalCardList data={nearByTurfData?.length ? nearByTurfData : nearByturf} />
        </View>

        {/* Perfect Pick for You */}
        <View style={styles.section}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: hp(3), alignItems: "center" }}>
            <CustomHeaderText ML={2}>Best Deals for you</CustomHeaderText>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={(event) => handleFilterPress(event, 'bestDeals')}
            >
              <Filter size={hp(2.3)} color="#fff" />
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

      {showFilterOptions && <TouchableOpacity style={styles.overlay} activeOpacity={0.4} onPress={closeFilterMenu} />}
      {showFilterOptions && <FilterMenu />}
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
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    padding: hp(1),
    borderRadius: hp(1.5),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  filterMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: hp(1.5),
    width: wp(70),
    elevation: 6,
    zIndex: 1000,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: hp(2),
    backgroundColor: '#f8f8f8',
  },
  filterHeaderText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    marginLeft: hp(1),
    color: COLORS.textDark,
  },
  filterDivider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    width: '100%',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterIconContainer: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(1.5),
  },
  filterOptionText: {
    color: COLORS.textDark,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 999,
  },
});