import React from "react";
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";

// Icons
import { LogOut, History, Heart, HelpCircle, DollarSign, ChevronRight } from "lucide-react-native";

// Components
import CustomText from "../../Components/Texts/CustomText";
import Header from "../../Components/Headers/Header";

// Colors
import { COLORS } from "../../Constants/Colors";

// Utils
import { navigate, resetAndNavigate } from "../../Utils/NavigationUtil";

// store
import Zustand from "../../Zustand/Zustand"
import { Nunito_Bold } from "../../Constants/FontFamily";


const ProfileScreen = () => {

  const {clearUser} = Zustand();

  const handleLogout = async() => {
   await clearUser() 
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>

      {/* Header */}
      <View style={{ marginHorizontal: hp(2) }}>
        <Header />
      </View>

      {/* User image & details */}
      <View className={`flex-row items-center`} style={{ marginVertical: hp("3%"), marginHorizontal: hp(2) }}>
        <Image
          source={require("../../Assets/profile.png")}
          style={{
            width: wp("23%"),
            height: wp("23%"),
            borderRadius: wp("500%"),
          }}
        />
        <View style={{ marginLeft: hp(2) }}>
          <CustomText size={2} fontFamily={Nunito_Bold}>Sāndy Šānjai</CustomText>
          <CustomText >I am an enthusiastic Sport man{"\n"}#⚡shuttler{"\n"}##❤️ fitness life styler</CustomText>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigate("EditProfileScreen")} style={{ marginBottom: hp("3%"), marginLeft: hp(3) }}>
        <CustomText fontWight='700'>Edit Profile </CustomText>
      </TouchableOpacity>

      <MenuItem
        icon={History}
        text="My Booking History"
        onPress={() => navigate("BookingScreen", { defaultTab: "Past Booking" })}
      />
      <MenuItem icon={Heart} text="My Favorites" onPress={() => navigate("WishListScreen")} />
      <MenuItem icon={HelpCircle} text="Help & Support" onPress={() => navigate("HelpScreen")} />
      <MenuItem icon={DollarSign} text="Payment & Refund" onPress={() => navigate("PaymentScreen")} />
      <MenuItem icon={LogOut} text="Log Out" isLogout onPress={handleLogout} />

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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon size={rf(18)} color={isLogout ? "red" : "black"} />
      <CustomText ML={3} color="#1A1A1A">{text}</CustomText>
    </View>
    <ChevronRight size={rf(18)} />
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({

});
