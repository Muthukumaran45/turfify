import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Modal } from "react-native";

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImageViewer from "react-native-image-zoom-viewer";

// components
import CustomText from "../../Components/Texts/CustomText";
import { COLORS } from "../../Constants/Colors";
import CustomInput from "../../Components/Inputs/CustomInput";
import CameraModal from "./Modals/CameraModal";

// icons
import { ChevronLeft, SwitchCamera } from "lucide-react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import Header from "../../Components/Headers/Header";
import { Nunito_Bold } from "../../Constants/FontFamily";


const EditProfileScreen = () => {

  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [zoomModalVisible, setZoomModalVisible] = useState(false);

  const [profileImage, setProfileImage] = useState(require("../../Assets/profile.png")); // Default image

  const handleCameraPress = () => {
    launchCamera({ mediaType: "photo", quality: 1 }, (response) => {
      if (!response.didCancel && !response.error) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
    setCameraModalVisible(false);
  };

  const handleGalleryPress = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (!response.didCancel && !response.error) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
    setCameraModalVisible(false);
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.bgPrimary }}>

        {/* header */}
        <View style={{ marginHorizontal: hp(2) }}>
          <Header title="Edit Profile" />
        </View>

        {/* user image & user details */}
        <View className={`items-center justify-center`} style={{ marginVertical: hp(2), marginHorizontal: hp(2) }}>
          <View>
            <TouchableOpacity onPress={() => setZoomModalVisible(true)}>
              <Image
                source={profileImage}
                style={{
                  width: wp("23%"),
                  height: wp("23%"),
                  borderRadius: wp("50%"),
                  position: "relative",
                }}
              />
            </TouchableOpacity>

            {/* camera */}
            <TouchableOpacity onPress={() => setCameraModalVisible(true)} style={styles.switchCamera}>
              <Ionicons name={"camera-reverse-sharp"} size={hp(4)} style={{ color: "#000" }} />
            </TouchableOpacity>
          </View>

          <CameraModal
            visible={cameraModalVisible}
            onClose={() => setCameraModalVisible(false)}
            onCameraPress={handleCameraPress}
            onGalleryPress={handleGalleryPress}
          />


          <View style={{ marginTop: hp(1) }}>
            <CustomText>Edit photo</CustomText>
          </View>
        </View>

        {/* Zoom Modal */}
        <Modal visible={zoomModalVisible} transparent={true} onRequestClose={() => setZoomModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: "black" }}>

            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: hp(2) }}>
              {/* Back Button */}
              <TouchableOpacity onPress={() => setZoomModalVisible(false)}>
                <Ionicons name="arrow-back" size={hp(3)} color="white" />
              </TouchableOpacity>

              {/* Title */}
              <Text style={{ color: "white", fontSize: hp(2.5), fontWeight: "bold" }}>Profile photo</Text>

              {/* Edit Icon */}
              <TouchableOpacity onPress={() => {
                setZoomModalVisible(false);
                setCameraModalVisible(true);
              }}>
                <Ionicons name="pencil" size={hp(3)} color="white" />
              </TouchableOpacity>
            </View>

            {/* Image Viewer */}
            <ImageViewer
              imageUrls={[{ url: profileImage.uri ? profileImage.uri : Image.resolveAssetSource(profileImage).uri }]}
              enableSwipeDown={true}
              onSwipeDown={() => setZoomModalVisible(false)}
               renderIndicator={() => null}
            />

          </View>
        </Modal>


        {/* inputs */}
        <View style={{ marginHorizontal: hp(2) }}>

          {/* name & bio */}
          <View>
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Name" style={{ marginVertical: hp(2), height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Bio" style={{ height: hp(6) }} />
          </View>

          <View style={{ marginTop: hp(3) }}>
            <CustomText size={2.2} fontFamily={Nunito_Bold}>Contact Details</CustomText>

            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Email" style={{ marginVertical: hp(2), height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Phone Number" style={{ height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="Gender" style={{ marginVertical: hp(2), height: hp(6) }} />
            <CustomInput className={`bg-white border-0 rounded-md`} placeholder="City" style={{ height: hp(6) }} />

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  profileHeader: {
    paddingLeft: wp(28)
  },
  switchCamera: {
    position: "absolute",
    right: hp(-1),
    top: hp(.5)
  }
})