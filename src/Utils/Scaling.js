import { Dimensions, PixelRatio } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const normalizeModerately = (size, factor = 0.5) => {
  return PixelRatio.roundToNearestPixel(moderateScale(size, factor));
};

export const normalizeWidth = (size) => {
  return PixelRatio.roundToNearestPixel(scale(size));
};

export const normalizeHeight = (size) => {
  return PixelRatio.roundToNearestPixel(verticalScale(size));
};

export const widthPercentage = (size)  =>{
  return wp(size)
} 
export const heightPercentage = (size)  =>{
  return hp(size)
} 

export   const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


export const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;