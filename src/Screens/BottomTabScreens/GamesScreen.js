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
              <CustomText size={18} className="font-medium" style={{ marginLeft: hp(2), marginBottom: hp(2) }}>
                Category
              </CustomText>
              <CategoryList data={categoryData} />
            </View>

            {/* Near You Section */}
            <View style={{ marginVertical: hp(3) }}>
              <CustomText size={18} className="font-medium" style={{ marginLeft: hp(2), marginBottom: hp(2) }}>
                Near you
              </CustomText>
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
