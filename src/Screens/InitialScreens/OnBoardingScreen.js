import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";

// packages
import { RFPercentage } from "react-native-responsive-fontsize";

// utils
import { resetAndNavigate } from "../../Utils/NavigationUtil";
import { WP, HP } from "../../Utils/Scaling";

// data's
import { onboardingData } from "../../Constants/Datas";

const { width } = Dimensions.get("window");

// parent
const OnboardingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (activeIndex < onboardingData.length - 1) {
        flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
        setActiveIndex((prev) => prev + 1);
      }
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [activeIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = useCallback((event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.imageBackground} resizeMode="cover">
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to BookmyTurf</Text>
              <Text style={styles.subtitle}>Experience seamless turf booking with ease.</Text>
            </View>
          </ImageBackground>
        )}
      />

      <TouchableOpacity style={styles.skipButton} onPress={() => resetAndNavigate("LoginScreen")}>
        <Text style={styles.skipText}>Skip ➤</Text>
      </TouchableOpacity>

      {/* Animated Pagination */}
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, i) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          return <Animated.View key={i} style={[styles.dot, { width: dotWidth }]} />;
        })}
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: RFPercentage(2),
    textAlign: "center",
    marginHorizontal: WP(5),
  },
  skipButton: {
    position: "absolute",
    bottom: HP(5),
    right: WP(5),
  },
  skipText: {
    color: "#fff",
    fontSize: RFPercentage(2.5),
  },
  paginationContainer: {
    position: "absolute",
    bottom: HP(10),
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});
