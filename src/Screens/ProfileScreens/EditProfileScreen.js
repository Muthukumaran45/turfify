import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';

// components
import CustomText from "../../Components/Texts/CustomText";
import { COLORS } from "../../Constants/Colors";
import CustomInput from "../../Components/Inputs/CustomInput";

// icons
import { ChevronLeft, SwitchCamera } from "lucide-react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import Header from "../../Components/Headers/Header";
import { Nunito_Bold } from "../../Constants/FontFamily";


const EditProfileScreen = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.bgPrimary }}>

        {/* header */}
        <View style={{marginHorizontal: hp(2)}}>
          <Header title="Edit Profile" />
        </View>

        {/* user image & user details */}
        <View className={`items-center justify-center`} style={{ marginVertical: hp(2), marginHorizontal: hp(2) }}>
          <View>
            <Image
              source={require("../../Assets/profile.png")}
              style={{
                width: wp("23%"),
                height: wp("23%"),
                borderRadius: wp("500%"),
                position: "relative"
              }}
            />
            <TouchableOpacity style={styles.switchCamera}>
              <Ionicons name={"camera-reverse-sharp"} size={hp(3.5)} style={{ color: "#000" }} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: hp(1) }}>
            <CustomText>Edit photo</CustomText>
          </View>
        </View>

        {/* inputs */}
        <View style={{ marginHorizontal: hp(2) }}>

          {/* name & bio */}
          <View>
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Name" style={{ marginVertical: hp(2), height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Bio" style={{ height: hp(6) }} />
          </View>

          <View style={{ marginTop: hp(3) }}>
            <CustomText size={2.2} fontFamily={Nunito_Bold}>Contact Details</CustomText>

            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Email" style={{ marginVertical: hp(2), height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Phone Number" style={{ height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Gender" style={{ marginVertical: hp(2), height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="City" style={{ height: hp(6) }} />

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  profileHeader: {
    paddingLeft: wp(28)
  },
  switchCamera: {
    position: "absolute",
    right: 2
  }
})