import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import { MapPin, Clock, MoreVertical, Calendar } from 'lucide-react-native';
import CustomHeaderText from '../Texts/CustomHeaderText';
import CustomText from '../Texts/CustomText';
import { COLORS } from '../../Constants/Colors';
import axios from 'axios';
import { API_URL } from '../../Services/Api';

// zustand
import useUserStore from "../../Zustand/Zustand"

// utils
import { extractTime } from '../../Utils/timeUtil';

const UpcomingBooking = ({ onView, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [upcomingBooking, setUpcomingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const menuRef = useRef(null);

  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchUpcomingBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/bookings/history`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data.data;
        if (data && Array.isArray(data)) {
          const now = new Date();
          const upcomingBookings = data.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= now;
          });

          upcomingBookings.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });

          if (upcomingBookings.length > 0) {
            setUpcomingBooking(upcomingBookings[0]);
          }
        }
      } catch (error) {
        console.log("Error fetching upcoming booking: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingBooking();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const timeRange = extractTime(upcomingBooking?.selectedSlots);

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeaderText style={styles.title}>Upcoming Bookings</CustomHeaderText>
        <View style={styles.card}>
          <CustomText>Loading bookings...</CustomText>
        </View>
      </View>
    );
  }

  if (!upcomingBooking) {
    return (
      <View>
     
      </View>
    );
  }

  const isLongAddress = upcomingBooking?.address?.length > 26;

  return (
    <View style={styles.container}>
      <CustomHeaderText style={styles.title}>Upcoming Bookings</CustomHeaderText>
      <View style={styles.card}>
        {/* Menu Button */}
        <TouchableOpacity
          ref={menuRef}
          style={styles.menuButton}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <MoreVertical size={rf(2.5)} color="#333" />
        </TouchableOpacity>

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(1) }}>
          <CustomText size={2} color='#0E614C'>{formatDate(upcomingBooking.date)}</CustomText>
          <CustomText size={2.8} ML={1} fontWight='700'>{upcomingBooking.turfName}</CustomText>
        </View>

        {/* Booking ID */}
        <View style={styles.infoRow}>
          <Calendar size={rf(2.5)} color="#4B0082" />
          <CustomText ML={1}>Booking ID:</CustomText>
          <CustomText ML={1} color='#6c757d'>{upcomingBooking.bookingId}</CustomText>
        </View>


        {/* Venue */}
        <View style={{
          flexDirection: 'row',
          marginBottom: hp(1),
        }}>
          <MapPin size={rf(2.5)} color="green" />
          <CustomText ML={1}>Venue:</CustomText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, }}>
            <CustomText color='#6c757d' ML={1} style={styles.addressText}>
              {showFullAddress || !isLongAddress
                ? upcomingBooking.address
                : `${upcomingBooking.address.slice(0, 26)}...`}
            </CustomText>
            {isLongAddress && (
              <TouchableOpacity onPress={() => setShowFullAddress(prev => !prev)}>
                <CustomText style={{ color: 'green', marginLeft: 4, textDecorationLine: "underline" }}>
                  {showFullAddress ? 'See less' : 'See more'}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Time */}
        <View style={styles.infoRow}>
          <Clock size={rf(2.5)} color="orange" />
          <CustomText ML={1}>Time:</CustomText>
          <CustomText color='#6c757d' ML={1}>{timeRange}</CustomText>
        </View>

        {/* Pop-up Menu */}
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => { onView(upcomingBooking); setMenuVisible(false); }}>
              <CustomText size={2.3}>View</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: hp(1) }} onPress={() => { onDelete(upcomingBooking._id); setMenuVisible(false); }}>
              <CustomText size={2.3}>Delete</CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
  },
  title: {
    marginLeft: wp(5),
    marginBottom: hp(1),
    color: COLORS.textHeader
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: wp(90),
    alignSelf: 'center',
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    top: hp(1.5),
    right: wp(3),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  menu: {
    position: 'absolute',
    top: hp(5),
    right: wp(3),
    backgroundColor: 'white',
    padding: wp(2),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
    paddingHorizontal: hp(2)
  },
  addressText: {
    flex: 1,
    flexWrap: 'wrap',
  }
});

export default UpcomingBooking;
