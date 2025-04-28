import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import { MapPin, Clock, MoreVertical } from 'lucide-react-native';
import CustomHeaderText from '../Texts/CustomHeaderText';
import CustomText from '../Texts/CustomText';

const UpcomingBooking = ({ booking, onView, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  return (
    <View style={{ marginBottom: hp(2) }}>
      {/* Title (Outside the white card) */}
      <CustomHeaderText  style={styles.title}>Upcoming Bookings</CustomHeaderText>

      {/* Booking Card */}
      <View style={styles.card}>
        {/* Menu Button (Top Right Corner) */}
        <TouchableOpacity
          ref={menuRef}
          style={styles.menuButton}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <MoreVertical size={rf(2.5)} color="#333" />
        </TouchableOpacity>

        {/* Booking Details */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(1) }}>
          <CustomText size={2} color='#0E614C'>{booking.date}</CustomText>
          <CustomText size={2.8} ML={1} fontWight='700'>{booking.title}</CustomText>
        </View>

        {/* Venue */}
        <View style={styles.infoRow}>
          <MapPin size={rf(2.5)} color="green" />
          <CustomText ML={1}>Venue:</CustomText>
          <CustomText ML={1}>{booking.venue}</CustomText>
        </View>

        {/* Time */}
        <View style={styles.infoRow}>
          <Clock size={rf(2.5)} color="orange" />
          <CustomText ML={1}>Time:</CustomText>
          <CustomText ML={1}>{booking.time}</CustomText>
        </View>

        {/* Pop-up Menu (Below MoreVertical Icon) */}
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => { onView(); setMenuVisible(false); }}>
              <CustomText size={2.3}>View</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop: hp(1)}} onPress={() => { onDelete(); setMenuVisible(false); }}>
              <CustomText size={2.3}>Delete</CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: wp(5),
    marginBottom: hp(1),
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

});

export default UpcomingBooking;
