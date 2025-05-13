import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

// icons
import { ChevronLeft, MoveLeft } from "lucide-react-native";


// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomText from "../../Components/Texts/CustomText";
import { Nunito_Bold } from "../../Constants/FontFamily";
import { COLORS } from "../../Constants/Colors";
const { width } = Dimensions.get('window');
const PADDINGLEFT = width * 0.3

const Header = ({ title = "My Profile", paddingLeft = PADDINGLEFT, onPress, style = {}, textStyle = {}, color = COLORS.textHeader }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress || (() => navigation.goBack())}>
        <MoveLeft size={hp(4)} color={COLORS.arrowIcon} />
      </TouchableOpacity>
      <CustomText size={2.3} fontFamily={Nunito_Bold} style={[{ paddingLeft: paddingLeft, color: color }, textStyle]}>
        {title}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1.5),
    marginBottom: hp(2.5)
  },
});

export default Header;
