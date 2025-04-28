import React, { useState, useEffect } from "react";
import { View, StyleSheet ,Linking} from "react-native";
import "./global.css";

// packages
import messaging from '@react-native-firebase/messaging';

// Screens
import Navigation from "./src/Navigations/Navigation";

// zustand
import useFcmStore from "./src/Zustand/useFcmStore";



const getFcmToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);

  // save token to Zustand
  const setFcmToken = useFcmStore.getState().setFcmToken;
  setFcmToken(token);
  return token;
};




const App = () => {

  useEffect(() => {
    getFcmToken()
  }, [])

  return (

    <Navigation />

  );
};

export default App;

const styles = StyleSheet.create({});
