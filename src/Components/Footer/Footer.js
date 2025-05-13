import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// component
import CustomHeaderText from '../Texts/CustomHeaderText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from '../Texts/CustomText';

// icons
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { COLORS } from '../../Constants/Colors';


const Footer = () => {
    return (
        <View  >
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={{ backgroundColor:  COLORS.primary, padding: hp(1) }}>
                    <CustomHeaderText color='#fff' size={2.7} style={{ letterSpacing: 1 }}>TURFIFY</CustomHeaderText>
                </View>
                <CustomText MT={2} fontWight='bold'>Your Sports Community App</CustomText>
            </View>

            <View style={{ marginTop: hp(2), flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <View  style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    {/* insta */}
                    <TouchableOpacity>
                        <AntDesign name="instagram" size={hp(4)} color={COLORS.iconColor} />
                    </TouchableOpacity>
                    {/* whatsapp */}
                    <TouchableOpacity style={{marginLeft: hp(3)}}>
                        <FontAwesome name="whatsapp" size={hp(4)} color={COLORS.iconColor} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: hp(3), flex: 1, justifyContent: "center", alignItems: "center",  }}>
                <Image
                    source={require("../../Assets/footer_img.png")}
                    style={{ width: wp(60), height: hp(30) }}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})