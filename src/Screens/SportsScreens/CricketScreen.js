import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as FS } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';

// component
import CustomText from '../../Components/Texts/CustomText'
import HorizontalCardList from '../../Components/Cards/HorizontalCardList';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import SearchBar from '../../Components/SearchBars/SearchBar';
import HorizontalIconList from '../../Components/Cards/HorizontalIconList';
import CardList from '../../Components/Cards/CardList';

// icons
import { ChevronLeft } from "lucide-react-native";

// data's
import { data, sportsData, CardListData, bottomSlides } from '../../Constants/Datas';
import Header from '../../Components/Headers/Header';

// utils
import { navigate } from '../../Utils/NavigationUtil';
import CustomHeaderText from '../../Components/Texts/CustomHeaderText';
import Card from '../../Components/Cards/Card';

const CricketScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}
      <View style={{ marginHorizontal: hp(2) }}>
        <Header title='Cricket Turf' />
      </View>

      {/* search bar */}
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
      </View>

      {/* image scroller */}
      <View>
        <HorizontalImageList data={bottomSlides} />
      </View>

      {/* horizontal icon list */}
      <View style={{ marginTop: hp(4) }}>
        <HorizontalIconList data={sportsData} />
      </View>

      {/* best deals */}
      <View style={{ marginVertical: hp(3), }}>
        <CustomHeaderText ML={2}>Best Deals for you</CustomHeaderText>
        <Card data={data} onPressItem={() => navigation.navigate("TurfDetailsScreen")}  />
      </View>

      {/* short by distance */}
      <View>
        <CustomHeaderText ML={2} MB={1.5}>Short by Distance</CustomHeaderText>
        <CardList data={CardListData} style={{ marginHorizontal: hp(2) }} onPressBtn={() => navigate("TurfDetailsScreen")} />
      </View>

    </ScrollView>
  )
}

export default CricketScreen

const styles = StyleSheet.create({
  header: {
    paddingLeft: wp(28)
  },
})