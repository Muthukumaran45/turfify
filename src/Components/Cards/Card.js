import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";


import { COLORS } from "../../Constants/Colors";
import { truncateText } from "../../Utils/Scaling";
import CustomText from "../Texts/CustomText";
import { Nunito_Bold } from "../../Constants/FontFamily";

// utils
import { API_URL } from "../../Services/Api";

// icons
import Ionicons from "react-native-vector-icons/Ionicons"

// packages
import axios from "axios";

// zustand
import useUserStore from "../../Zustand/Zustand"

const CardItem = ({ item, onPress }) => {
  const [liked, setLiked] = useState(false);
  // console.log("turffff =", item)

  // zustand
  const token = useUserStore((state) => state.token)
  const userid = useUserStore((state) => state.user)

  
  const likedTurf = async () => {

    payload = {
      userId: userid,

    }

    try {
      const response = await axios.post(`${API_URL}/favorites/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data


    } catch (error) {
      console.log("Error from  ", error)
    }

  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>

      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <CustomText size={2} fontFamily={Nunito_Bold}>{truncateText(item.title, 16)}</CustomText>
        <CustomText>{truncateText(item.location, 19)}</CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <CustomText MT={.5}>{truncateText(item.price, 10)}</CustomText>
          <CustomText>⭐ ({item.rating})</CustomText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.like}
        onPress={() => setLiked(!liked)}
      >
        <Ionicons name={liked ? "heart" : "heart-outline"} size={hp(3.5)} color={liked ? COLORS.likedColor : "#fff"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Card = ({ data, onPressItem }) => (
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

export default Card;