import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";

// env
import { API_URL, GOOGLE_API_KEY } from '@env';

// package
import MapView, { Marker } from "react-native-maps";
import GetLocation from "react-native-get-location";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";

// icons
import { X, LocateFixed, Search, Redo2 } from "lucide-react-native";

// component
import CustomButton from "../Buttons/CustomButton";
import CustomInput from "../Inputs/CustomInput";
import { COLORS } from "../../Constants/Colors";
import CustomText from "../Texts/CustomText";


const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const [modalVisible, setModalVisible] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Get address from coordinates
  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        const addressParts = formattedAddress.split(",").map(part => part.trim());

        let area = "Not Available";
        if (addressParts.length === 3) {
          area = addressParts[0];
        } else if (addressParts.length >= 4) {
          area = addressParts[addressParts.length - 4];
        }

        setAddress(area);
        console.log("Selected area:", area);
      } else {
        setAddress("Area not found");
      }
    } catch (error) {
      console.warn("Error fetching address:", error);
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      console.log("Current Location:", loc);
      setLocation(loc);
      setSelectedLocation(loc);
      getAddress(loc.latitude, loc.longitude);

      // Ensure map updates to new location
      if (mapRef) {
        mapRef.animateToRegion({
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.warn("Error fetching current location:", error);
    }
  };

  // Handle map press to set new location
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    getAddress(latitude, longitude);
  };

  // Search location using Google Places API
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 3) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.predictions);
    } catch (error) {
      console.warn("Error fetching places:", error);
    }
  };

  // Select searched address and update the map
  const selectAddress = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      const { lat, lng } = data.result.geometry.location;
      setSelectedLocation({ latitude: lat, longitude: lng });
      getAddress(lat, lng);
      setSearchResults([]);
      setSearchQuery("");
    } catch (error) {
      console.warn("Error fetching place details:", error);
    }
  };

  // Move map to the selected location when it updates
  useEffect(() => {
    if (selectedLocation && mapRef) {
      mapRef.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [selectedLocation]);

  // Get the current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      {/* <StatusBar barStyle={"default"} backgroundColor={"black"} /> */}

      {/* Display selected address */}
      <View style={styles.container}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setModalVisible(true)}>
        <Image source={require("../../Assets/google-maps.png")} style={{width: hp(3), height: hp(3), marginRight: hp(1)}} />
          {/* <Redo2 size={hp(4)} color={COLORS.arrowIcon} style={{ marginRight: hp(1) }} /> */}
          <CustomText size={2.3}>{address ? address : "Fetching location..."}</CustomText>
        </TouchableOpacity>
      </View>


      {/* Location modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          {/* Search Input and Close Button Row */}
          <View style={styles.searchContainer}>
            <View style={styles.searchRow}>
              {/* Search Input Wrapper */}
              <View style={styles.searchInputWrapper}>
                <Search size={20} color="#777" style={styles.searchIcon} />
                <TextInput
                  placeholder="Search location"
                  value={searchQuery}
                  onChangeText={handleSearch}
                  style={styles.searchInput}
                />
              </View>

              {/* Close Button - Now next to search input */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <X size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Search results list */}
            {searchResults.length > 0 && (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.searchResult}
                    onPress={() => selectAddress(item.place_id)}
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                )}
                style={styles.resultsList}
              />
            )}
          </View>

          {/* Map View */}
          <MapView
            ref={(ref) => setMapRef(ref)}
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation?.latitude || 37.78825,
              longitude: selectedLocation?.longitude || -122.4324,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>

          {/* Submit Button */}
          <CustomButton
            title="Submit"
            onPress={() => {
              // if (selectedLocation) {
              //   sendLocationToBackend(selectedLocation.latitude, selectedLocation.longitude);
              // }
              setModalVisible(false);
            }}
            height={hp(7)}
            style={styles.submitButton}
            textStyle={{ fontSize: hp(2.7) }}
          />

          {/* Locate Button */}
          <TouchableOpacity style={styles.locateButton} onPress={getCurrentLocation}>
            <LocateFixed size={32} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    flex: 1,
    // backgroundColor: "white"
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: hp(2),
    paddingTop: hp(1)
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: hp(100),
    paddingHorizontal: hp(2),
    height: hp(7),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: hp(5.5),
    width: hp(5.5)
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    height: hp(7),
    fontSize: hp(2.3)
  },
  resultsList: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    maxHeight: hp(30),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  searchResult: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  submitButton: {
    marginHorizontal: hp(2),
    position: "absolute",
    bottom: hp(4),
    width: wp(91),
    borderRadius: hp(100),
    zIndex: 1
  },
  locateButton: {
    position: "absolute",
    bottom: hp(15),
    right: 20,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
    zIndex: 1
  }
});

export default LocationComponent;