import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import { CrownIcon, PhoneCallIcon } from 'lucide-react-native'; // Import Lucide icons

// 🔹 Reusable Card Item Component
const CardItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Discount Badge */}
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}

      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain' />

      {/* Content */}
      <View style={styles.info}>
        {/* Title Row with Rating & Distance */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.ratingDistanceContainer}><Text style={styles.rating}>⭐ {item.rating}</Text>
            <View style={styles.middleBorder} />
            <Text style={styles.distance}>📍 1.5 km</Text>
          </View>
        </View>

        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.price}>🏷️ Price Start From <Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>

        {/* Bottom Row: Icons on Left, Book Now on Right */}
        <View style={styles.bottomRow}>
          {/* Icons */}
          <View style={styles.icons}>
            <CrownIcon size={rf(2.5)} color="gray" />
            <PhoneCallIcon size={rf(2.5)} color="gray" style={{ marginLeft: wp('2%') }} />
          </View>

          {/* Book Now Button */}
          <TouchableOpacity style={styles.bookNow}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 🔹 Reusable Card List Component
const CardList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CardItem item={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: { padding: wp('2%') },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    width: '100%',
    elevation: 3,
    overflow: 'hidden',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    zIndex: 1,
  },
  discountText: { color: 'white', fontWeight: 'bold', fontSize: rf(1.8) },
  image: { width: '100%', height: hp('20%') },
  info: { padding: wp('3%') },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: rf(2.5), fontWeight: 'bold', flex: 1 },
  ratingDistanceContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: rf(2), color: 'green' },
  middleBorder: { width: wp('0.5%'), height: hp('2%'), backgroundColor: 'gray', marginHorizontal: wp('2%') },
  distance: { fontSize: rf(2), color: 'gray' },
  location: { fontSize: rf(1.8), color: 'gray', marginTop: hp('0.5%') },
  price: { fontSize: rf(2), marginVertical: hp('1%') },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%') },
  icons: { flexDirection: 'row' },
  bookNow: { backgroundColor: 'green', paddingVertical: hp('1%'), paddingHorizontal: wp('5%'), borderRadius: wp('2%') },
  bookNowText: { color: 'white', fontSize: rf(2), fontWeight: 'bold' },
});

export default CardList;
