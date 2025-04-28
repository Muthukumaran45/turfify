import { SafeAreaView, FlatList, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Services/Api';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

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
import { navigate } from '../../Utils/NavigationUtil';
import { COLORS } from '../../Constants/Colors';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

// store
import useLocationStore from '../../Zustand/useLocationStore';

const GamesScreen = () => {

  const sections = [{ id: '1' }];

  const { latitude, longitude } = useLocationStore();
  const [tournamentData, setTournamentData] = useState([]);

  const fetchTournamentData = async () => {
    try {
      const response = await axios.get(`${API_URL}/tournaments/nearby?latitude=12.9706288&longitude=80.2510542`);
      const data = response.data;
      setTournamentData(data);
    } catch (error) {
      console.log("Error from getting Tournament data", error)
    }
  }

  useEffect(() => {
    fetchTournamentData();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            {/* Location & Wishlist */}
            <View className="flex-row items-center justify-between" style={{ margin: hp(2) }}>
              <View>
                <LocationComponent />
              </View>

              <CoinHeartHeader />
            </View>

            {/* Search Bar */}
            <View style={{ marginHorizontal: hp(2) }}>
              <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
            </View>

            {/* Image Scroller */}
            <HorizontalImageList data={bottomSlides} />

            {/* Category List */}
            <View>
              <CustomHeaderText ML={2} MB={2} MT={3}>Category</CustomHeaderText>
              <CategoryList data={categoryData} />
            </View>

            {/* Near You Section */}
            <View>
              <CustomHeaderText ML={2} MB={1.5} MT={3}>Near you</CustomHeaderText>
              <TournamentCardList data={tournamentData?.length ? tournamentData : tournamentDatas} style={{ marginHorizontal: hp(2) }} />
            </View>

            <View style={{ marginBottom: hp(8) }} />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default GamesScreen;

const styles = StyleSheet.create({});
