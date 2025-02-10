import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { LogOut, History, Heart, Gift, HelpCircle, DollarSign, ChevronLeft, ChevronRight } from "lucide-react-native";
import CustomText from "../Components/Texts/CustomText";

// packages
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>

      {/* header */}
      <View className={`flex-row`} style={{ marginVertical: hp(3), paddingHorizontal: hp(2) }}>
        <ChevronLeft />
        <CustomText size={18} className={`font-medium`} style={styles.profileHeader}>My Profile</CustomText>
      </View>

      {/* user image & user details */}
      <View className={`flex-row items-center`} style={{ marginVertical: hp("3%"), marginHorizontal: hp(2) }}>
        <Image
          source={require("../Assets/profile.png")}
          style={{
            width: wp("23%"),
            height: wp("23%"),
            borderRadius: wp("500%"),
          }}
        />
        <View style={{ marginLeft: hp(2) }}>
          <CustomText size={18} className={`font-medium`}>Sāndy Šānjai</CustomText>
          <CustomText size={13} className={`text-neutral-400`}> I am an enthusiastic Sport man{"\n"}#⚡shuttler{"\n"}##❤️ fitness life styler</CustomText>
        </View>
      </View>

      <TouchableOpacity style={{ marginBottom: hp("3%"), marginLeft: hp(3) }}>
        <CustomText size={14}>Edit Profile </CustomText>
      </TouchableOpacity>


      <MenuItem icon={History} text="My Booking History" />
      <MenuItem icon={Heart} text="My Favorites" />
      <MenuItem icon={Gift} text="Offers" />
      <MenuItem icon={HelpCircle} text="Help & Support" />
      <MenuItem icon={DollarSign} text="Payment & Refund" />
      <MenuItem
        icon={LogOut}
        text="Log Out"
        onPress={() => navigation.replace("LoginScreen")}
      />

      <View className={`flex-row items-center`} style={{ margin: hp("2%") }}>
        <TouchableOpacity style={{ marginHorizontal: wp("2%") }}>
          <Text style={{ fontSize: rf(24) }}>🟢</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: wp("2%") }}>
          <Text style={{ fontSize: rf(24) }}>📸</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon: Icon, text, isLogout, onPress }) => (
  <TouchableOpacity
    className={`flex-row items-center justify-between border-t border-gray-200`}
    style={{
      paddingVertical: hp("2%"),
      paddingHorizontal: wp("5%"),
    }}
    onPress={onPress}
  >
    {/* Left Icon and Text */}
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon size={rf(18)} color={isLogout ? "red" : "black"} />
      <CustomText className={`text-neutral-400`} size={13} style={styles.menuItem}>{text}</CustomText>
    </View>

    {/* Right Chevron Icon */}
    <ChevronRight size={rf(18)} />
  </TouchableOpacity>
);


export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    paddingLeft: wp(28)
  },
  menuItem: {
    marginLeft: hp(3)
  }
})


