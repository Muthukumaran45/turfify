import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Texts/CustomText';

// icons
import { Share2 } from "lucide-react-native";

// packages
import Share from 'react-native-share';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/Colors';




const ReferalCard = ({ points }) => {
    const referralPoints = points;

    const RefferalCode = "JKEMLJ"

    // share page link
    const shareLink = async () => {
        const shareOptions = {
            title: 'Share via',
            message: `Use this Refferal code : ${RefferalCode}`,
            url: 'https://turfify.com/',
        };
        await Share.open(shareOptions);
    };



    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" , paddingRight: hp(2)}}>

            <View style={{ flexDirection: "row", alignItems: "center",}}>
                <View
                    style={{ backgroundColor: "#e9ecef", width: hp(5), height: hp(5), alignItems: "center", justifyContent: "center", borderRadius: hp(50) }}>
                    <Image
                        source={require("../../Assets/gift-box.png")}
                        style={{ width: hp(3.5), height: hp(3.5) }}
                        resizeMode='contain'
                    />
                </View>
                <View style={{ marginLeft: hp(2) }}>
                    <CustomText fontWight='bold'>Refer your friends</CustomText>
                    <CustomText>Earn <CustomText color='green' fontWight='bold'>{referralPoints} coins</CustomText> by inviting your friends</CustomText>
                </View>
            </View>

            <TouchableOpacity onPress={shareLink}>
                <Share2 color={COLORS.primary} size={hp(3.5)} />
            </TouchableOpacity>
        </View>
    )
}

export default ReferalCard

const styles = StyleSheet.create({})