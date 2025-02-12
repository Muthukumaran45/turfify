import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

// component
import CustomText from '../../Components/Texts/CustomText'
import SearchBar from '../../Components/SearchBars/SearchBar';
import FadeImageSlider from '../../Components/Sliders/FadeImageSlider'
import HorizontalCardList from '../../Components/Cards/HorizontalCardList';
import HorizontalIconList from '../../Components/Cards/HorizontalIconList';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';

// icons
import { Redo2, Heart } from "lucide-react-native";

// colors
import { COLORS } from '../../Constants/Colors';

// data's
import { slides, data, perfectData, sportsData } from '../../Constants/Datas';


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* location & wishlist */}
        <View className={`flex-row items-center justify-between`} style={{ margin: hp(2) }}>
          <TouchableOpacity className={`flex-row items-center`}>
            <Redo2 size={hp(4)} style={{ marginRight: hp(1) }} />
            <CustomText>ECR, chennai</CustomText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("WishListScreen")}>
            <Heart size={hp(3.5)} fill={"red"} color={"red"} />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View style={{ marginHorizontal: hp(2) }}>
          <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
        </View>

        {/* fade image slider */}
        <View style={{ marginVertical: hp(3), marginHorizontal: hp(2) }}>
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

        {/* horizontal icon list */}
        <View>
          <HorizontalIconList data={sportsData} onPressItem={handleNavigation} />
        </View>

        {/* near by court */}
        <View style={{ marginVertical: hp(3), }}>
          <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2) }}>Near by Court</CustomText>
          <HorizontalCardList data={data} onPressItem={() => navigation.navigate("TurfDetailsScreen")} />
        </View>

        {/* perfect pick for you */}
        <View>
          <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2) }}>Perfect pick for you</CustomText>
          <HorizontalCardList data={perfectData} onPressItem={() => navigation.navigate("TurfDetailsScreen")} />
        </View>

        {/* bottom slider */}
        <HorizontalImageList data={data} />


        <View style={{ marginBottom: hp(10) }} />
      </ScrollView>


    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  fadeSlider: {
    borderRadius: hp(2),
  },

})