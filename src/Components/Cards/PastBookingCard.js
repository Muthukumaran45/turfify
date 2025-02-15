import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LucideIcon, MapPin, Star, Map } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '../Buttons/CustomButton';
import CustomText from '../Texts/CustomText';

// packages
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../Utils/NavigationUtil';


const Card = ({ item }) => {
      const navigation = useNavigation();
    
    return (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: hp(2),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            flexDirection: 'row',
            marginHorizontal: hp(2)
        }}>
            <Image
                source={{ uri: item.image }}
                style={{ width: wp(40), height: hp(18.5), borderRadius: 10 , borderTopRightRadius: 0}}
            />
            <View style={{ flex: 1, marginLeft: wp(3), paddingVertical: hp(1.5), paddingRight: hp(2) }}>
                <Text style={{ fontSize: RFValue(14), fontWeight: 'bold', color: '#000' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(0.5) }}>
                    <MapPin size={16} color="#4A90E2" />
                    <Text style={{ fontSize: RFValue(12), color: '#555', marginLeft: wp(1) }}>{item.location}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(0.5) }}>
                    <Star size={16} color="#FFD700" />
                    <Text style={{ fontSize: RFValue(12), color: '#000', marginLeft: wp(1) }}>({item.rating})</Text>
                    <View style={styles.middleBorder} />
                    <CustomText size={13} >Distance</CustomText>
                    <Text style={{ fontSize: RFValue(12), color: '#4A90E2', marginLeft: wp(1) }}>({item.distance} km)</Text>
                </View>


                <View style={{ marginTop: hp(3), marginLeft: hp(6) }}>
                    <CustomButton size={14} className={`rounded-md`} title={'Book Again'} height={hp(4)} onPress={() => navigate("TurfDetailsScreen")} />
                </View>
            </View>
        </View>
    );
};

const PastBookingCard = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Card item={item} />}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default PastBookingCard;

const styles = StyleSheet.create({

    middleBorder: { width: wp('0.3%'), height: hp('2%'), backgroundColor: 'gray', marginHorizontal: wp('2%') },

})

