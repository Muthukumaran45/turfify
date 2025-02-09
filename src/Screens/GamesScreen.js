import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// icons
import { LaptopMinimalCheckIcon, UserRoundIcon, HouseIcon, Gamepad2Icon } from "lucide-react-native"; // Use available icons

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// colors
import { COLORS } from "../Constants/Colors";

// components
import CustomText from "../Components/Texts/CustomText";

const sportsData = [
  { id: "1", name: "Cricket", icon: LaptopMinimalCheckIcon },
  { id: "2", name: "Badminton", icon: UserRoundIcon },
  { id: "3", name: "Football", icon: HouseIcon },
  { id: "4", name: "Swimming", icon: Gamepad2Icon },
  { id: "5", name: "Football", icon: HouseIcon },
  { id: "6", name: "Badminton", icon: UserRoundIcon },
];

const GamesScreen = () => {
  return (
    <FlatList
      data={sportsData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item: { name, icon: Icon } }) => (
        <View style={styles.itemContainer}>
          <View className="rounded-full items-center justify-center" style={styles.iconCircle}>
            <Icon size={30} color="black" />
          </View>
          <CustomText className={`font-medium`} size={12} style={styles.txt}>{name}</CustomText>
        </View>
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
    width: hp(7),
    height: hp(7),
    backgroundColor: COLORS.gradient,
  },
  txt : {
    marginTop: hp(1)
  }
});

export default GamesScreen;
