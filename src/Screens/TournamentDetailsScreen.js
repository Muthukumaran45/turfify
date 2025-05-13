import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from "react-native-responsive-fontsize";
import CustomText from "../Components/Texts/CustomText";
import { COLORS } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../Components/Buttons/CustomButton";
import Header from "../Components/Headers/Header";


const TournamentDetailsScreen = () => {
  const route = useRoute();
  const { tournament } = route.params;

  const navigation = useNavigation();


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}

      <View style={{ paddingHorizontal: hp(2), }}>
        <Header title="Tournament Details" paddingLeft={hp(10)} />
      </View>

      {/* Display Image */}
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Image source={{ uri: tournament.banner }} style={styles.image} resizeMode="cover" />
      </View>

    

      {/* Skills & Requirements Section */}
      <View style={styles.sectionContainer}>
        <CustomText size={2.3} fontWight='700'>Rules</CustomText>
        <CustomText MT={2}>{tournament.rules}</CustomText>

      </View>

  
      <View style={{
        position: 'absolute',
        bottom: hp(4),
        left: 0,
        right: 0,
        marginHorizontal: hp(2),
      }}>
        <CustomButton
          title={'Enroll Now'}
          onPress={() => navigation.navigate("TournamentFormScreen", { id: tournament._id })}
          style={{ marginBottom: hp(4), marginHorizontal: hp(2), borderRadius: hp(1) }}

          height={hp(7)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",

  },
  image: {
    width: "100%",
    height: hp(20),
    borderRadius: hp(2),
  },
  sectionContainer: {
    backgroundColor: "#F5F5F5",
    padding: hp(2),
    borderRadius: hp(1.5),
    margin: hp(2),
  },

  sectionText: {
    fontSize: rf(2),
    color: "#333",
    marginBottom: hp(0.5),
  },
});

export default TournamentDetailsScreen;
