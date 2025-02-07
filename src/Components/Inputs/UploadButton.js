import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentage, screenWidth } from '../../Utils/Scaling'
import { Colors } from '../../Constants/Colors'
import { FONTS } from '../../Constants/Fonts'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/AntDesign'
import TouchableRipple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import DotLoading from '../../Global/DotLoading'
import GradientUnderline from '../../Global/LinearUnderLine'

const UploadButton = ({ animation, onPress, loading, value, width, label, Valid, imageSource, imageName,Clear }) => {
  console.log('====================================');
  console.log(label);
  console.log('====================================');
  return (
    <Animatable.View animation={animation} duration={1500}>
      <TouchableRipple
        onPress={onPress}
        rippleColor="#000000"
        style={[styles.container, { width: width ? width : screenWidth - 40 }]}>
        {loading ? (
          <DotLoading key={10} />
        ) : (
          <Text style={[styles.text, { color: !value ? Colors.black : Colors.whats_app_green }]}>
            {label ? label : "Upload Image"}
          </Text>
        )}
        <Icon name="file-upload-outline" size={RFValue(20)} color={!value ? Colors.lite_purple : Colors.whats_app_green} style={{ left: "10%" }} />
      </TouchableRipple>
      {imageSource  ? (
        <View style={[styles.flexRow, { width: width ? width : screenWidth - 40, height: heightPercentage(13), alignSelf: "center", borderRadius: 10, marginVertical: "3%", borderColor: Colors.Lite_gray, borderWidth: 1, columnGap: 20 ,backgroundColor:Colors.white}]}>
          <Image source={{ uri: imageSource }} style={{ width: "90%", height: "90%", left: 6, borderRadius: 6, resizeMode: "contain" ,alignSelf:"center",position:"relative"}} />
          <TouchableRipple  style={{position: "absolute",right:10,top:5}} onPress={()=>{Clear()}}>
          <Icon1 name="closecircle" size={RFValue(14)} color={Colors.black}/>

          </TouchableRipple>

        </View>
        
      ) : null}
    </Animatable.View>
  )
}

export default UploadButton

const styles = StyleSheet.create({
  container: {
    height: heightPercentage(6),
    borderRadius: 6,
    backgroundColor: Colors.white,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontFamily: FONTS.Inter_28,
    color: Colors.black,
    fontSize: RFValue(15)
  },
  text1: {
    fontFamily: FONTS.Inter_28_Medium,
    fontSize: RFValue(12),
    color: Colors.black,
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
})
