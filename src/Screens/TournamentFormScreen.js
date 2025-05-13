import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useId } from 'react'

// icons
import { ChevronLeft, Martini, SwitchCamera, ChevronDown } from "lucide-react-native";
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
import axios from 'axios';
import { useRoute } from "@react-navigation/native";


// utils
import { COLORS } from '../Constants/Colors';
import { navigate } from '../Utils/NavigationUtil';
import Header from '../Components/Headers/Header';
import { API_URL } from '../Services/Api';

// zustand
import useUserStore from "../Zustand/Zustand"


const TournamentForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const token = useUserStore((state) => state.token);
  const UserId = useUserStore((state) => state.user);
  
  // Form state
  const [teamName, setTeamName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [teamStrength, setTeamStrength] = useState('1');
  const [message, setMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Modal states
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [zoomModalVisible, setZoomModalVisible] = useState(false);

  // Dropdown states
  const [skillLevelDropdownVisible, setSkillLevelDropdownVisible] = useState(false);
  const [teamStrengthDropdownVisible, setTeamStrengthDropdownVisible] = useState(false);

  // Skill level options (1-10)
  const skillLevelOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  const [imgUrl, setImgUrl] = useState("")
  const uploadImageAndGetUrl = async (imageUri) => {
    const formData = new FormData();

    formData.append("image", {
      uri: imageUri,
      name: imageUri.split('/').pop(), // Keeps original file name
      type: "image/jpeg",
    });

    try {
      const uploadRes = await axios.post(`${API_URL}/upload/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log("Image upload successful");
      console.log("Image URL:", uploadRes.data.imageUrl);
      setImgUrl(uploadRes.data.imageUrl)


    } catch (error) {
      console.error("Image upload failed:", error.response?.data || error.message);
      throw error;
    }
  };


  // Team strength options
  const teamStrengthOptions = ['Beginner', 'Intermediate', 'Professional'];

  const handleSendReq = async () => {
    try {
      let uploadedImageUrl = null;

      if (profileImage?.uri) {
        uploadedImageUrl = await uploadImageAndGetUrl(profileImage.uri);
      }


      const formData = {
        tournamentId: id,
        userId: UserId,
        teamName,
        skillLevel,
        teamStrength,
        message,
        teamLogo: imgUrl,
      };

      console.log("Sending form data:", formData);

      const response = await axios.post(`${API_URL}/tournament-enrollment/enroll`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("tournament form res ", response.data);

      successAlert({
        message: "Request Sent Successfully",
      });

      // navigate("BottomNavigation");
    } catch (error) {
      console.error("Error sending tournament request:", error.response?.data || error.message);
    }
  };



  const handleDeleteProfilePic = () => {
    setProfileImage(null);
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

  // Custom dropdown component
  const CustomDropdown = ({ label, value, options, onSelect, isVisible, setIsVisible }) => {
    return (
      <View style={styles.dropdownContainer}>
        <CustomText size={2.3}>{label}</CustomText>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsVisible(!isVisible)}
        >
          <CustomText style={styles.dropdownButtonText}>{value}</CustomText>
          <ChevronDown size={hp(2.2)} color={COLORS.textDark || '#333'} />
        </TouchableOpacity>

        <Modal
          visible={isVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsVisible(false)}
          >
            <View style={styles.dropdownListContainer}>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      value === item && styles.selectedItem
                    ]}
                    onPress={() => {
                      onSelect(item);
                      setIsVisible(false);
                    }}
                  >
                    <CustomText
                      style={[
                        styles.dropdownItemText,
                        value === item && styles.selectedItemText
                      ]}
                    >
                      {item}
                    </CustomText>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* header */}
      <View style={{ paddingHorizontal: hp(2), }}>
        <Header title="Match Details" paddingLeft={hp(12.5)} />
      </View>

      <View style={{ marginTop: hp(3), alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: wp("30%"),
            height: wp("30%"),
            borderRadius: wp("500%"),
            position: "relative",
            overflow: 'hidden',
            alignItems: "center", justifyContent: "center"
          }}
          className={`bg-gray-300`}
        >
          {profileImage ? (
            <TouchableOpacity
              style={{ width: '100%', height: '100%' }}
              onPress={() => setZoomModalVisible(true)}
            >
              <Image
                source={profileImage}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <CustomText color='#fff' size={2.5}>Team Logo</CustomText>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setCameraModalVisible(true)}
          className='rounded-full'
          style={styles.switchCamera}
        >
          <Ionicons name={"camera-sharp"} size={hp(2.8)} style={{ color: "#fff" }} />
        </TouchableOpacity>
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
                : [{ url: "" }]
            }
            enableSwipeDown={true}
            onSwipeDown={() => setZoomModalVisible(false)}
            renderIndicator={() => null}
          />
        </View>
      </Modal>

      <View style={{ marginTop: hp(3), marginHorizontal: hp(4) }}>
        <View>
          <CustomText size={2.5}>Team Name</CustomText>
          <CustomInput
            height={hp(6)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
            value={teamName}
            onChangeText={setTeamName}
          />
        </View>

        {/* Skill Level Dropdown */}
        <CustomDropdown
          label="Skill Level"
          value={skillLevel}
          options={teamStrengthOptions}
          onSelect={setSkillLevel}
          isVisible={skillLevelDropdownVisible}
          setIsVisible={setSkillLevelDropdownVisible}
        />

        {/* Team Strength Dropdown */}
        <CustomDropdown
          label="Team Strength"
          value={teamStrength}
          options={skillLevelOptions}
          onSelect={setTeamStrength}
          isVisible={teamStrengthDropdownVisible}
          setIsVisible={setTeamStrengthDropdownVisible}
        />

        <View style={{ marginTop: hp(1.5) }}>
          <CustomText size={2.3}>Message</CustomText>
          <CustomInput
            height={hp(13)}
            className={`rounded-md`}
            style={{ marginTop: hp(.5) }}
            placeholder=''
            multiline={true}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View style={{ marginTop: hp(3), marginHorizontal: hp(4) }}>
          <CustomButton
            className={`rounded-md`}
            title={"SEND REQUEST"}
            onPress={handleSendReq}
            height={hp(7)}
            style={{borderRadius: hp(1)}}
          />
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
    padding: hp(.5),
    marginRight: hp(17)
  },
  header: {
    paddingLeft: wp(25)
  },
  dropdownContainer: {
    marginTop: hp(1.5),
    position: 'relative',
    zIndex: 1
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderColor || '#e0e0e0',
    borderRadius: 8,
    marginTop: hp(.5),
    height: hp(6),
    paddingHorizontal: hp(1.5)
  },
  dropdownButtonText: {
    fontSize: hp(1.8),
    color: COLORS.textDark || '#333'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  dropdownListContainer: {
    backgroundColor: '#fff',
    marginHorizontal: hp(4),
    borderRadius: 8,
    maxHeight: hp(30),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  dropdownItem: {
    paddingVertical: hp(1.2),
    paddingHorizontal: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  selectedItem: {
    backgroundColor: COLORS.primaryLight || '#f2f2f2'
  },
  dropdownItemText: {
    fontSize: hp(1.8),
    color: COLORS.textDark || '#333'
  },
  selectedItemText: {
    color: COLORS.primary || '#000',
    fontWeight: 'bold'
  }
});