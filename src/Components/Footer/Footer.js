import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

// component
import CustomHeaderText from '../Texts/CustomHeaderText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from '../Texts/CustomText';


const Footer = () => {
    return (
        <View  >
            <View className='justify-center items-center' >
                <View style={{ backgroundColor: "#57cc99", padding: hp(1) }}>
                    <CustomHeaderText color='#fff' size={2.7} style={{ letterSpacing: 1 }}>TURFIFY</CustomHeaderText>
                </View>
                <CustomText MT={2}>Your Sports Community App</CustomText>
            </View>

            <View className='flex-row justify-around items-center' style={{ marginTop: hp(2) }}>
                <CustomText style={{ color: "#52b788", fontWeight: "bold", textDecorationLine: "underline" }}>Privacy Policy</CustomText>
                <CustomText>.</CustomText>
                <CustomText style={{ color: "#52b788", fontWeight: "bold", textDecorationLine: "underline" }}>Terms of Service</CustomText>
                <CustomText>.</CustomText>
                <CustomText style={{ color: "#52b788", fontWeight: "bold", textDecorationLine: "underline" }}>FAQs</CustomText>
            </View>

            <View className='flex-1 justify-center items-center' style={{ marginTop: hp(3) }}>
                <Image
                    source={require("../../Assets/footer_img.png")}
                    style={{ width: wp(60), height: hp(25)}}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})