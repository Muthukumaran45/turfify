import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const ImageSlider = ({ slides, style, bg, inactiveDotColor, activeDotColor, interval = 4000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const slideWidth = wp(94) + wp(6); 
  
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (flatListRef.current && slides.length > 0) {
        const nextIndex = (activeIndex + 1) % slides.length;
        
        if (activeIndex === slides.length - 1) {
          // When at the last image, first reset to the start without animation
          flatListRef.current.scrollToOffset({ 
            offset: 0,
            animated: false
          });
          
          // Then after a brief moment, animate to the first item
          setTimeout(() => {
            setActiveIndex(0);
          }, 10);
        } else {
          // Normal scroll to next item
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setActiveIndex(nextIndex);
        }
      }
    }, interval);
 
    return () => clearInterval(autoScroll);
  }, [activeIndex, slides.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  // Function to handle manual scrolling
  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / slideWidth);
    setActiveIndex(index);
  };

  return (
    <View>
      <View style={[styles.container, style, { backgroundColor: bg }]}>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          )}
          // This prevents the bounce effect at the ends
          bounces={false}
        />
      </View>
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: inactiveDotColor || "#aaa" },
              activeIndex === index ? { backgroundColor: activeDotColor || "#000", width: wp(2) } : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: wp(94),
    height: hp(23),
    borderRadius: wp(4),
    marginHorizontal: wp(3),
  },
  pagination: {
    flexDirection: "row",
    marginTop: hp(1.5),
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: hp(20)
  },
  dot: {
    width: hp(1),
    height: hp(1),
    marginHorizontal: wp(1),
    borderRadius: wp(1),
  },
});

export default ImageSlider;