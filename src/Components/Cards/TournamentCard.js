import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";

// components
import CustomText from "../Texts/CustomText";
import { COLORS } from "../../Constants/Colors";
import CustomButton from "../Buttons/CustomButton";

const TournamentCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <CustomText className="font-medium">{item.title}</CustomText>
        <CustomText className="text-gray-400" size={14} style={{ marginVertical: hp(0.5) }}>
          📍 {item.venue}
        </CustomText>
        <CustomText className="text-gray-400" size={14}>
          📅 {item.date}
        </CustomText>
        <CustomText size={14} style={{ marginTop: hp(0.5) }}>
          Team Size: <CustomText size={14} className="text-red-500 font-medium">{item.teamSize}</CustomText>
        </CustomText>
      </View>
    </View>
  );
};

const TournamentCardList = ({ data , style}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={style}>
          <TournamentCard item={item} />

          <CustomButton
            title={'Enroll Now'}
            onPress={() => navigation.navigate("TournamentDetailsScreen", { tournament: item })}
            style={{ marginBottom: hp(4) }}
            className={`rounded-md`}
          />
        </View>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp(2),
    marginBottom: hp(1.5),
    elevation: 3,
    overflow: "hidden",
    paddingBottom: hp(1),
  },
  image: {
    width: "100%",
    height: hp(20),
  },
  info: {
    padding: wp(4),
  },

});

export default TournamentCardList;
