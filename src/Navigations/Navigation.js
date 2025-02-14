import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// screens
import MainNavigation from "./MainNavigation";
import { CustomToast } from "../Components/Toast/ToastServices";

// utils
import { navigationRef } from "../Utils/NavigationUtil";

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigation />
      <CustomToast />
    </NavigationContainer>
  );
};

export default Navigation;