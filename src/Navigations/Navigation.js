import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// packages

// screens
import MainNavigation from "./MainNavigation";
import { CustomToast } from "../Components/Toast/ToastServices";

// utils
import { navigationRef } from "../Utils/NavigationUtil";

// linking for sharing
const linking = {
  prefixes: ['https://turfify.com', 'turfify://'],
  config: {
    screens: {
      BookingScreen: 'BookingScreen',
      TurfDetailsScreen: 'turfDetails', 
    },
  },
};

const Navigation = () => {
  return (
      <NavigationContainer ref={navigationRef} linking={linking}>
        <MainNavigation />
        <CustomToast />
      </NavigationContainer>
  );
};

export default Navigation;