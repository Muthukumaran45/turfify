import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from 'react-native-responsive-fontsize';

// Icons
import { Heart, CrownIcon, PhoneCallIcon } from 'lucide-react-native';
import CustomButton from '../Buttons/CustomButton';

// components
import CustomText from '../Texts/CustomText';
import { COLORS } from '../../Constants/Colors';
import { Nunito_Bold } from '../../Constants/FontFamily';


// Wishlist Card List Component
const WishListCard = ({ data , onPressBtn}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CardItem item={item} onPressBtn={onPressBtn} />}
      contentContainerStyle={{ paddingBottom: hp(15) }}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Card Component
const CardItem = ({ item, onPressBtn }) => {
  if (!item || !item.images || item.images.length === 0) {
    return null; // Avoid crashing when item is undefined
  }

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.card}>
      {/* Favorite Heart */}
      {item.discount && (
        <View style={styles.favorite}>
          <Heart size={hp(3.5)} fill={"red"} color={"red"} />
        </View>
      )}

      {/* Image Carousel */}
      <View>
        <FlatList
          ref={flatListRef}
          data={item.images}
          keyExtractor={(img, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} resizeMode='cover' />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / wp(100));
            setCurrentIndex(index);
          }}
        />

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {item.images.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.info}>
        {/* Title Row with Rating & Distance */}
        <View style={styles.titleRow}>
          <CustomText size={2.3} fontFamily={Nunito_Bold}>{item.title}</CustomText>
          <View style={styles.ratingDistanceContainer}>
            <CustomText>⭐ ({item.rating})</CustomText>
            <View style={styles.middleBorder} />
            <CustomText>Distance <CustomText color={COLORS.primary}>(1.5 km)</CustomText></CustomText>
          </View>
        </View>

        <View>
          <CustomText MT={.5} MB={.5}>📍 {item.location}</CustomText>
          <CustomText>🏷️ Price Start From <CustomText color='#023101' fontFamily={Nunito_Bold}>{item.price}</CustomText></CustomText>
        </View>

        {/* Bottom Row: Icons on Left, Book Now on Right */}
        <View style={styles.bottomRow}>
          {/* Icons */}
          <View style={styles.icons}>
            <CrownIcon size={rf(2.5)} color="gray" />
            <PhoneCallIcon size={rf(2.5)} color="gray" style={{ marginLeft: wp('2%') }} />
          </View>

          {/* Book Now Button */}
          <TouchableOpacity style={styles.bookNow} onPress={onPressBtn}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WishListCard;

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    width: '100%',
    elevation: 3,
    overflow: 'hidden',
  },
  favorite: {
    position: 'absolute',
    top: 10,
    right: hp(.8),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    zIndex: 1,
  },
  image: { width: wp(100), height: hp(23) },
  pagination: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: hp(1),
    height: hp(1),
    borderRadius: hp(100),
    backgroundColor: 'gray', 
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: hp(1),
    height: hp(1),
  },
  info: { padding: wp('2%'), paddingHorizontal: wp(3) },
  location: { fontSize: rf(2), color: 'gray', marginTop: hp('0.5%') },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: rf(2), marginVertical: hp('1%') },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%') },
  ratingDistanceContainer: { flexDirection: 'row', alignItems: 'center' },
  middleBorder: { width: wp('0.3%'), height: hp('2%'), backgroundColor: 'gray', marginHorizontal: wp('2%') },
  icons: { flexDirection: 'row' },
  bookNow: { backgroundColor: 'green', paddingVertical: hp('1%'), paddingHorizontal: wp('5%'), borderRadius: wp('2%') },
  bookNowText: { color: 'white', fontSize: rf(2), fontWeight: 'bold' },

});
