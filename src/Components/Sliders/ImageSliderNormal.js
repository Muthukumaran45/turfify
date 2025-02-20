import React, { useState } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../Constants/Colors";

const defaultImage = "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg";

const ImageSliderNormal = ({ images = [] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const imagesToDisplay = images.length > 0 ? images : [defaultImage];

  return (
    <View style={styles.imageContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / wp("90%"));
          setActiveSlide(slideIndex);
        }}
        scrollEventThrottle={16}
      >
        {imagesToDisplay.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.turfImage} resizeMode="cover" />
        ))}
      </ScrollView>
      
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
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: hp("23.5%"),
  },
  turfImage: {
    width: wp("92%"),
    height: hp("23.5%"),
    borderRadius: 10,
    marginHorizontal: hp(2),
  },
  paginationContainer: {
    position: "absolute",
    bottom: hp(1.5),
    alignSelf: "center",
    flexDirection: "row",
  },
  dotStyle: {
    width: hp(1),
    height: hp(1),
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

export default ImageSliderNormal;
