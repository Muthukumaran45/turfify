import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { ChevronLeft } from "lucide-react-native";
import CustomText from "../../Components/Texts/CustomText";

const Header = ({ title = "My Profile", paddingLeft = wp(28), onPress, style = {}, textStyle = {} }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress || (() => navigation.goBack())}>
        <ChevronLeft size={rf(22)} color={"#000"} />
      </TouchableOpacity>
      <CustomText size={17} className={`font-medium`} style={[{ paddingLeft: paddingLeft }, textStyle]}>
        {title}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(2),
  },
});

export default Header;
