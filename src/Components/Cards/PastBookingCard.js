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
import { Nunito_Bold } from '../../Constants/FontFamily';


const Card = ({ item }) => {
    const navigation = useNavigation();

    if (item.time && item.time.length > 0) {
        console.log("data inside array =", item.time.map((t) => t));
    } else {
        console.log("item.time is empty or undefined");
    }



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
                style={{ width: wp(40), height: hp(18.5), borderRadius: 10, borderTopRightRadius: 0 }}
            />

            {/* right side content */}
            <View style={{ flex: 1, marginLeft: wp(2), paddingVertical: hp(1.5), paddingRight: hp(2) }}>
                <CustomText size={2.3} fontFamily={Nunito_Bold}>{item.name}</CustomText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(0.5) }}>
                    <MapPin size={16} color="#4A90E2" />
                    <CustomText ML={.3}>{item.location}</CustomText>
                </View>

                {/* time */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(0.5) }}>
                    <CustomText>Time : </CustomText>
                    <CustomText>{item.time} </CustomText>
                </View>

                {/* date */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(0.5) }}>
                    <CustomText>
                        Date{" "}:{" "}
                        <CustomText color="#787878">
                            {item.date
                                ? item.date.split("-").reverse().join("-")
                                : ""}
                        </CustomText>
                    </CustomText>
                </View>

                <View style={{ marginTop: hp(3), marginLeft: hp(6) }}>
                    <CustomButton size={14} style={{borderRadius: hp(1)}}  title={'Book Again'} height={hp(4)} onPress={() => navigate("TurfDetailsScreen")} />
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

