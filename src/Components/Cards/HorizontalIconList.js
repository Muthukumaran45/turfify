import React from "react";
import { TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
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
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
          <LinearGradient colors={colors} style={styles.iconCircle}>
            <Image source={{ uri: item.url }} style={styles.iconImage} resizeMode="contain" />
          </LinearGradient>
          <CustomText fontFamily={Nunito_Bold} style={styles.txt}>{item.name}</CustomText>
        </TouchableOpacity>
      )}
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
    overflow: 'hidden',
  },
  iconImage: {
    width: '70%',
    height: '70%',
  },
  txt: {
    marginTop: hp(1),
  },
});

export default HorizontalIconList;
