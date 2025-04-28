import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";

// package
import { useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MapPin, Clock } from "lucide-react-native";

// components
import Header from "../../Components/Headers/Header";
import PastBookingCard from "../../Components/Cards/PastBookingCard";

// data's
import { pastBookingData, bookings } from "../../Constants/Datas";
import CustomText from "../../Components/Texts/CustomText";
import { Nunito_Bold } from "../../Constants/FontFamily";
import { COLORS } from "../../Constants/Colors";



const BookingScreen = () => {
  const route = useRoute();
  const { defaultTab } = route.params || {};

  const [activeTab, setActiveTab] = useState(defaultTab || "Upcoming");

  return (
    <View style={styles.container}>

      <View style={{ paddingHorizontal: hp(2) }}>
        <Header title={'My Bookings'} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("Upcoming")}
        >
          <CustomText fontFamily={Nunito_Bold} size={2.3} style={[styles.tabText, activeTab === "Upcoming" && styles.activeTabText]}>Upcoming</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Past Booking" && styles.activeTab]}
          onPress={() => setActiveTab("Past Booking")}
        >
          <CustomText fontFamily={Nunito_Bold} size={2.3} style={[styles.tabText, activeTab === "Past Booking" && styles.activeTabText]}>Past Booking</CustomText>
        </TouchableOpacity>
      </View>

      {/* Booking List */}
      {activeTab === "Upcoming" ? (
        <FlatList
          data={bookings.upcoming}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: hp(10) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>

                <View className="flex-row items-center">
                  <CustomText size={2} color="#0E614C">{item.month} - <CustomText size={2.5} color="#0E614C">{item.date}</CustomText> </CustomText>
                  <CustomText size={2.5} ML={1.5} fontFamily={Nunito_Bold}>{item.title}</CustomText>
                </View>

                <View style={styles.row}>
                  <MapPin size={18} color="#FFA500" />
                  <CustomText ML={1}>Venue : <CustomText color="#787878"> {item.venue}</CustomText></CustomText>
                </View>
                <View style={styles.row}>
                  <Clock size={18} color="#FFA500" />
                  <CustomText ML={1}>Time : <CustomText color="#787878"> {item.time}</CustomText></CustomText>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={<View style={{ height: hp(5) }} />}
        />
      ) : (
        <View >
          <PastBookingCard data={pastBookingData} />
        </View>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  tabContainer: { flexDirection: "row", marginVertical: hp(2), },
  tab: { paddingVertical: hp(1.5), backgroundColor: "#E0E0E0", width: wp(50), alignItems: "center" },
  activeTab: { backgroundColor: "#2C3E50" },
  tabText: { color: "#8F8F8F" },
  activeTabText: { color: "#FFF", },
  card: { backgroundColor: "#FFF", borderRadius: wp(3), marginBottom: hp(2), overflow: "hidden", elevation: 3, marginHorizontal: hp(2) },
  image: { width: "100%", height: hp(20) },
  cardContent: { padding: wp(2), paddingHorizontal: wp(3) },
  row: { flexDirection: "row", alignItems: "center", marginTop: hp(0.5) },
  venue: { marginLeft: wp(2), fontSize: RFPercentage(2), color: "#444" },
  time: { marginLeft: wp(2), fontSize: RFPercentage(2), color: "#444" },
  distance: { fontSize: RFPercentage(2), color: "#444", marginVertical: hp(1) },
  bookAgainButton: { backgroundColor: "#28A745", padding: hp(1), borderRadius: wp(2), alignItems: "center" },
  bookAgainText: { color: "#FFF", fontWeight: "bold", fontSize: RFPercentage(2) },
});

export default BookingScreen;
