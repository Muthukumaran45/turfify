import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS } from '../../Constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// icons
import Ionicons from "react-native-vector-icons/Ionicons"


const CoinHeartHeader = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <TouchableOpacity style={{ marginRight: hp(2), paddingTop: hp(1) }}>
        <FontAwesome5 name="coins" size={hp(3.5)} color="#ffc300" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("WishListScreen")} style={{marginTop: hp(.5)}}>
        <Ionicons name="heart" size={hp(4.3)} color={COLORS.likedColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CoinHeartHeader;
