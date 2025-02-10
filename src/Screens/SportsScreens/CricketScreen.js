import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as FS } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';

// component
import CustomText from '../../Components/Texts/CustomText'
import HorizontalCardList from '../../Components/Cards/HorizontalCardList';

// icons
import { ChevronLeft } from "lucide-react-native";
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import SearchBar from '../../Components/SearchBars/SearchBar';
import HorizontalIconList from '../../Components/Cards/HorizontalIconList';
import CardList from '../../Components/Cards/CardList';

// data's
import { data, sportsData, CardListData } from '../../Constants/Datas';

const CricketScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}
      <View className={`flex-row items-center`} style={{ marginVertical: hp(2), paddingHorizontal: hp(2) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={FS(3)} color={"#000"} />
        </TouchableOpacity>
        <CustomText size={17} className={`font-medium`} style={styles.header}>Cricket Turf</CustomText>
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
      <View>
        <HorizontalIconList data={sportsData} />
      </View>

      {/* best deals */}
      <View style={{ marginVertical: hp(3), }}>
        <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2) }}>Best Deals for you</CustomText>
        <HorizontalCardList data={data} />
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