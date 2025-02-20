  import React, { useState, useEffect, useRef } from "react";
  import { View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from "react-native";
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
  import { RFPercentage as rf } from "react-native-responsive-fontsize";
  import { Heart } from "lucide-react-native";
  import { COLORS } from "../../Constants/Colors";
  import CustomText from "../Texts/CustomText";
  import { Nunito_Bold } from "../../Constants/FontFamily";
import { navigate } from "../../Utils/NavigationUtil";

  const { width } = Dimensions.get("window");

  const CardItem = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollViewRef = useRef(null);

    // Default image URL
    const defaultImage = "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg";

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveSlide((prev) => {
          const nextSlide = (prev + 1) % item.images?.length;
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: nextSlide * wp("40%"), animated: true });
          }
          return nextSlide;
        });
      }, 3000); // Adjust time as needed (3000ms = 3 seconds)

      return () => clearInterval(interval); // Cleanup on unmount
    }, [item.images?.length]);

    // If no images exist, show the default image
    const imagesToDisplay = item.images?.length > 0 ? item.images : [defaultImage];

    return (
      <TouchableOpacity onPress={() => navigate('TurfDetailsScreen', {turfData : item})} style={styles.card}>
        {/* Image Slider */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={(event) => {
              const slideIndex = Math.round(event.nativeEvent.contentOffset.x / wp("40%"));
              setActiveSlide(slideIndex);
            }}
            scrollEventThrottle={16}
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

        {/* Like Button */}
        <TouchableOpacity style={styles.like} onPress={() => setLiked(!liked)}>
          <Heart size={hp(3)} color={COLORS.likedColor} fill={liked ? COLORS.likedColor : "none"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const HorizontalCardList = ({ data }) => (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <CardItem item={item}/>}
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
