import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React,{useState, useEffect} from 'react'

// icons
import { ChevronLeft, Martini, SwitchCamera } from "lucide-react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

// components
import CustomText from '../Components/Texts/CustomText';
import CustomInput from '../Components/Inputs/CustomInput';
import CustomButton from '../Components/Buttons/CustomButton';
import { successAlert } from '../Components/Toast/ToastServices';
import CameraModal from './ProfileScreens/Modals/CameraModal';


// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImageViewer from "react-native-image-zoom-viewer";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

// utils
import { COLORS } from '../Constants/Colors';
import { navigate } from '../Utils/NavigationUtil';


const TournamentForm = () => {
  const navigation = useNavigation();

  const handleSendReq = () => {
    successAlert({
      message: "Request Send Successfully"
    });
    navigate("BottomNavigation")
  }

  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [zoomModalVisible, setZoomModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");


  const handleDeleteProfilePic = () => {
    setProfileImage(null); // Remove the image
  };

  // Request camera permission
  const requestCameraPermission = async () => {
    const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  // Request gallery permission
  const requestGalleryPermission = async () => {
    const permission = Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };


  const handleCameraPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log("Camera permission denied");
      return;
    }

    launchCamera({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.errorCode) {
        console.log("Camera Error: ", response.errorMessage);
      } else {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });

    setCameraModalVisible(false);
  };

  const handleGalleryPress = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      console.log("Gallery permission denied");
      return;
    }

    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled gallery");
      } else if (response.errorCode) {
        console.log("Gallery Error: ", response.errorMessage);
      } else {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });

    setCameraModalVisible(false);
  };


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}
      <View className={`flex-row items-center`} style={{ marginVertical: hp(2), paddingHorizontal: hp(2) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={rf(22)} color={"#000"} />
        </TouchableOpacity>
        <CustomText size={2.3} fontWight='700' style={styles.header}>Match Details</CustomText>
      </View>

      <View className={`items-center justify-center`} style={{ marginTop: hp(3) }} >
        <View
          style={{
            width: wp("23%"),
            height: wp("23%"),
            borderRadius: wp("500%"),
            position: "relative",
          }}
          className={`bg-gray-300`}
        >
          <CustomText color='#fff' style={styles.logoText}>Team Logo</CustomText>
          <TouchableOpacity onPress={() => setCameraModalVisible(true)}  className='rounded-full' style={styles.switchCamera}>
            <Ionicons name={"camera-sharp"} size={hp(2.8)} style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>
      </View>


      <CameraModal
        visible={cameraModalVisible}
        onClose={() => setCameraModalVisible(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
        onDeletePress={handleDeleteProfilePic}
      />

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
            imageUrls={
              profileImage
                ? [{ url: profileImage.uri ? profileImage.uri : Image.resolveAssetSource(profileImage).uri }]
                : [{ url: "" }] // Provide a fallback empty URL
            }
            enableSwipeDown={true}
            onSwipeDown={() => setZoomModalVisible(false)}
            renderIndicator={() => null}
          />


        </View>
      </Modal>

      <View style={{ marginTop: hp(3), marginHorizontal: hp(4) }}>
        <View>
          <CustomText >Team Name</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />

        </View>

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText >Skill Level</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />
        </View>

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText >Team Strength</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />
        </View>

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText >Message</CustomText>
          <CustomInput
            height={hp(13)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
          />
        </View>

        <View style={{ marginTop: hp(3), marginHorizontal: hp(4) }}>
          <CustomButton className={`rounded-md`} title={"SEND REQUEST"} onPress={handleSendReq} />
        </View>

      </View>

    </ScrollView>
  )
}

export default TournamentForm

const styles = StyleSheet.create({
  switchCamera: {
    position: "absolute",
    right: 2,
    bottom: 2,
    backgroundColor: COLORS.primary,
    padding: hp(.5)
  },
  logoText: {
    position: "absolute",
    top: hp(4),
    left: hp(2)
  },
  header: {
    paddingLeft: wp(25)
  }
})