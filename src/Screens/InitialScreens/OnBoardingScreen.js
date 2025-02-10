import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const data = [
  { id: 1, image: require("../../Assets/onboardingImg/img1.jpg") },
  { id: 2, image: require("../../Assets/onboardingImg/img3.jpg") },
  { id: 3, image: require("../../Assets/onboardingImg/img1.jpg") },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < data.length - 1) {
        flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
        setActiveIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item, index }) => (
          <ImageBackground source={item.image} style={styles.imageBackground} resizeMode="cover">
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to BookmyTurf</Text>
              <Text style={styles.subtitle}>
                Experience seamless turf booking with ease.
              </Text>
            </View>
            {index === data.length - 1 && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text style={styles.skipText}>Skip ➤</Text>
              </TouchableOpacity>
            )}
          </ImageBackground>
        )}
      />

      {/* Animated Pagination */}
      <View style={styles.paginationContainer}>
        {data.map((_, i) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ],
            outputRange: [8, 16, 8], // Enlarge active dot
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange: [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ],
            outputRange: [0.5, 1, 0.5], // Dim inactive dots
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
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
    width: width,
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
    marginHorizontal: wp(5),
  },
  skipButton: {
    position: "absolute",
    bottom: hp(5),
    right: wp(5),
  },
  skipText: {
    color: "#fff",
    fontSize: RFPercentage(2.5),
  },
  paginationContainer: {
    position: "absolute",
    bottom: hp(10),
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
