import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";
import { Heart } from "lucide-react-native";
import { COLORS } from "../../Constants/Colors";

const CardItem = ({ item, onPress }) => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
      <TouchableOpacity
        style={styles.like}
        onPress={() => setLiked(!liked)}
      >
        <Heart size={hp(3)} color={COLORS.likedColor} fill={liked ? COLORS.likedColor : "none"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const HorizontalCardList = ({ data, onPressItem }) => (
  <FlatList
    data={data}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <CardItem item={item} onPress={onPressItem} />}
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(2),
    position: "relative",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp("2%"),
    marginRight: wp("3%"),
    width: wp("40%"),
    height: hp("26%"),
    elevation: 3,
    overflow: "hidden",
    marginVertical: hp(1.5),
  },
  image: {
    width: "100%",
    height: hp("14%"),
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
  title: {
    fontSize: rf(2.2),
    fontWeight: "bold",
  },
  location: {
    fontSize: rf(1.8),
    color: "gray",
  },
  price: {
    fontSize: rf(2),
    fontWeight: "bold",
    color: "green",
  },
  rating: {
    fontSize: rf(2),
    color: "orange",
  },
});

export default HorizontalCardList;
