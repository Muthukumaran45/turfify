import React from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../Texts/CustomText";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
          <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(screen)}>
            <LinearGradient colors={colors} style={styles.iconCircle}>
              <IconComponent name={icon.name} size={23} color="black" />
            </LinearGradient>
            <CustomText size={12} style={styles.txt}>{name}</CustomText>
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
    width: hp(7),
    height: hp(7),
    borderRadius: hp(500),
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    marginTop: hp(1),
  },
});

export default HorizontalIconList;
