import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FadeImageSlider = ({ slides, interval = 3000, fadeDuration = 500, style }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      opacity.value = withTiming(0, { duration: fadeDuration }, () => {
        runOnJS(updateIndex)();
      });
    }, interval);

    return () => clearInterval(sliderInterval);
  }, []);

  const updateIndex = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % slides.length;
      runOnJS(triggerFadeIn)();
      return nextIndex;
    });
  };

  const triggerFadeIn = () => {
    opacity.value = withTiming(1, { duration: fadeDuration });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={{ uri: slides[activeIndex]?.image }}
        style={[styles.image, animatedStyle]}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index ? styles.activeDot : {}]} />
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
    width: wp(100),
    height: hp(25),
    borderRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    marginTop: hp(1.5),
  },
  dot: {
    width: wp(2),
    height: hp(1),
    backgroundColor: "#aaa",
    marginHorizontal: hp(0.5),
    borderRadius: hp(500),
  },
  activeDot: {
    backgroundColor: "#000",
    width: wp(2),
    height: hp(1),
  },
});

export default FadeImageSlider;
