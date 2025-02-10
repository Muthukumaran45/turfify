import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FadeImageSlider = (
  { slides,
    interval = 3000,
    fadeDuration = 500,
    style,
    bg,
    inactiveDotColor,
    activeDotColor
  }) => {
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
    <View>
      <View style={[styles.container, style, { backgroundColor: bg, }]}>
        <Animated.Image
          source={{ uri: slides[activeIndex]?.image }}
          style={[styles.image, animatedStyle]}
          resizeMode={"contain"}
        />
      </View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View key={index} style={[{backgroundColor: inactiveDotColor ||"#aaa",}, styles.dot, activeIndex === index ? styles.activeDot && { backgroundColor: activeDotColor || "#000",} : {}]} />
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
    height: hp(20),
    borderRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    marginTop: hp(1.5),
    justifyContent: "center"
  },
  dot: {
    width: wp(2),
    height: hp(1),

    marginHorizontal: hp(0.5),
    borderRadius: hp(500),
  },
  activeDot: {
   
    width: wp(2),
    height: hp(1),
  },
});

export default FadeImageSlider;
