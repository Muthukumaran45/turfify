import { SafeAreaView, FlatList, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Components
import CustomText from '../../Components/Texts/CustomText';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import CategoryList from '../../Components/Cards/CategoryList';
import LocationComponent from '../../Components/map/Map';
import SearchBar from '../../Components/SearchBars/SearchBar';
import TournamentCardList from '../../Components/Cards/TournamentCard';

// Icons
import { Heart } from "lucide-react-native";

// Data
import { data, categoryData, tournamentData } from '../../Constants/Datas';

// Utils
import { navigate } from '../../Utils/NavigationUtil';
import { COLORS } from '../../Constants/Colors';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';

const GamesScreen = () => {

  const sections = [{ id: '1' }];

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <TouchableOpacity onPress={() => navigate("WishListScreen")}>
                <Heart size={hp(3.5)} fill={COLORS.likedColor} color={COLORS.likedColor} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={{ marginHorizontal: hp(2) }}>
              <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
            </View>

            {/* Image Scroller */}
            <HorizontalImageList data={data} />

            {/* Category List */}
            <View>
              <CustomHeaderText ML={2} MB={2} MT={3}>Category</CustomHeaderText>
              <CategoryList data={categoryData} />
            </View>

            {/* Near You Section */}
            <View>
              <CustomHeaderText ML={2} MB={1.5} MT={3}>Near you</CustomHeaderText>
              <TournamentCardList data={tournamentData} style={{ marginHorizontal: hp(2) }} />
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
