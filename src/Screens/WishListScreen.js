import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// components
import WishListCard from '../Components/Cards/WishListCard'

// data's
import { WishListData } from '../Constants/Datas'
import Header from '../Components/Headers/Header';

const WishListScreen = () => {
  return (
    <ScrollView
      style={{ paddingHorizontal: hp(2), flex: 1 }}
    >


      <Header
        title='Favorite'

      />
      <View style={{ marginTop: hp(2) }}>
        <WishListCard data={WishListData} />
      </View>


    </ScrollView>

  )
}

export default WishListScreen

const styles = StyleSheet.create({})