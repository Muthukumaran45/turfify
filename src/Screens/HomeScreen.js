import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

// component
import CustomText from '../Components/Texts/CustomText'
import SearchBar from '../Components/SearchBars/SearchBar';
import FadeImageSlider from '../Components/Sliders/FadeImageSlider'
import HorizontalCardList from '../Components/Cards/HorizontalCardList';
import HorizontalIconList from '../Components/Cards/HorizontalIconList';

// icons
import { Redo2, Heart, LaptopMinimalCheckIcon, UserRoundIcon, HouseIcon, Gamepad2Icon } from "lucide-react-native";

// colors
import { COLORS } from '../Constants/Colors';


// data for fadeIn slides
const slides = [
  { id: "1", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" },
  { id: "2", image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg" },
  { id: "3", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg" },
  { id: "4", image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg" },
];

// data for Horizontal cards
const data = [
  { id: '1', title: 'Game On 2.0', location: 'Thoraipakkam, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
  { id: '2', title: 'Spark Academy', location: 'Sholinganallur, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg' },
  { id: '3', title: 'Beyond Arena', location: 'Velachery, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg' },
  { id: '4', title: 'Elite Sports', location: 'Anna Nagar, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg' },
  { id: '5', title: 'Urban Turf', location: 'OMR, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
];

// icons
const sportsData = [
  { id: "1", name: "Cricket", icon: LaptopMinimalCheckIcon, screen: "CricketScreen" },
  { id: "2", name: "Badminton", icon: UserRoundIcon, screen: "BadmintonScreen" },
  { id: "3", name: "Football", icon: HouseIcon, screen: "FootballScreen" },
  { id: "4", name: "Swimming", icon: Gamepad2Icon, screen: "SwimmingScreen" },
  { id: "5", name: "Badminton", icon: UserRoundIcon, screen: "BadmintonScreen" },
  { id: "6", name: "Football", icon: HouseIcon, screen: "FootballScreen" },
  { id: "7", name: "Cricket", icon: LaptopMinimalCheckIcon, screen: "CricketScreen" },
  { id: "8", name: "Badminton", icon: UserRoundIcon, screen: "BadmintonScreen" },
];

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

        <View className={`flex-row items-center justify-between`} style={{ margin: hp(2) }}>
          <TouchableOpacity className={`flex-row items-center`}>
            <Redo2 size={hp(4)} style={{ marginRight: hp(1) }} />
            <CustomText>ECR, chennai</CustomText>
          </TouchableOpacity>

          <TouchableOpacity>
            <Heart size={hp(3.5)} fill={"red"} color={"red"} />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View style={{ marginHorizontal: hp(2) }}>
          <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
        </View>

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

        <View>
          <HorizontalIconList data={sportsData} onPressItem={handleNavigation} />
        </View>

        <View style={{ marginVertical: hp(3), }}>
          <CustomText size={20} className={`font-medium`} style={styles.nearBytxt}>Near by Court</CustomText>
          <HorizontalCardList data={data} />
        </View>

        <View>
          <CustomText size={20} className={`font-medium`} style={styles.nearBytxt}>Perfect pick for you</CustomText>
          <HorizontalCardList data={data} />
        </View>

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
  nearBytxt: {
    marginLeft: hp(2)
  }
})