import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from '../Texts/CustomText';


const ReferalCard = () => {
    return (
        <View className='flex-row items-center'>
            <View
                className='rounded-full items-center justify-center'
                style={{ backgroundColor: "#e9ecef", width: hp(5), height: hp(5) }}>
                <Image
                    source={require("../../Assets/gift-box.png")}
                    style={{ width: hp(3.5), height: hp(3.5) }}
                    resizeMode='contain'
                />
            </View>
            <View style={{ marginLeft: hp(2) }}>
                <CustomText fontWight='bold'>Refer your friends</CustomText>
                <CustomText>Earn <CustomText color='green' fontWight='bold'>50 coins</CustomText> by inviting your friends</CustomText>
            </View>
        </View>
    )
}

export default ReferalCard

const styles = StyleSheet.create({})