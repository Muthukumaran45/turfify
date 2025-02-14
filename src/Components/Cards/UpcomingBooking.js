import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import { MapPin, Clock, MoreVertical } from 'lucide-react-native';

const UpcomingBooking = ({ booking, onView, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  return (
    <View style={{ marginBottom: hp(2) }}>
      {/* Title (Outside the white card) */}
      <Text style={styles.title}>Upcoming Bookings</Text>

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
          <Text style={{ fontSize: rf(2), color: '#1E90FF', fontWeight: 'bold' }}>
            {booking.date}
          </Text>
          <Text style={{ fontSize: rf(2), fontWeight: 'bold', marginLeft: wp(2) }}>
            {booking.title}
          </Text>
        </View>

        {/* Venue */}
        <View style={styles.infoRow}>
          <MapPin size={rf(2.5)} color="green" />
          <Text style={styles.infoLabel}>Venue:</Text>
          <Text style={styles.infoText}>{booking.venue}</Text>
        </View>

        {/* Time */}
        <View style={styles.infoRow}>
          <Clock size={rf(2.5)} color="orange" />
          <Text style={styles.infoLabel}>Time:</Text>
          <Text style={styles.infoText}>{booking.time}</Text>
        </View>

        {/* Pop-up Menu (Below MoreVertical Icon) */}
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => { onView(); setMenuVisible(false); }}>
              <Text style={styles.menuItem}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onDelete(); setMenuVisible(false); }}>
              <Text style={styles.menuItem}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#000',
    marginLeft: wp(5),
    marginBottom: hp(1),
    
  },
  card: {
    backgroundColor: '#F8F9FA',
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
  infoLabel: {
    fontSize: rf(1.8),
    fontWeight: 'bold',
    marginLeft: wp(2),
    color: '#000',
  },
  infoText: {
    fontSize: rf(1.8),
    marginLeft: wp(1),
    color: '#333',
    flexShrink: 1,
  },
  menu: {
    position: 'absolute',
    top: hp(4),
    right: wp(3),
    backgroundColor: 'white',
    padding: wp(2),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    fontSize: rf(2),
    paddingVertical: hp(0.5),
    textAlign: 'left',
    color: '#333',
    fontWeight: 'bold',
  },
});

export default UpcomingBooking;
