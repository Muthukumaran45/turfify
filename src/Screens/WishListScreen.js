import { View, StyleSheet } from 'react-native';
import React from 'react';

// Packages
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Components
import WishListCard from '../Components/Cards/WishListCard';

// Data
import { WishListData } from '../Constants/Datas';
import Header from '../Components/Headers/Header';

import { navigate } from '../Utils/NavigationUtil';

const WishListScreen = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: hp(2) }}>
      <Header title='Favorite' />
      <WishListCard data={WishListData} onPressBtn={() => navigate("TurfDetailsScreen")} /> 
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({});
