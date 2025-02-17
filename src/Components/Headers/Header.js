import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChevronLeft } from "lucide-react-native";
import CustomText from "../../Components/Texts/CustomText";
import { Nunito_Bold } from "../../Constants/FontFamily";
const { width } = Dimensions.get('window');
const PADDINGLEFT = width * 0.3

const Header = ({ title = "My Profile", paddingLeft = PADDINGLEFT, onPress, style = {}, textStyle = {} }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress || (() => navigation.goBack())}>
        <ChevronLeft size={hp(3)} color={"#000"} />
      </TouchableOpacity>
      <CustomText size={2.3} fontFamily={Nunito_Bold} style={[{ paddingLeft: paddingLeft }, textStyle]}>
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
