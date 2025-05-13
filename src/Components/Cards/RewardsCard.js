import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../Constants/Colors";
import CustomText from "../Texts/CustomText";
import { truncateText } from "../../Utils/Scaling";
import { Nunito_Bold } from "../../Constants/FontFamily";

const CardItem = ({ item, onPress, onPressBtn }) => {
  const [liked, setLiked] = useState(false);

  const progress = (item.currentBookings / item.bookingsRequired) * 100;
  const isRewardReady = item.currentBookings >= item.bookingsRequired;

  return (
    <View style={styles.cardWrapper}>
      {/* Card */}
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <CustomText size={1.9} fontFamily={Nunito_Bold}>{truncateText(item.title, 16)}</CustomText>
          <CustomText>{truncateText(item.location, 19)}</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <CustomText MT={.5}>{truncateText(item.price, 10)}</CustomText>
            <CustomText>⭐ ({item.rating})</CustomText>
          </View>
        </View>

      </TouchableOpacity>

      {/* Progress Row */}
      <View style={styles.progressRow}>
        <View style={styles.progressWrapper}>
          <LinearGradient
            colors={["#33CC66", "#173F63"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.progressBar,
              { width: `${Math.min(progress, 100)}%` },
            ]}
          />
        </View>
        {isRewardReady ? (
          <Text style={styles.progressMax}>🏆</Text>
        ) : (
          <Text style={styles.progressMax}>{item.bookingsRequired}</Text>
        )}
      </View>

      <CustomText style={styles.bookingsText}>
        <CustomText>
          {item.bookingsRequired - item.currentBookings}{" "}
        </CustomText>
        booking{item.bookingsRequired - item.currentBookings !== 1 ? "s" : ""} more to reward!
      </CustomText>

      {/* Action Button */}
      <TouchableOpacity onPress={onPressBtn} style={[styles.button, isRewardReady ? styles.claimButton : styles.bookAgainButton]}>
        <CustomText fontFamily={Nunito_Bold} style={{ color: isRewardReady ? "#fff" : "#000" }}>
          {isRewardReady ? "🎉 Claim Your Reward" : "Book Again"}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const RewardsCard = ({ data, onPressBtn, onPress }) => (
  <FlatList
    data={data}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <CardItem item={item} onPress={onPress} onPressBtn={onPressBtn} />}
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(2),
  },
  cardWrapper: {
    marginRight: wp("3%"),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp("2%"),
    width: wp("40%"),
    height: hp("24.5%"),
    elevation: 3,
    overflow: "hidden",
    marginVertical: hp(1.5),
  },
  image: {
    width: "100%",
    height: hp("15%"),
  },
  like: {
    position: "absolute",
    right: hp(1),
    top: hp(1),
  },
  info: {
    height: hp("13%"),
    padding: wp("2%"),
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("40%"),
    marginLeft: hp(.2)
  },
  progressWrapper: {
    width: "85%",
    backgroundColor: "#ddd",
    height: hp(1),
    borderRadius: hp(0.5),
    overflow: "hidden",
  },
  progressBar: {
    height: hp(1),
    borderRadius: hp(0.5),
  },
  progressMax: {
    fontSize: rf(1.8),
    fontWeight: "bold",
    color: "black",
    marginLeft: wp(2),
  },
  bookingsText: {
    fontSize: rf(1.6),
    color: "#495057",
    marginTop: hp(0.5),
  },
  button: {
    width: wp("40%"),
    paddingVertical: hp(1),
    borderRadius: hp(1),
    alignItems: "center",
    marginTop: hp(1),
  },
  bookAgainButton: {
    backgroundColor: "#fff",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  claimButton: {
    backgroundColor: COLORS.claimRewardColor,
  },

});

export default RewardsCard;
