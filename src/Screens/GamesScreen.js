import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// icons
import { LaptopMinimalCheckIcon, UserRoundIcon, HouseIcon, Gamepad2Icon } from "lucide-react-native"; // Use available icons

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from "../Constants/Colors";
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
          <CustomText className={`font-medium`}>{name}</CustomText>
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
    width: hp(9),
    height: hp(9),
    backgroundColor: COLORS.gradient,
  },
});

export default GamesScreen;
