import React, { useState, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Animated } from 'react-native';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/Colors';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8; 
const SPACING = 14;

const Carousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        snapToInterval={ITEM_WIDTH + SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, i) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: hp(20),
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: "center"
  },
  dot: {
    width: hp(1),
    height: hp(1),
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: hp(1),
    height: hp(1),
    borderRadius: hp(50)
  },
});

export default Carousel;
