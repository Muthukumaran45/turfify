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
import { data, sportsData, CardListData } from '../../Constants/Datas';
import Header from '../../Components/Headers/Header';

const CricketScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}
      <View style={{marginHorizontal: hp(2)}}>
        <Header title='Cricket Turf' />
      </View>

      {/* search bar */}
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <SearchBar placeholder="Search here..." onFilterPress={() => Alert.alert("Filter clicked!")} />
      </View>

      {/* image scroller */}
      <View>
        <HorizontalImageList data={data} />
      </View>

      {/* horizontal icon list */}
      <View style={{marginTop: hp(4)}}>
        <HorizontalIconList data={sportsData} />
      </View>

      {/* best deals */}
      <View style={{ marginVertical: hp(3), }}>
        <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2) }}>Best Deals for you</CustomText>
        <HorizontalCardList data={data} onPressItem={() => navigation.navigate("TurfDetailsScreen")} />
      </View>

      {/* short by distance */}
      <View>
        <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2), marginBottom: hp(1) }}>Short by Distance</CustomText>
        <CardList data={CardListData} style={{ marginHorizontal: hp(2) }} />
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