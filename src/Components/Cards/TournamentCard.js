import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";

// components
import CustomText from "../Texts/CustomText";
import { COLORS } from "../../Constants/Colors";
import CustomButton from "../Buttons/CustomButton";
import { Nunito_Bold } from "../../Constants/FontFamily";

const TournamentCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.banner }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <CustomText size={2} fontFamily={Nunito_Bold}>{item.title}</CustomText>
        <CustomText MT={.5} MB={.5}>
          📍 {item.venue}
        </CustomText>
        <CustomText >
          📅 {item.date}
        </CustomText>
        <CustomText MT={1} ML={2.7}>
          Team<CustomText color="#E23E2B"> Size: {item.teamSize}</CustomText>
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
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    elevation: 3,
    overflow: "hidden",
    paddingBottom: hp(1),
  },
  image: {
    width: "100%",
    height: hp(20),
    borderBottomRightRadius: wp(3),
    borderBottomLeftRadius: wp(3),
  },
  info: {
    padding: wp(2),
  },

});

export default TournamentCardList;
