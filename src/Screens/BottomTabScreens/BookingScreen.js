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
          <Text style={[styles.tabText, activeTab === "Upcoming" && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Past Booking" && styles.activeTab]}
          onPress={() => setActiveTab("Past Booking")}
        >
          <Text style={[styles.tabText, activeTab === "Past Booking" && styles.activeTabText]}>Past Booking</Text>
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
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.row}>
                  <MapPin size={18} color="#FFA500" />
                  <Text style={styles.venue}>{item.venue}</Text>
                </View>
                <View style={styles.row}>
                  <Clock size={18} color="#FFA500" />
                  <Text style={styles.time}>{item.time}</Text>
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
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  tabContainer: { flexDirection: "row", marginVertical: hp(2), },
  tab: { paddingVertical: hp(1.5), backgroundColor: "#E0E0E0", width: wp(50), alignItems: "center" },
  activeTab: { backgroundColor: "#2C3E50" },
  tabText: { fontSize: RFPercentage(2), color: "#000" },
  activeTabText: { color: "#FFF", fontWeight: "bold" },
  card: { backgroundColor: "#FFF", borderRadius: wp(3), marginBottom: hp(2), overflow: "hidden", elevation: 3, marginHorizontal: hp(2)  },
  image: { width: "100%", height: hp(20) },
  cardContent: { padding: wp(4) },
  title: { fontSize: RFPercentage(2.5), fontWeight: "bold" },
  date: { fontSize: RFPercentage(2), color: "#555" },
  row: { flexDirection: "row", alignItems: "center", marginTop: hp(0.5) },
  venue: { marginLeft: wp(2), fontSize: RFPercentage(2), color: "#444" },
  time: { marginLeft: wp(2), fontSize: RFPercentage(2), color: "#444" },
  distance: { fontSize: RFPercentage(2), color: "#444", marginVertical: hp(1) },
  bookAgainButton: { backgroundColor: "#28A745", padding: hp(1), borderRadius: wp(2), alignItems: "center" },
  bookAgainText: { color: "#FFF", fontWeight: "bold", fontSize: RFPercentage(2) },
});

export default BookingScreen;
