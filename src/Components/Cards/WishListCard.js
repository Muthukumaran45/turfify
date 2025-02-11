import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage as rf } from 'react-native-responsive-fontsize';

// Icons
import { Heart, CrownIcon, PhoneCallIcon } from 'lucide-react-native';
import CustomButton from '../Buttons/CustomButton';

// Wishlist Card List Component
const WishListCard = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CardItem item={item} />}
      contentContainerStyle={{ paddingBottom: hp(15) }}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Card Component
const CardItem = ({ item }) => {
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
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.price}>🏷️ Price: <Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>

        <View style={styles.bottomRow}>
          <View className={`flex-row`}>
            <CrownIcon size={rf(2.5)} color="gray" />
            <PhoneCallIcon size={rf(2.5)} color="gray" style={{ marginLeft: wp('2%') }} />
          </View>

          {/* Book Again Button */}
          <CustomButton title={"Book Again"} className={`rounded-md`} style={{ height: hp(4.5) }} />
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
    borderRadius: wp('2%'),
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
    width: 8,
    height: 8,
    borderRadius: hp(100),
    backgroundColor: 'gray', 
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 10,
    height: 10,
  },
  info: { padding: wp('3%') },
  title: { fontSize: rf(2.5), fontWeight: 'bold' },
  location: { fontSize: rf(2), color: 'gray', marginTop: hp('0.5%') },
  price: { fontSize: rf(2), marginVertical: hp('1%') },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%') },
});
