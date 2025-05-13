import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";

// components
import CustomText from "../Texts/CustomText";
import { COLORS } from "../../Constants/Colors";
import CustomButton from "../Buttons/CustomButton";
import { Nunito_Bold } from "../../Constants/FontFamily";

// utils
import { navigate } from '../../Utils/NavigationUtil';

// icons
import { MapPin, Clock, MoreVertical, Calendar } from 'lucide-react-native';



const TournamentCard = ({ item }) => {

  console.log("tournament data ==", item)

  return (
    <View style={styles.card}>
      <StatusBar backgroundColor={COLORS.statusBarColor} barStyle={"dark-content"} />
      <Image source={{ uri: item?.banner }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <CustomText size={2} fontFamily={Nunito_Bold}>{item.title}</CustomText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MapPin size={rf(2)} color="green" />
          <CustomText MT={.5} MB={.5} ML={1}>
            {item?.venue}
          </CustomText>
        </View>


        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar size={rf(2)} color="#4B0082" />
          <CustomText MT={.5} MB={.5} ML={1}>
            {item?.date?.split("-")?.reverse()?.join("-")}
          </CustomText>
        </View>

        <CustomText MT={1} ML={2.7}>
          Team Size:<CustomText color="#E23E2B"> {item?.teamSize}</CustomText>
        </CustomText>
      </View>


      <CustomButton
        title={'Enroll Now'}
        height={hp(6)}
        size={hp(2.3)}
        onPress={() => navigate("TournamentDetailsScreen", { tournament: item })}
      />


    </View>
  );
};

const TournamentCardList = ({ data, style }) => {
  return (
    <FlatList
      data={data || []}
      keyExtractor={(item, index) => item._id || index.toString()}
      renderItem={({ item }) => (
        <View style={style}>
          <TournamentCard item={item} />
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
    marginBottom: hp(2),
    elevation: 3,
    overflow: "hidden",
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
