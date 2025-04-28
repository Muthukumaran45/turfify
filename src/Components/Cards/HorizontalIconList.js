import React from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../Texts/CustomText";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Nunito_Bold } from "../../Constants/FontFamily";

const HorizontalIconList = ({ data, colors = ["#78C560", "#36AB70"], onPressItem }) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item: { name, icon, screen } }) => {
        const IconComponent = icon.library; // Get the icon library
        return (
          <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
            <LinearGradient colors={colors} style={styles.iconCircle}>
              <IconComponent name={icon.name} size={hp(5.5)} color="black" />
            </LinearGradient>
            <CustomText fontFamily={Nunito_Bold} style={styles.txt}>{name}</CustomText>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: hp(1),
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: hp(1),
  },
  iconCircle: {
    width: hp(9),
    height: hp(9),
    borderRadius: hp(500),
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    marginTop: hp(1),
  },
});

export default HorizontalIconList;
