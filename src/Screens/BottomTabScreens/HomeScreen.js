import { SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView, Text, Modal, Animated, Image, StatusBar } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
// location
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
// internet-check
import NetInfo from '@react-native-community/netinfo';


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

import { API_URL } from '../../Services/Api';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

// store
import useUserStore from "../../Zustand/Zustand"
import useNearTurfStore from '../../Zustand/useNearTurfStore';


import Card from '../../Components/Cards/Card';
import CustomText from '../../Components/Texts/CustomText';
import NewUserRewardCard from '../../Components/Cards/rewards/NewUserRewardCard';

// locaiton check
const checkAndEnableLocation = async () => {
  if (Platform.OS !== 'android') return; // Exit if not Android

  try {
    const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    let permissionStatus = await check(permission);

    if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.BLOCKED) {
      permissionStatus = await request(permission);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(() => {
          console.log('Location enabled');
        })
        .catch(err => {
          console.warn('Location not enabled', err);
          Alert.alert(
            "Location Required",
            "Please turn on location services to continue.",
            [{ text: "OK" }]
          );
        });
    } else {
      Alert.alert("Permission Required", "Location permission is required to continue.");
    }
  } catch (error) {
    console.error('Location check error:', error);
  }
};


const HomeScreen = () => {

  const token = useUserStore((state) => state.token);
  console.log("token == ", token)


  // internet
  const [isConnected, setIsConnected] = useState(true);

  const [bannerImg, setBannerImg] = useState([]);
  const [nearByTurfData, setNearByTurfData] = useState([]);
  const [sportsIcon, setSportsIcon] = useState([]);


  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterMenuPosition, setFilterMenuPosition] = useState({ top: 0, right: 0 });
  const [activeFilter, setActiveFilter] = useState(null);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleView = () => Alert.alert('View Booking', `Viewing ${bookingData.title}`);
  const handleDelete = () => Alert.alert('Delete Booking', `Deleting ${bookingData.title}`);

  // internet
  useEffect(() => {
    if (Platform.OS === 'android') {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
        if (!state.isConnected) {
          console.log('Internet is OFF on Android');
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
  };


  // getting banner slide
  const fetchBannerSlide = async () => {
    try {
      // console.log("token from home page", token)
      const response = await axios.get(`${API_URL}/banners/nearest?type=home`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // console.log("banners = ", response.data);
      const Data = response.data.banners.map(item => item.bannerUrl);
      setBannerImg(Data);

    } catch (error) {
      console.log("Error from getting bannerSlide image", error);
    }
  };

  // Fetch nearby Turf
  const fetchNearbyTurf = async () => {
    // console.log("token from home page :", token)
    try {
      const response = await axios.get(`${API_URL}/turfs/getnearestturfs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.turfs
      setNearByTurfData(data);
      useNearTurfStore().getState().setNearByTurf(data);
    } catch (error) {
      console.log("Error from getting nearbyTurf ", error)
    }
  }

  const [configData, setConfigData] = useState([])
  // Fetch sports icon
  const fetchSportsIcon = async () => {
    try {
      const response = await axios.get(`${API_URL}/config`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const Data = response.data
      console.log("config dat =", Data)
      setConfigData(Data)
      const icons = response.data?.sportsIcons || [];
      // console.log("sports icons = ", icons);
      setSportsIcon(icons);
    } catch (error) {
      console.log("Error fetching sports icons: ", error);
    }
  };


  // rewards api
  const [rewardsData, setRewardsData] = useState([])
  const fetchRewards = async () => {
    try {
      const response = await axios.get(`${API_URL}/rewards/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const Data = response.data

      const mappedData = Data.map((item, index) => ({
        id: `${index}`,
        image: item.turfInfo.image,
        title: item.turfInfo.turfName,
        location: "Chennai",
        price: `₹${item.turfInfo.startingAmount}`,
        rating: 4.5,
        currentBookings: item.totalBookings,
        bookingsRequired: item.milestone,
        status: item.status,
      }));

      setRewardsData(mappedData)
      // console.log("rewards = ", Data);

    } catch (error) {
      console.log("Error fetching rewards: ", error);
    }
  };

  const inProgressRewards = rewardsData.filter(item => item.status === 'inProgress');
  const completedCount = rewardsData.filter(item => item.status === 'completed').length;


  // fetching upcoming booking
  const [upComingBookingData, setUpComingBookingData] = useState([])
  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data.data;

      if (data && Array.isArray(data)) {
        // Filter bookings based on date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to beginning of today

        const upcomingBookings = [];

        data.forEach(booking => {
          const bookingDate = new Date(booking.date);

          // Add image placeholder for demo
          const bookingWithImage = {
            ...booking,
            image: "https://via.placeholder.com/300x200"
          };

          if (bookingDate >= today) {
            upcomingBookings.push(bookingWithImage);
          }
          setUpComingBookingData(upcomingBookings)
        });

      }

    } catch (error) {
      console.log("Error fetching booking data: ", error);
    }
  };

  useEffect(() => {
    checkAndEnableLocation();
    fetchBannerSlide();
    fetchNearbyTurf();
    fetchSportsIcon();
    fetchRewards();
    fetchBookingData();
  }, []);

  // console.log("upcomming data", upComingBookingData?.turfName)

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

    switch (option) {
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

      <ScrollView showsVerticalScrollIndicator={false} >

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

        {!isConnected ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: hp(4),
              marginTop: hp(15),
            }}
          >
            <View
              style={{
                height: hp(40),
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: hp(2),
                elevation: 4,
                alignItems: 'center',
                justifyContent: 'center',
                padding: hp(3),
              }}
            >
              <Image
                source={require('../../Assets/no-connection.png')}
                style={{
                  width: hp(20),
                  height: hp(20),
                  resizeMode: 'contain',
                  marginBottom: hp(2),
                }}
              />
              <CustomText style={{ fontSize: hp(2.5), fontWeight: '600', marginBottom: hp(1) }}>
                No Internet Connection
              </CustomText>
              <CustomText style={{ fontSize: hp(1.8), color: '#6c757d', textAlign: 'center' }}>
                Please check your internet settings and try again.
              </CustomText>

              <TouchableOpacity
                onPress={handleRetry}
                style={{
                  marginTop: hp(3),
                  backgroundColor: '#378E26',
                  paddingVertical: hp(1),
                  paddingHorizontal: hp(4),
                  borderRadius: hp(1),
                }}
              >
                <CustomText style={{ color: '#fff', fontSize: hp(2), fontWeight: '600' }}>
                  Retry
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
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
              <UpcomingBooking onView={handleView} onDelete={handleDelete} />
            </View>

            {/* Horizontal Icon List */}
            <View style={{ marginTop: hp(.5) }}>
              <HorizontalIconList data={sportsIcon} onPressItem={() => navigate('CricketScreen')} />
            </View>

            {/* Rewards your booking card */}

            {
              configData ? (

                <View style={styles.section}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: hp(3), alignItems: "center" }}>
                    <CustomHeaderText ML={2} MB={.5}>🎁 Reward your Booking !</CustomHeaderText>
                    {rewardsData?.length ? (
                      <TouchableOpacity
                        style={styles.claimbtn}
                        onPress={() => navigate("ClaimRewardsPage", { rewardsData })}
                      >
                        <CustomText color='#fff' fontWight='bold' style={{ fontSize: hp(2) }}>
                          Claim ({completedCount ? completedCount : 0})
                        </CustomText>
                      </TouchableOpacity>
                    ) :
                      (
                        <>

                        </>
                      )
                    }


                  </View>

                  {
                    rewardsData?.length ? (
                      <RewardsCard data={inProgressRewards} onPress={() => navigate("TurfDetailsScreen")} onPressBtn={() => navigate("TurfDetailsScreen")} />

                    ) : (
                      <View style={{ alignItems: "center" }}>
                        <Image source={require("../../Assets/gift.png")} style={{ width: wp(70), height: hp(25) }} resizeMode='contain' />
                        <CustomText>Book Turf To claim Rewards</CustomText>
                      </View>
                    )
                  }
                </View>

              ) : (
                <View style={{ marginTop: hp(3) }}>
                  <NewUserRewardCard milestoneCount={configData.milestoneCount} />
                </View>
              )
            }


            {/* Nearby by court */}
            <View style={styles.section}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: hp(3), alignItems: "center" }}>
                <CustomHeaderText ML={2}>Near By Court</CustomHeaderText>
                {
                  nearByTurfData?.length ? (
                    <TouchableOpacity
                      style={styles.filterButton}
                      onPress={(event) => handleFilterPress(event, 'nearBy')}
                    >
                      <Filter size={hp(2.3)} color="#fff" />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
              </View>

              {
                nearByTurfData?.length ? (
                  <HorizontalCardList data={nearByTurfData} />

                ) : (
                  <View style={{ alignItems: "center" }}>
                    <Image source={require("../../Assets/noData.png")} style={{ width: wp(70), height: hp(25) }} resizeMode='contain' />
                    <CustomText>No Data </CustomText>
                  </View>
                )
              }
            </View>

            {/* Best deals for You */}
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
            {/* <HorizontalImageList data={bottomSlides} /> */}

            {/* referal code */}
            <View
              style={[styles.commonHorizontalPadding,
              {
                backgroundColor: "#fff",
                borderRadius: hp(2),
                elevation: 2
              }]}>
              <ReferalCard points={configData.referralPoints} />
            </View>

            {/* footer */}
            <View style={{ paddingHorizontal: hp(2), marginTop: hp(4) }}>
              <Footer />
            </View>
          </View>
        )}



        <View style={styles.bottomSpacing} />
      </ScrollView>

      {showFilterOptions && <TouchableOpacity style={styles.overlay} activeOpacity={0.4} onPress={closeFilterMenu} />}
      {showFilterOptions && <FilterMenu />}
    </SafeAreaView >
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
    marginHorizontal: hp(2),
    marginBottom: hp(2),
    marginTop: hp(1.5)
  },
  marginVertical: {
    marginVertical: hp(3),
  },
  fadeSlider: {
    borderRadius: hp(2),
  },
  section: {
    marginTop: hp(3),
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
  claimbtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(.5),
    borderRadius: hp(50)
  }
});