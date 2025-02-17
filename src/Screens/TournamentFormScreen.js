import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// icons
import { ChevronLeft, Martini, SwitchCamera } from "lucide-react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

// components
import CustomText from '../Components/Texts/CustomText';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constants/Colors';
import CustomInput from '../Components/Inputs/CustomInput';
import CustomButton from '../Components/Buttons/CustomButton';
import { successAlert } from '../Components/Toast/ToastServices';
import { navigate } from '../Utils/NavigationUtil';


const TournamentForm = () => {
  const navigation = useNavigation();

  const handleSendReq = () => {
    successAlert({
      message: "Request Send Successfully"
    });
    navigate("BottomNavigation")
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}
      <View className={`flex-row items-center`} style={{ marginVertical: hp(2), paddingHorizontal: hp(2) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={rf(22)} color={"#000"} />
        </TouchableOpacity>
        <CustomText size={2.3} fontWight='700' style={styles.header}>Match Details</CustomText>
      </View>

      <View className={`items-center justify-center`} style={{ marginTop: hp(3) }} >
        <TouchableOpacity
          style={{
            width: wp("23%"),
            height: wp("23%"),
            borderRadius: wp("500%"),
            position: "relative",
          }}
          className={`bg-gray-300`}
        >
          <CustomText color='#fff' style={styles.logoText}>Team Logo</CustomText>
          <View className='rounded-full' style={styles.switchCamera}>
            <Ionicons name={"camera-sharp"} size={hp(2.8)} style={{ color: "#fff" }} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: hp(3), marginHorizontal: hp(4) }}>
        <View>
          <CustomText >Team Name</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />

        </View>

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText >Skill Level</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />
        </View>

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText >Team Strength</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />
        </View>

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText >Message</CustomText>
          <CustomInput
            height={hp(13)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />
        </View>

        <View style={{marginTop: hp(3), marginHorizontal: hp(4)}}>
          <CustomButton className={`rounded-md`} title={"SEND REQUEST"} onPress={handleSendReq} />
        </View>

      </View>

    </ScrollView>
  )
}

export default TournamentForm

const styles = StyleSheet.create({
  switchCamera: {
    position: "absolute",
    right: 2,
    bottom: 2,
    backgroundColor: COLORS.primary,
    padding: hp(.5)
  },
  logoText: {
    position: "absolute",
    top: hp(4),
    left: hp(2)
  },
  header: {
    paddingLeft: wp(25)
  }
})