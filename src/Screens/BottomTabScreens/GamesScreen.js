import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

// components
import CustomText from '../../Components/Texts/CustomText';
import HorizontalImageList from '../../Components/Cards/HorizontalImageList';
import CategoryList from '../../Components/Cards/CategoryList';
import TournamentCard from '../../Components/Cards/TournamentCard';

// icons
import { Redo2, Heart, } from "lucide-react-native";
import SearchBar from '../../Components/SearchBars/SearchBar';

// data's
import { data, categoryData, tournamentData } from '../../Constants/Datas';
import TournamentCardList from '../../Components/Cards/TournamentCard';


const GamesScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, }}
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

        {/* image scroller */}
        <View>
          <HorizontalImageList data={data} />
        </View>

        {/* category */}
        <View>
          <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2), marginBottom: hp(2) }}>Category</CustomText>
          <CategoryList data={categoryData} />
        </View>

        {/* near you*/}
        <View style={{ marginVertical: hp(3), }}>
          <CustomText size={18} className={`font-medium`} style={{ marginLeft: hp(2) }}>Near you</CustomText>
          <TournamentCardList data={tournamentData} />
        </View>

        <View style={{ marginBottom: hp(8) }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default GamesScreen

const styles = StyleSheet.create({})