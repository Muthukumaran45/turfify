import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { X, LocateFixed, Search, Redo2 } from "lucide-react-native";
import GetLocation from "react-native-get-location";
import CustomButton from "../Buttons/CustomButton";
import CustomInput from "../Inputs/CustomInput";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const GOOGLE_API_KEY = "AIzaSyB-Epzh0bpcXLhrHzSdztyoemggD607530";

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
      {/* Display selected address */}
      <View style={styles.container}>
        <TouchableOpacity className="flex-row items-center" onPress={() => setModalVisible(true)}>
          <Redo2 size={hp(4)} style={{ marginRight: hp(1) }} />
          <Text>{address ? address : "Fetching location..."}</Text>
        </TouchableOpacity>
      </View>

      {/* Location modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>


          {/* Search Input */}
          <CustomInput
            placeholder="Search location"
            value={searchQuery}
            onChangeText={handleSearch}
            leftIcon={<Search size={20} />}
          />



          {/* Search results list */}
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.searchResult} onPress={() => selectAddress(item.place_id)}>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
          )}

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
          <CustomButton title="Submit" onPress={() => setModalVisible(false)} />

          {/* Locate Button */}
          <TouchableOpacity style={styles.locateButton} onPress={getCurrentLocation}>
            <LocateFixed size={32} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", },
  modalContainer: { flex: 1, backgroundColor: "white" },
  map: { flex: 1 },
  closeButton: { position: "absolute", top: 30, right: 20, backgroundColor: "black", padding: 8, borderRadius: 20 },
  locateButton: { position: "absolute", bottom: hp(15), right: 20, backgroundColor: "#007bff", padding: 12, borderRadius: 50 },
  searchResult: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
});

export default LocationComponent;
