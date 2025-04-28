import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Heart } from 'lucide-react-native'; 
import { COLORS } from '../../Constants/Colors'; 
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CoinHeartHeader = () => {
  const { navigate } = useNavigation();

  return (
    <View className='flex-row items-center'>
      <TouchableOpacity style={{ marginRight: hp(2) }} onPress={() => navigate("WishListScreen")}>
        <FontAwesome5 name="coins" size={hp(3.5)} color="#ffc300" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("WishListScreen")}>
        <Heart size={hp(3.5)} fill={COLORS.likedColor} color={COLORS.likedColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CoinHeartHeader;
