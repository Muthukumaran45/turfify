import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

// components
import CustomText from '../Components/Texts/CustomText';

// icons
import { Redo2, Heart, } from "lucide-react-native";
import SearchBar from '../Components/SearchBars/SearchBar';

const GamesScreen = () => {
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

      </ScrollView>
    </SafeAreaView>
  )
}

export default GamesScreen

const styles = StyleSheet.create({})