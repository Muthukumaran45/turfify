import { SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import React, { useCallback } from 'react';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Components
import CustomText from '../../Components/Texts/CustomText';
import SearchBar from '../../Components/SearchBars/SearchBar';
import FadeImageSlider from '../../Components/Sliders/FadeImageSlider';
import HorizontalCardList from '../../Components/Cards/HorizontalCardList';
import HorizontalIconList from '../../Components/Cards/HorizontalIconList';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import LocationComponent from '../../Components/map/Map';

// Icons
import { Heart } from "lucide-react-native";

// Constants
import { COLORS } from '../../Constants/Colors';
import { slides, data, perfectData, sportsData } from '../../Constants/Datas';

// utils
import { navigate } from '../../Utils/NavigationUtil';


const HomeScreen = () => {
  const handleNavigation = useCallback((screen) => {
    if (screen) navigate(screen);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Location & Wishlist */}
        <View style={styles.row}>
          <LocationComponent />
          <TouchableOpacity onPress={() => navigate("WishListScreen")}>
            <Heart size={hp(3.5)} fill={"red"} color={"red"} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.marginHorizontal}>
          <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
        </View>

        {/* Fade Image Slider */}
        <View style={[styles.marginHorizontal, styles.marginVertical]}>
          <FadeImageSlider
            slides={slides}
            interval={5000}
            fadeDuration={1000}
            style={styles.fadeSlider}
            bg={"#fff"}
            inactiveDotColor={"#ccc"}
            activeDotColor={COLORS.gradient}
          />
        </View>

        {/* Horizontal Icon List */}
        <HorizontalIconList data={sportsData} onPressItem={handleNavigation} />

        {/* Nearby Court */}
        <View style={styles.section}>
          <CustomText size={18} className="font-medium" style={styles.title}>Nearby Court</CustomText>
          <HorizontalCardList data={data} onPressItem={() => navigate("TurfDetailsScreen")} />
        </View>

        {/* Perfect Pick for You */}
        <View style={styles.section}>
          <CustomText size={18} className="font-medium" style={styles.title}>Perfect pick for you</CustomText>
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
  marginHorizontal: {
    marginHorizontal: hp(2),
  },
  marginVertical: {
    marginVertical: hp(3),
  },
  fadeSlider: {
    borderRadius: hp(2),
  },
  section: {
    marginTop: hp(3),
  },
  title: {
    marginLeft: hp(2),
  },
  bottomSpacing: {
    marginBottom: hp(10),
  },
});
