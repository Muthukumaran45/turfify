import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

// Packages
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from 'axios';

// Components
import WishListCard from '../Components/Cards/WishListCard';
import Header from '../Components/Headers/Header';
import CustomText from '../Components/Texts/CustomText';

// Navigation
import { navigate } from '../Utils/NavigationUtil';

// zustand
import useUserStore from "../Zustand/Zustand"

// utils
import { API_URL } from '../Services/Api';
import { COLORS } from '../Constants/Colors';

const WishListScreen = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.user);

  const fetchWishlistData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/favorites/list/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = response.data;
      // Transform API data to match the format expected by WishListCard
      const formattedData = data.map(item => ({
        id: item._id,
        title: item.turfName,
        images: item.images || [],
        location: item.address,
        price: "₹500/hr", // Add default price or extract from pitches if available
        rating: "4.5", // Add default rating or extract from API data if available
        discount: true, // Set based on your logic
      }));
      
      setWishlistData(formattedData);
      setLoading(false);
    } catch (error) {
      console.log("Error from wishlist data", error);
      setError("Failed to load favorites");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  const handleBookNowPress = (turfId) => {
    navigate("TurfDetailsScreen", { turfId });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ paddingHorizontal: hp(2) }}>
        <Header title='Favorite' />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <CustomText size={2.2} color="red">{error}</CustomText>
        </View>
      ) : wishlistData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <CustomText size={2.2}>No favorites added yet</CustomText>
        </View>
      ) : (
        <WishListCard 
          data={wishlistData} 
          onPressBtn={(item) => handleBookNowPress(item.id)}
        />
      )}
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(2)
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});