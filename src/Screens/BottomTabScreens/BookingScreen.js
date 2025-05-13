import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";

// package
import { useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MapPin, Clock } from "lucide-react-native";
import axios from "axios";
// internet-check
import NetInfo from '@react-native-community/netinfo';

// components
import Header from "../../Components/Headers/Header";
import PastBookingCard from "../../Components/Cards/PastBookingCard";

// data's
import CustomText from "../../Components/Texts/CustomText";
import { Nunito_Bold } from "../../Constants/FontFamily";
import { COLORS } from "../../Constants/Colors";
import { API_URL } from "../../Services/Api";

// zustand
import useUserStore from "../../Zustand/Zustand"

// utils
import { extractTime } from "../../Utils/timeUtil";

const BookingScreen = () => {
  const route = useRoute();
  const { defaultTab } = route.params || {};

  const [activeTab, setActiveTab] = useState(defaultTab || "Upcoming");
  const token = useUserStore((state) => state.token);
  const [bookingData, setBookingData] = useState({
    upcoming: [],
    past: []
  });

  // internet
  const [isConnected, setIsConnected] = useState(true);
  // internet
  useEffect(() => {
    if (Platform.OS === 'android') {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
        if (!state.isConnected) {
          console.log('Internet is OFF on Android');
        }
      });

      return () => unsubscribe();
    }
  }, []);


  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
  };


  const [loading, setLoading] = useState(true);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/bookings/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data.data;
      // console.log("booking =", data)

      if (data && Array.isArray(data)) {
        // Filter bookings based on date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to beginning of today

        const upcomingBookings = [];
        const pastBookings = [];

        data.forEach(booking => {
          const bookingDate = new Date(booking.date);

          // Add image placeholder for demo
          const bookingWithImage = {
            ...booking,
            image: "https://via.placeholder.com/300x200"
          };

          if (bookingDate >= today) {
            upcomingBookings.push(bookingWithImage);
          } else {
            pastBookings.push(bookingWithImage);
          }
        });
        setBookingData({
          upcoming: upcomingBookings,
          past: pastBookings
        });
      }

      setLoading(false);
    } catch (error) {
      console.log("Error fetching booking data: ", error);
      setLoading(false);
    }
  };


  // Format date to extract month and day
  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();

    return { month, date: day };
  };

  // Format time slots array
  const formatTimeSlots = (timeArray) => {
    if (!timeArray || !Array.isArray(timeArray) || timeArray.length === 0) {
      return "Time not available";
    }

    return timeArray.join(", ");
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  const renderUpcomingItem = ({ item }) => {
    const { month, date } = formatBookingDate(item.date);

    const timeRange = extractTime(item?.selectedSlots);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={2} color="#0E614C">{month} - <CustomText size={2.5} color="#0E614C">{date}</CustomText> </CustomText>
            <CustomText size={2.5} ML={1.5} fontFamily={Nunito_Bold}>{item.turfName}</CustomText>
          </View>

          <View style={styles.row}>
            <MapPin size={18} color="#FFA500" />
            <CustomText ML={1}>Venue : <CustomText color="#787878"> {item.address}</CustomText></CustomText>
          </View>
          <View style={styles.row}>
            <Clock size={18} color="#FFA500" />
            <CustomText ML={1}>Time : <CustomText color="#787878">{timeRange}</CustomText></CustomText>
          </View>
          <View style={styles.row}>
            <Clock size={18} color="#FFA500" />
            <CustomText ML={1}>
              Date{" "}:{" "}
              <CustomText color="#787878">
                {item.date
                  ? item.date.split("-").reverse().join("-")
                  : ""}
              </CustomText>
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  // Transform the API data to match the format expected by PastBookingCard
  const formatPastBookingData = () => {
    return bookingData.past.map(item => ({
      image: item.image,
      name: item.turfName,
      location: item.address.substring(0, 30) + "...",
      id: item._id,
      date: item.date,
      time: item.time.map((item) => item)
    }));
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: hp(2) }}>
        <Header title={'My Bookings'} />
      </View>

      {!isConnected ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: hp(4),
            marginTop: hp(20),
          }}
        >
          <View
            style={{
              height: hp(40),
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: hp(2),
              elevation: 4,
              alignItems: 'center',
              justifyContent: 'center',
              padding: hp(3),
            }}
          >
            <Image
              source={require('../../Assets/no-connection.png')}
              style={{
                width: hp(20),
                height: hp(20),
                resizeMode: 'contain',
                marginBottom: hp(2),
              }}
            />
            <CustomText style={{ fontSize: hp(2.5), fontWeight: '600', marginBottom: hp(1) }}>
              No Internet Connection
            </CustomText>
            <CustomText style={{ fontSize: hp(1.8), color: '#6c757d', textAlign: 'center' }}>
              Please check your internet settings and try again.
            </CustomText>

            <TouchableOpacity
              onPress={handleRetry}
              style={{
                marginTop: hp(3),
                backgroundColor: '#378E26',
                paddingVertical: hp(1),
                paddingHorizontal: hp(4),
                borderRadius: hp(1),
              }}
            >
              <CustomText style={{ color: '#fff', fontSize: hp(2), fontWeight: '600' }}>
                Retry
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Upcoming" && styles.activeTab]}
              onPress={() => setActiveTab("Upcoming")}
            >
              <CustomText fontFamily={Nunito_Bold} size={2.3} style={[styles.tabText, activeTab === "Upcoming" && styles.activeTabText]}>
                Upcoming
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Past Booking" && styles.activeTab]}
              onPress={() => setActiveTab("Past Booking")}
            >
              <CustomText fontFamily={Nunito_Bold} size={2.3} style={[styles.tabText, activeTab === "Past Booking" && styles.activeTabText]}>
                Past Booking
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Loading indicator or data display */}
          {loading ? (
            <View style={styles.centerContainer}>
              <CustomText>Loading bookings...</CustomText>
            </View>
          ) : (
            <>
              {/* Upcoming Bookings */}
              {activeTab === "Upcoming" && (
                bookingData.upcoming.length > 0 ? (
                  <FlatList
                    data={bookingData.upcoming}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ paddingBottom: hp(10) }}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderUpcomingItem}
                    ListFooterComponent={<View style={{ height: hp(5) }} />}
                  />
                ) : (
                  <View style={styles.centerContainer}>
                    <CustomText>No upcoming bookings found</CustomText>
                  </View>
                )
              )}

              {/* Past Bookings */}
              {activeTab === "Past Booking" && (
                bookingData.past.length > 0 ? (
                  <View>
                    <PastBookingCard data={formatPastBookingData()} />
                  </View>
                ) : (
                  <View style={styles.centerContainer}>
                    <CustomText>No past bookings found</CustomText>
                  </View>
                )
              )}
            </>
          )}
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: hp(2)
  },
  tab: {
    paddingVertical: hp(1.5),
    backgroundColor: "#E0E0E0",
    width: wp(50),
    alignItems: "center"
  },
  activeTab: {
    backgroundColor: "#2C3E50"
  },
  tabText: {
    color: "#8F8F8F"
  },
  activeTabText: {
    color: "#FFF"
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: wp(3),
    marginBottom: hp(2),
    overflow: "hidden",
    elevation: 3,
    marginHorizontal: hp(2)
  },
  image: {
    width: "100%",
    height: hp(20)
  },
  cardContent: {
    padding: wp(2),
    paddingHorizontal: wp(3)
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(0.5)
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default BookingScreen;