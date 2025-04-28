import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../Constants/Colors";
import CustomText from "../Texts/CustomText";
import { Nunito_Bold } from "../../Constants/FontFamily";
import { navigate } from "../../Utils/NavigationUtil";

const CardItem = ({ item }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);

  // Default image URL
  const defaultImage = "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg";

  // If no images exist, show the default image
  const imagesToDisplay = item.images?.length > 0 ? item.images : [defaultImage];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        // Calculate the next slide index
        const nextSlide = (activeSlide + 1) % imagesToDisplay.length;

        if (activeSlide === imagesToDisplay.length - 1) {
          // If we're at the last slide, quickly reset to beginning without animation
          scrollViewRef.current.scrollTo({ x: 0, animated: false });

          // Small delay to ensure the scroll reset completes
          setTimeout(() => {
            setActiveSlide(0);
          }, 10);
        } else {
          // Normal scroll to next slide
          scrollViewRef.current.scrollTo({
            x: nextSlide * wp("40%"),
            animated: true
          });
          setActiveSlide(nextSlide);
        }
      }
    }, 5000); // Adjust time as needed (3000ms = 3 seconds)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeSlide, imagesToDisplay.length]);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / wp("40%"));
    setActiveSlide(slideIndex);
  };

  return (
    <TouchableOpacity onPress={() => navigate('TurfDetailsScreen', { turfData: item })} style={styles.card}>
      {/* Image Slider */}
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false} // Prevents bouncing at the ends
        >
          {imagesToDisplay.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} resizeMode="cover" />
          ))}
        </ScrollView>

        {/* Pagination Dots (Only if there are multiple images) */}
        {imagesToDisplay.length > 1 && (
          <View style={styles.paginationContainer}>
            {imagesToDisplay.map((_, index) => (
              <View
                key={index}
                style={[styles.dotStyle, activeSlide === index ? styles.activeDot : styles.inactiveDot]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Turf Information */}
      <View style={styles.info}>
        <CustomText size={2} fontFamily={Nunito_Bold}>{item.turfName}</CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <CustomText MT={0.5}>
            {item.pitches?.[0]?.timeSlots?.[0]?.pricing?.weekdays?.originalPrice ?? "N/A"}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HorizontalCardList = ({ data }) => (
  <FlatList
    data={data}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => <CardItem item={item} />}
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(2),
    position: "relative",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp("2%"),
    marginRight: wp("3%"),
    width: wp("40%"),
    height: hp("24.5%"),
    elevation: 3,
    overflow: "hidden",
    marginVertical: hp(1.5),
  },
  image: {
    width: wp("40%"),
    height: hp("15%"),
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
  },
  like: {
    position: "absolute",
    right: hp(1),
    top: hp(1),
  },
  info: {
    height: hp("9%"),
    padding: wp("2%"),
  },
  paginationContainer: {
    position: "absolute",
    bottom: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: "#C4C4C4",
  },
});

export default HorizontalCardList;