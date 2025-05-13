import { SafeAreaView, FlatList, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Services/Api';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
// internet-check
import NetInfo from '@react-native-community/netinfo';

// Components
import CustomText from '../../Components/Texts/CustomText';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import CategoryList from '../../Components/Cards/CategoryList';
import LocationComponent from '../../Components/map/Map';
import SearchBar from '../../Components/SearchBars/SearchBar';
import TournamentCardList from '../../Components/Cards/TournamentCard';
import CoinHeartHeader from '../../Components/Headers/CoinHeartHeader';

// Icons
import { Heart } from "lucide-react-native";

// Data
import { bottomSlides, categoryData, tournamentDatas } from '../../Constants/Datas';

// Utils
import { COLORS } from '../../Constants/Colors';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

// store
import useLocationStore from '../../Zustand/useLocationStore';
import useUserStore from "../../Zustand/Zustand"

const GamesScreen = () => {

  // zustand
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  console.log("userId", user)

  // internet
  const [isConnected, setIsConnected] = useState(true);
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

  const sections = [{ id: '1' }];

  const [bannerImg, setBannerImg] = useState([]);

  // getting banner slide
  const fetchBannerSlide = async () => {
    try {
      // console.log("token from home page", token)
      const response = await axios.get(`${API_URL}/banners/nearest?type=tournament`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // console.log("Tournament banners = ", response.data);
      const Data = response.data.banners.map(item => item.bannerUrl);
      setBannerImg(Data);

    } catch (error) {
      console.log("Error from getting bannerSlide image", error);
    }
  };

  const [sportsIcon, setSportsIcon] = useState([]);
  // Fetch sports icon
  const fetchSportsIcon = async () => {
    try {
      const response = await axios.get(`${API_URL}/config`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const icons = response.data?.sportsIcons || [];
      // console.log("games screen categories icons = ", icons);
      setSportsIcon(icons);
    } catch (error) {
      console.log("Error fetching sports icons: ", error);
    }
  };

  // fetch tournament card
  const [tournamentCardData, setTournamentCardData] = useState([]);
  const fetchTournamentCard = async () => {
    try {
      const response = await axios.get(`${API_URL}/tournaments/nearby`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const Data = response.data.tournaments
      setTournamentCardData(Data)
      // console.log("games page tournament data's = ", Data);
    } catch (error) {
      console.log("Error fetching tournament data: ", error);
    }
  };

  useEffect(() => {
    fetchBannerSlide();
    fetchSportsIcon();
    fetchTournamentCard();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            {/* Location & Wishlist */}
            <View style={{
              marginHorizontal: hp(2),
              marginBottom: hp(2),
              marginTop: hp(1),
              flexDirection: "row", alignItems: "center", justifyContent: "space-between"
            }}>
              <View>
                <LocationComponent />
              </View>

              <CoinHeartHeader />
            </View>

            {/* Search Bar */}
            <View style={{ marginHorizontal: hp(2) }}>
              <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
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
              <>
                {/* Image Scroller */}
                < HorizontalImageList data={bannerImg} />

                {/* Category List */}
                {
                  sportsIcon.length < 0 ? (
                    <View>
                      <CustomHeaderText ML={2} MB={2} MT={1}>Category</CustomHeaderText>
                      <CategoryList data={sportsIcon} />
                    </View>
                  ) : (
                    <View>

                    </View>
                  )

                }

                {/* Near You  */}
                <View style={{ paddingBottom: hp(2) }}>
                  <CustomHeaderText ML={2} MB={1.5} MT={1}>Near you</CustomHeaderText>

                  {tournamentCardData?.length ? (
                    <TournamentCardList data={tournamentCardData} style={{ marginHorizontal: hp(2) }} />

                  ) : (
                    <View style={{ alignItems: "center" }}>
                      <Image source={require("../../Assets/noData.png")} style={{ width: wp(70), height: hp(25) }} resizeMode='contain' />
                      <CustomText>No Data </CustomText>
                    </View>
                  )}
                </View>
              </>

            )}
            <View style={{ marginBottom: hp(8) }} />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default GamesScreen;

const styles = StyleSheet.create({});
