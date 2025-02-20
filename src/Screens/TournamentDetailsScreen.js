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
    <View>
      <Header title="" />
    </View>

      {/* Display Image */}
      <View style={{ marginHorizontal: hp(2), marginTop: hp(5) }}>
        <Image source={{ uri: tournament.banner }} style={styles.image} resizeMode="cover" />
      </View>

      {/* Skills & Requirements Section */}
      <View style={styles.sectionContainer}>
        <CustomText size={2.3} fontWight='700'>Skills & Requirements</CustomText>
        <CustomText MT={2}>• 3 years experience</CustomText>
        <CustomText MT={.8}>• Degree in Computer Science, Psychology, Design or any other related fields.</CustomText>
        <CustomText MT={.8}>• Proficiency in User Personas, Competitive Analysis, Empathy Maps and Information Architecture.</CustomText>
      </View>

      {/* Role Section */}
      <View style={styles.sectionContainer}>
        <CustomText size={2.3} fontWight='700'>Your Role</CustomText>
        <CustomText MT={2}>
          As a UX Designer, you will be directly responsible for helping the evolution of enterprise design systems at Google.
          You will engineer solutions that create shareable web components to be used in enterprise products within the organization.
          You’ll support multiple different product areas and collaborate with multiple job functions across the globe.
        </CustomText>
      </View>

      {/* Benefits Section */}
      <View style={styles.sectionContainer}>
        <CustomText size={2.3} fontWight='700'>Benefits</CustomText>
        <CustomText MT={2}>
          As a UX Designer, you will be directly responsible for helping the evolution of enterprise design systems at Google.
          You will engineer solutions that create shareable web components to be used in enterprise products within the organization.
          You’ll support multiple different product areas and collaborate with multiple job functions across the globe.
        </CustomText>
      </View>

      <CustomButton
        title={'Enroll Now'}
        onPress={() => navigation.navigate("TournamentFormScreen")}
        style={{ marginBottom: hp(4) }}
        className={`rounded-md`}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: hp(2),
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
    marginVertical: hp(2),
  },

  sectionText: {
    fontSize: rf(2),
    color: "#333",
    marginBottom: hp(0.5),
  },
});

export default TournamentDetailsScreen;
