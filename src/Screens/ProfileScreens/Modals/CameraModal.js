import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { X, Trash2 } from "lucide-react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CameraModal = ({ visible, onClose, onCameraPress, onGalleryPress, onDeletePress }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.modalContainer}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={hp(2.8)} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Photo</Text>

          <TouchableOpacity onPress={() => { onClose(); onDeletePress(); }}>
            <Trash2 size={hp(2.8)} color="black" />
          </TouchableOpacity>

        </View>

        {/* Options */}
        <View style={styles.optionContainer}>
          {/* Camera Option */}
          <TouchableOpacity style={styles.option} onPress={onCameraPress}>
            <Ionicons name="camera" size={hp(4)} color="black" />
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>

          {/* Gallery Option */}
          <TouchableOpacity style={styles.option} onPress={onGalleryPress}>
            <Ionicons name="image" size={hp(4)} color="black" />
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end"
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingTop: hp(2),
    paddingBottom: hp(3),
    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  headerTitle: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    color: "black"
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: hp(2)
  },
  option: {
    alignItems: "center",
    paddingHorizontal: wp(5)
  },
  optionText: {
    fontSize: hp(2),
    marginTop: hp(0.8)
  }
});
